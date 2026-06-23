use std::fs;
use tauri::command;

#[command]
pub fn save_workspace(path: String, data: String) -> Result<(), String> {
    fs::write(&path, data).map_err(|e| e.to_string())
}

#[command]
pub fn load_workspace(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}
