// src/ui/charts/AppPieChart.tsx
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import type { PieChartProps } from "@mui/x-charts/PieChart";
import type { ChartSizeProps, ChartColorProps, ChartTooltipProps } from "./types";

export interface AppPieDatum {
  id?: number | string;
  label?: string;
  value: number;
  color?: string;
}

export interface AppPieChartProps
  extends ChartSizeProps,
    ChartColorProps,
    ChartTooltipProps {
  /**
   * Setting innerRadius (e.g. 40 or '60%') makes it a donut chart.
   */
  innerRadius?: number | string;
  outerRadius?: number | string;
  data: AppPieDatum[];
  slotProps?: PieChartProps["slotProps"];
  sx?: PieChartProps["sx"];
}

export const AppPieChart: React.FC<AppPieChartProps> = ({
  width,
  height = 300,
  colors,
  data,
  innerRadius,
  outerRadius,
  showTooltip = true,
  slotProps,
  sx,
}) => {
  return (
    <PieChart
      width={width}
      height={height}
      colors={colors}
      series={[
        {
          data,
          innerRadius,
          outerRadius,
          highlightScope: { fade: "global", highlight: "item" },
        },
      ]}
      slotProps={{
        tooltip: { trigger: showTooltip ? "item" : "none" },
        ...slotProps,
      }}
      sx={sx}
    />
  );
};
