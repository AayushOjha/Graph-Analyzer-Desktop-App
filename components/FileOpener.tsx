"use client";

import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { useState } from "react";
import { Loader } from "./Loader";

interface Props {
  setFileData: (data: number[]) => void;
}

const FileOpener = ({ setFileData }: Props) => {
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
        const csvContent = await readTextFile(_filePath as string);
        const parsedData = csvContent
          .split("\n")
          .map((line) => parseFloat(line.trim()))
          .filter((num) => !isNaN(num));
        setFileData(parsedData);
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
          Browse
        </button>
      )}
    </div>
  );
};

export { FileOpener };
