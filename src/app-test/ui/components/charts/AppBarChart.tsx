import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import type { BarChartProps } from "@mui/x-charts/BarChart";
import type {
  ChartSizeProps,
  ChartLayoutProps,
  ChartColorProps,
  ChartLegendProps,
  ChartGridProps,
  ChartTooltipProps,
} from "./types";

export interface AppBarChartSeries {
  id?: string;
  label?: string;
  data: number[];
  color?: string;
  stack?: string;
}

export interface AppBarChartProps
  extends ChartSizeProps,
    ChartLayoutProps,
    ChartColorProps,
    ChartLegendProps,
    ChartGridProps,
    ChartTooltipProps {
  xAxis: { data: (string | number)[]; label?: string }[];
  series: AppBarChartSeries[];
  /**
   * Additional low-level props passed directly to MUI's BarChart.
   */
  slotProps?: BarChartProps["slotProps"];
  sx?: BarChartProps["sx"];
}

export const AppBarChart: React.FC<AppBarChartProps> = ({
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
  slotProps,
  sx,
}) => {
  return (
    <BarChart
      xAxis={xAxis}
      series={series}
      width={width}
      height={height}
      colors={colors}
      margin={margin}
      grid={{
        vertical: showYAxisGrid,
        horizontal: showXAxisGrid,
      }}
      slotProps={{
        legend: showLegend ? { position: legendPosition as any } : { position: undefined },
        tooltip: { trigger: showTooltip ? "axis" : "none" },
        ...slotProps,
      }}
      sx={sx}
    />
  );
};
