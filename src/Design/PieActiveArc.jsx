import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieActiveArc({ colors, data }) {
  const dataa = data || [
    { id: 0, value: 10, label: "java" },
    { id: 1, value: 15, label: "springboot" },
    { id: 2, value: 20, label: "react" },
  ];
  const chartColors = colors || ["#387ADF", "skyblue", "#FFBE98"];
  return (
    <div>
      <PieChart
        colors={chartColors}
        series={[
          {
            data: dataa,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={200}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "middle", horizontal: "right" },
            padding: 0,
          },
        }}
      />
    </div>
  );
}
