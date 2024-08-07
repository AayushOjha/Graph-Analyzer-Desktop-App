"use client";

import Plot from "react-plotly.js";

type Props = {
  dataPoints: number[];
  graphFrequency?: number; // sample per second, default 10 to show in graph
  // duration?: number
  // samplingFrequency?: number
};

const Chart = ({ dataPoints, graphFrequency=10 }: Props) => {

    const time = dataPoints.map((_, index) => index / graphFrequency);


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
