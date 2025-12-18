export type ChartSizeProps = {
  width?: number;
  height?: number;
};

export type ChartLayoutProps = {
  /**
   * Padding around the chart drawing area in px.
   */
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
};

export type ChartColorProps = {
  /**
   * Explicit colors for series; falls back to theme if empty.
   */
  colors?: string[];
};

export type ChartLegendProps = {
  /**
   * Show or hide legend if supported.
   */
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
};

export type ChartGridProps = {
  showXAxisGrid?: boolean;
  showYAxisGrid?: boolean;
};

export type ChartTooltipProps = {
  /**
   * Enable default tooltip.
   */
  showTooltip?: boolean;
};
