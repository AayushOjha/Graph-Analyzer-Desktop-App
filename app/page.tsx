"use client";

import { Chart } from "@/components/Chart";
import { FileOpener } from "@/components/FileOpener";
import { useState } from "react";

const data = [...Array(1000).keys()].map(() => Math.ceil(Math.random() * 100));
export default function Home() {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-4">
      <FileOpener setFileData={(data) => setDataPoints(data)} />
      {dataPoints.length && <Chart dataPoints={dataPoints} />}
    </main>
  );
}
