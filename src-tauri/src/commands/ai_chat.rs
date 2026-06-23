use serde::{Deserialize, Serialize};
use std::fs;
use tauri::command;

fn config_dir() -> Option<String> {
    dirs::config_dir().map(|p| p.join("vibe-coding-blackboard").to_string_lossy().to_string())
}

fn api_key_path() -> Option<String> {
    config_dir().map(|d| format!("{}/api_key.txt", d))
}

#[command]
pub fn save_api_key(key: String) -> Result<(), String> {
    let path = api_key_path().ok_or("Cannot determine config directory")?;
    fs::create_dir_all(std::path::Path::new(&path).parent().unwrap())
        .map_err(|e| e.to_string())?;
    fs::write(&path, key).map_err(|e| e.to_string())
}

#[command]
pub fn has_api_key() -> Result<bool, String> {
    let path = api_key_path().ok_or("Cannot determine config directory")?;
    Ok(std::path::Path::new(&path).exists())
}

#[derive(Serialize, Deserialize)]
pub struct ChatMessage {
    pub role: String,
    pub content: serde_json::Value,
}

#[derive(Serialize, Deserialize)]
pub struct ToolCall {
    pub id: String,
    pub name: String,
    pub input: serde_json::Value,
}

#[derive(Serialize)]
pub struct ChatCompletionResponse {
    pub content: String,
    pub tool_calls: Vec<ToolCall>,
    pub stop_reason: String,
}

const TOOLS_JSON: &str = r#"
[
  {
    "name": "get_canvas_state",
    "description": "获取当前画布上所有节点和连线的状态。",
    "input_schema": {"type":"object","properties":{},"required":[]}
  },
  {
    "name": "add_node",
    "description": "在画布上添加一个节点。优先使用 definitionId，也可以用 label+category。",
    "input_schema": {
      "type":"object",
      "properties":{
        "definitionId":{"type":"string"},
        "label":{"type":"string"},
        "category":{"type":"string"},
        "icon":{"type":"string"},
        "specs":{"type":"string"},
        "position":{"type":"object","properties":{"x":{"type":"number"},"y":{"type":"number"}}}
      },
      "required":[]
    }
  },
  {
    "name": "update_node",
    "description": "修改画布上已有节点的属性。",
    "input_schema": {"type":"object","properties":{"nodeId":{"type":"string"},"label":{"type":"string"},"specs":{"type":"string"}},"required":["nodeId"]}
  },
  {
    "name": "remove_node",
    "description": "从画布上删除一个节点及其所有连线。",
    "input_schema": {"type":"object","properties":{"nodeId":{"type":"string"}},"required":["nodeId"]}
  },
  {
    "name": "add_edge",
    "description": "在两个节点之间创建一条连线。",
    "input_schema": {"type":"object","properties":{"sourceId":{"type":"string"},"targetId":{"type":"string"},"label":{"type":"string"}},"required":["sourceId","targetId"]}
  },
  {
    "name": "remove_edge",
    "description": "删除画布上的一条连线。",
    "input_schema": {"type":"object","properties":{"edgeId":{"type":"string"}},"required":["edgeId"]}
  },
  {
    "name": "clear_canvas",
    "description": "清空画布上的所有节点和连线。",
    "input_schema": {"type":"object","properties":{},"required":[]}
  }
]"#;

const TOOL_INSTRUCTIONS: &str = r#"

## 画布操控工具
你可以使用工具直接操控画布。用户说话时，主动使用工具来执行操作，而不是只给建议。
- 当用户要求添加、修改、删除节点或连线时，直接使用对应工具
- 当用户描述一个流程时，拆解为多个节点并用连线串联
- 使用 add_node 时优先使用 definitionId
- 每次操作后用简短文字告诉用户你做了什么"#;

fn parse_response(result: &serde_json::Value) -> ChatCompletionResponse {
    if let Some(content_arr) = result["content"].as_array() {
        let mut text = String::new();
        let mut tool_calls = Vec::new();

        for block in content_arr {
            if block["type"].as_str() == Some("text") {
                if let Some(t) = block["text"].as_str() {
                    text.push_str(t);
                }
            } else if block["type"].as_str() == Some("tool_use") {
                if let (Some(id), Some(name)) = (block["id"].as_str(), block["name"].as_str()) {
                    tool_calls.push(ToolCall {
                        id: id.to_string(),
                        name: name.to_string(),
                        input: block["input"].clone(),
                    });
                }
            }
        }

        let stop_reason = result["stop_reason"]
            .as_str()
            .unwrap_or(if tool_calls.is_empty() { "end_turn" } else { "tool_use" })
            .to_string();

        return ChatCompletionResponse {
            content: if text.is_empty() && !tool_calls.is_empty() {
                String::new()
            } else if text.is_empty() {
                "[Empty response]".to_string()
            } else {
                text
            },
            tool_calls,
            stop_reason,
        };
    }

    // OpenAI format
    if let Some(text) = result["choices"][0]["message"]["content"].as_str() {
        return ChatCompletionResponse {
            content: text.to_string(),
            tool_calls: vec![],
            stop_reason: "end_turn".to_string(),
        };
    }

    ChatCompletionResponse {
        content: format!("[Empty response] Raw: {}", result),
        tool_calls: vec![],
        stop_reason: "end_turn".to_string(),
    }
}

#[command]
pub async fn chat_completion(
    messages: Vec<ChatMessage>,
    canvas_state: String,
    api_key: String,
    base_url: String,
    model: String,
    auth_style: String,
    tools_enabled: bool,
) -> Result<ChatCompletionResponse, String> {
    let system_prompt = format!(
        "You are an AI assistant helping a user plan software project workflows on a visual canvas. \
         The user is a non-programmer who thinks in user-side concepts. \
         Help them organize their workflow, suggest missing steps, and improve their project plan. \
         Keep language simple and user-friendly. Respond in the same language as the user.\n\n\
         Current canvas state:\n{}{}",
        canvas_state,
        if tools_enabled { TOOL_INSTRUCTIONS } else { "" }
    );

    let client = reqwest::Client::new();

    let mut api_messages: Vec<serde_json::Value> = vec![serde_json::json!({
        "role": "user",
        "content": system_prompt
    })];

    for msg in &messages {
        api_messages.push(serde_json::json!({
            "role": msg.role,
            "content": msg.content
        }));
    }

    let mut body = serde_json::json!({
        "model": model,
        "max_tokens": 4096,
        "messages": api_messages
    });

    if tools_enabled {
        let tools: serde_json::Value =
            serde_json::from_str(TOOLS_JSON).map_err(|e| e.to_string())?;
        body["tools"] = tools;
    }

    let url = format!("{}/v1/messages", base_url.trim_end_matches('/'));

    let mut req_builder = client.post(&url);

    if auth_style == "none" {
        // Ollama
    } else if auth_style == "api-key" {
        req_builder = req_builder.header("x-api-key", &api_key);
    } else {
        req_builder = req_builder.header("authorization", format!("Bearer {}", &api_key));
    }

    req_builder = req_builder
        .header("anthropic-version", "2023-06-01")
        .header("content-type", "application/json")
        .json(&body);

    let resp = req_builder.send().await.map_err(|e| e.to_string())?;
    let status = resp.status();
    let result: serde_json::Value = resp.json().await.map_err(|e| e.to_string())?;

    // Defensive fallback: if 400 with tools, retry without
    if !status.is_success() && tools_enabled && status.as_u16() == 400 {
        let mut body_no_tools = body.clone();
        body_no_tools.as_object_mut().unwrap().remove("tools");

        let retry_resp = client
            .post(&url)
            .header("anthropic-version", "2023-06-01")
            .header("content-type", "application/json")
            .json(&body_no_tools)
            .send()
            .await
            .map_err(|e| e.to_string())?;

        let retry_status = retry_resp.status();
        let retry_result: serde_json::Value =
            retry_resp.json().await.map_err(|e| e.to_string())?;

        if !retry_status.is_success() {
            let error_msg = retry_result["error"]["message"]
                .as_str()
                .or_else(|| retry_result["message"].as_str())
                .unwrap_or("Unknown error");
            return Err(format!("HTTP {} — {}", retry_status.as_u16(), error_msg));
        }

        return Ok(parse_response(&retry_result));
    }

    if !status.is_success() {
        let error_msg = result["error"]["message"]
            .as_str()
            .or_else(|| result["message"].as_str())
            .unwrap_or("Unknown error");
        return Err(format!("HTTP {} — {}", status.as_u16(), error_msg));
    }

    Ok(parse_response(&result))
}

#[command]
pub async fn test_provider(
    api_key: String,
    base_url: String,
    model: String,
    auth_style: String,
) -> Result<String, String> {
    let client = reqwest::Client::new();
    let url = format!("{}/v1/messages", base_url.trim_end_matches('/'));

    let body = serde_json::json!({
        "model": model,
        "max_tokens": 10,
        "messages": [{"role": "user", "content": "hi"}]
    });

    let mut req_builder = client.post(&url);
    if auth_style == "none" {
        // Ollama
    } else if auth_style == "api-key" {
        req_builder = req_builder.header("x-api-key", &api_key);
    } else {
        req_builder = req_builder.header("authorization", format!("Bearer {}", &api_key));
    }

    req_builder = req_builder
        .header("anthropic-version", "2023-06-01")
        .header("content-type", "application/json")
        .json(&body);

    let resp = req_builder.send().await.map_err(|e| e.to_string())?;
    let status = resp.status();

    if status.is_success() {
        Ok("连接成功".to_string())
    } else {
        let result: serde_json::Value = resp.json().await.unwrap_or_default();
        let msg = result["error"]["message"]
            .as_str()
            .or_else(|| result["message"].as_str())
            .unwrap_or("未知错误");
        Err(format!("HTTP {} — {}", status.as_u16(), msg))
    }
}
