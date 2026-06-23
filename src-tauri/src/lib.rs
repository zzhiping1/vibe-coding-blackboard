mod commands;

use commands::{file_io, ai_chat};

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            file_io::save_workspace,
            file_io::load_workspace,
            ai_chat::chat_completion,
            ai_chat::save_api_key,
            ai_chat::has_api_key,
            ai_chat::test_provider,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
