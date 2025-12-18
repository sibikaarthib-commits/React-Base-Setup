import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import type { LineChartProps } from "@mui/x-charts/LineChart";
import type {
  ChartSizeProps,
  ChartLayoutProps,
  ChartColorProps,
  ChartLegendProps,
  ChartGridProps,
  ChartTooltipProps,
} from "./types";

export interface AppLineChartSeries {
  id?: string;
  label?: string;
  data: number[];
  color?: string;
  curve?: LineChartProps["series"][number]["curve"];
}

export interface AppLineChartProps
  extends ChartSizeProps,
    ChartLayoutProps,
    ChartColorProps,
    ChartLegendProps,
    ChartGridProps,
    ChartTooltipProps {
  xAxis: { data: (string | number)[]; label?: string }[];
  series: AppLineChartSeries[];
  showMarkers?: boolean;
  slotProps?: LineChartProps["slotProps"];
  sx?: LineChartProps["sx"];
}

const legendPositionMap: Record<string, any> = {
  bottom: { vertical: "bottom", horizontal: "center" },
  top: { vertical: "top", horizontal: "center" },
  left: { vertical: "center", horizontal: "left" },
  right: { vertical: "center", horizontal: "right" },
};

export const AppLineChart: React.FC<AppLineChartProps> = ({
  width,
  height = 300,
  margin,
  colors,
  xAxis,
  series,
  showLegend = true,
  legendPosition = "bottom",
  showXAxisGrid = true,
  showYAxisGrid = true,
  showTooltip = true,
  showMarkers = true,
  slotProps,
  sx,
}) => {
  return (
    <LineChart
      xAxis={xAxis}
      series={series.map((s) => ({
        ...s,
        showMark: showMarkers,
      }))}
      colors={colors}
      margin={margin}
      width={width}
      height={height}
      grid={{
        vertical: showYAxisGrid,
        horizontal: showXAxisGrid,
      }}
      slotProps={{
        legend: showLegend
          ? { position: legendPositionMap[legendPosition] }
          : undefined,
        tooltip: { trigger: showTooltip ? "axis" : "none" },
        ...slotProps,
      }}
      sx={sx}
    />
  );
};
