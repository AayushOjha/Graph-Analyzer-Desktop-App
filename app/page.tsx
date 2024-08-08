"use client";

import { Chart } from "@/components/Chart";
import { FileOpener } from "@/components/FileOpener";
import { useState } from "react";

const data = [...Array(1000).keys()].map(() => Math.ceil(Math.random() * 100));
export default function Home() {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="flex flex-col items-center gap-5 p-4">
      <FileOpener
        setFileData={(data) => setDataPoints(data)}
        setError={(e) => {
          setError(e);
        }}
      />
      {error ? (
        <h2>{error}</h2>
      ) : dataPoints.length === 0 ? (
        <div className="text-center">No data available to display.</div>
      ) : (
        <Chart dataPoints={dataPoints} />
      )}
    </main>
  );
}
