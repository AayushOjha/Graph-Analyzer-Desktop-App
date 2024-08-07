// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod errors;

use memmap2::Mmap;


#[derive(Clone, serde::Serialize)]
pub struct ReadFileStruct {
    path: String,
    content: String,
    is_binary: bool,
}

#[tauri::command]
fn read_and_downsample_file(path: String, downsample: usize) -> Result<ReadFileStruct, errors::Error> {
    let file = std::fs::File::open(path.clone())?;
    let mmap = unsafe { Mmap::map(&file)? };

    let content = match String::from_utf8((&mmap).to_vec()) {
        Ok(content) => content,
        Err(_) => String::from_utf8_lossy(&mmap).to_string(),
    };

    // Parse and downsample the data
    let mut data: Vec<f64> = Vec::new();
    for (i, line) in content.lines().enumerate() {
        if i % downsample == 0 {
            if let Ok(value) = line.parse::<f64>() {
                data.push(value);
            }
        }
    }

    Ok(ReadFileStruct {
        path,
        content: serde_json::to_string(&data)?, // Serialize downsampled data to JSON
        is_binary: false,
    })
}



fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![read_and_downsample_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
