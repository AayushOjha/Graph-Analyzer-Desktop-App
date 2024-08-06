"use client";

import { Chart } from "@/components/Chart";
import { FileOpener } from "@/components/FileOpener";
import { useState } from "react";

export default function Home() {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FileOpener setFileData={(data) => setDataPoints(data)} />
      <Chart dataPoints={dataPoints} />
    </main>
  );
}
