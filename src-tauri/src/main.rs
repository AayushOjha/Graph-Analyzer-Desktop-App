// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod errors;

use memmap2::Mmap;


#[derive(Clone, serde::Serialize)]
pub struct ReadFileStruct {
    path: String,
    content: Option<String>,
    is_binary: bool,
    error: Option<String>,  
}
#[tauri::command]
fn read_and_downsample_file(path: String, downsample: usize) -> Result<ReadFileStruct, errors::Error> {
    let file = match std::fs::File::open(path.clone()) {
        Ok(file) => file,
        Err(_) => {
            return Ok(ReadFileStruct {
                path,
                content: None,
                is_binary: false,
                error: Some("Failed to open file. Please check if the file exists and the path is correct.".to_string()),
            });
        }
    };

    let mmap = match unsafe { Mmap::map(&file) } {
        Ok(mmap) => mmap,
        Err(_) => {
            return Ok(ReadFileStruct {
                path,
                content: None,
                is_binary: false,
                error: Some("Failed to map the file to memory.".to_string()),
            });
        }
    };

    let content = match String::from_utf8((&mmap).to_vec()) {
        Ok(content) => content,
        Err(_) => String::from_utf8_lossy(&mmap).to_string(),
    };

    if content.is_empty() {
        return Ok(ReadFileStruct {
            path,
            content: None,
            is_binary: false,
            error: Some("The file is empty.".to_string()),
        });
    }

    // Parse and downsample the data
    let mut data: Vec<f64> = Vec::new();
    for (i, line) in content.lines().enumerate() {
        if i % downsample == 0 {
            match line.parse::<f64>() {
                Ok(value) => data.push(value),
                Err(_) => {
                    return Ok(ReadFileStruct {
                        path,
                        content: None,
                        is_binary: false,
                        error: Some("Invalid file format: Unable to parse some values.".to_string()),
                    });
                }
            }
        }
    }

    Ok(ReadFileStruct {
        path,
        content: Some(serde_json::to_string(&data)?), // Serialize downsampled data to JSON
        is_binary: false,
        error: None, // No error
    })
}


fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![read_and_downsample_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
