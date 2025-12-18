// src/ui/charts/AppAreaChart.tsx
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

export interface AppAreaChartSeries {
  id?: string;
  label?: string;
  data: number[];
  color?: string;
  area?: boolean;
}

export interface AppAreaChartProps
  extends ChartSizeProps,
    ChartLayoutProps,
    ChartColorProps,
    ChartLegendProps,
    ChartGridProps,
    ChartTooltipProps {
  xAxis: { data: (string | number)[]; label?: string }[];
  series: AppAreaChartSeries[];
  slotProps?: LineChartProps["slotProps"];
  sx?: LineChartProps["sx"];
}

export const AppAreaChart: React.FC<AppAreaChartProps> = (props) => {
  const { series, ...rest } = props;
  return (
    <LineChart
      {...rest}
      series={series.map((s) => ({
        ...s,
        area: true,
      }))}
    />
  );
};
