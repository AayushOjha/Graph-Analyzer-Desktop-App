"use client";

import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { useState } from "react";
import { Loader } from "./Loader";
import { invoke } from "@tauri-apps/api";

interface Props {
  setFileData: (data: number[]) => void;
  setError: (err: string) => void;
}

const FileOpener = ({ setFileData, setError }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setLoading(true);
    const _filePath = await open({
      title: "Open CSV File",
      filters: [{ name: "CSV Files", extensions: ["csv"] }],
      multiple: false,
    });

    if (_filePath) {
      try {
        const data: any = await invoke("read_and_downsample_file", {
          path: _filePath,
          downsample: 4000,
        });
        console.log(data.error)
        if (data.error) {
          setError(data.error);
        } else {
          const parsedData = JSON.parse(data.content);
          setFileData(parsedData);
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex items-end justify-end p-2 px-5">
      {loading ? (
        <Loader />
      ) : (
        <button className="border px-8 py-2 rounded" onClick={handleOpen}>
          Load File
        </button>
      )}
    </div>
  );
};

export { FileOpener };
