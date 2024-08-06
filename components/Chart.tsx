"use client";

import Plot from "react-plotly.js";

type Props = {
  dataPoints: number[];
};

const Chart = ({ dataPoints }: Props) => {

    const time = dataPoints.map((_, index) => index / 20); // 10 samples per second


  return (
    <>
      <h2>Line Chart: {dataPoints.length}</h2>
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
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
};

export { Chart };
