"use client";

import Plot from "react-plotly.js";
import { useState } from "react";

type Props = {
  dataPoints: number[];
  graphFrequency?: number; // sample per second, default 10 to show in graph
  // duration?: number
  // samplingFrequency?: number
};

const Chart = ({ dataPoints, graphFrequency = 1000 }: Props) => {
  const [timeViewFold, setTimeViewFold] = useState(1);
  const [range, setRange] = useState([0, 10]);

  const handleSlider = (e: any) => {
    const nextMarkup = timeViewFold == 10 ? 1.0 : 0.1;
    const base = e.target.value * nextMarkup;
    const next = base + nextMarkup;
    console.log(base, next);
    setRange([base, next]);
  };

  const handleTimeFoldSelect = (e: any) => {
    const val = parseInt(e.target.value) || 1;
    setTimeViewFold(val);
    switch (val) {
      case 100:
        setRange([0, 0.1]);
        break;
      case 10:
        setRange([0, 1]);
        break;
      case 1:
      default:
        setRange([0, 10]);
        break;
    }
  };

  const time = dataPoints.map((_, index) => index / graphFrequency);

  return (
    <>
      <div className="w-[80vw] h-[35vw]">
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
            xaxis: { title: "Time", range },
            yaxis: { title: "Value" },
          }}
          config={{
            scrollZoom: false,
            showAxisDragHandles: false,
            displayModeBar: false,
            responsive: true,
            modeBarButtonsToRemove: [
              "zoom2d",
              "pan2d",
              "select2d",
              "lasso2d",
              "zoomIn2d",
              "zoomOut2d",
              "autoScale2d",
              "resetScale2d",
              "hoverClosestCartesian",
              "hoverCompareCartesian",
            ],
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="w-[80%] flex gap-[5%] items-center justify-center">
        <div className="display flex flex-col">
          <label>Select time scale</label>
          <select
            className="rounded p-2 text-slate-800"
            onChange={handleTimeFoldSelect}
          >
            <option value="1">10 seconds</option>
            <option value="10">1 seconds</option>
            <option value="100">100 milli second</option>
          </select>
        </div>
        <div className="display flex flex-col">
          <label>Navigate</label>
          <input
            className="w-[300px]"
            disabled={timeViewFold == 1}
            type="range"
            min={0}
            max={timeViewFold - 1}
            value={range[0] * (timeViewFold / 10)}
            onChange={handleSlider}
          />
        </div>
        <button
          className="border px-8 py-2 rounded"
          onClick={() => {
            setRange([0, 10]);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export { Chart };
