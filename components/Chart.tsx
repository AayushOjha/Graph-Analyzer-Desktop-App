"use client";

import Plot from "react-plotly.js";

type Props = {
  dataPoints: number[];
  duration?: number
  samplingFrequency?: number
};

const Chart = ({ dataPoints, duration=10, samplingFrequency=10 }: Props) => {

    const time = dataPoints.map((_, index) => index / samplingFrequency);


  return (
    <div className="overflow-x-auto">
      <Plot
        data={[
          {
            type: "scatter",
            mode: "lines",
            x: time,
            y: dataPoints,
          },
        ]}
        layout={{
          title: "Line Chart of Uploaded CSV Data",
          xaxis: { title: "Index" },
          yaxis: { title: "Value" },
        }}
        style={{ width: "160vh", height: "80vh" }}
      />
    </div>
  );
};

export { Chart };
