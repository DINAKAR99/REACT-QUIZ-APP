import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieActiveArc({ colors, data }) {
  const dataa = data || [
    { value: 10, label: "java" },
    { value: 15, label: "springboot" },
    { value: 20, label: "react" },
    { value: 10, label: "reaqct" },
    { value: 10, label: "reaSqct" },
    { value: 10, label: "reaSqcSQt" },
    { value: 10, label: "reaSqct" },
  ];

  console.log(data);
  const chartColors = colors || ["#387ADF", "skyblue", "#FFBE98", "grey"];
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
