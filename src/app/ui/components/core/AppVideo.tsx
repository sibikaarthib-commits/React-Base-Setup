import * as React from "react";

export type AppVideoSource = {
  src: string;
  type?: string; // e.g. "video/mp4"
};

export interface AppVideoProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src" | "children"> {
  /**
   * One or more sources for the video element.
   * If multiple are provided, the browser picks the first supported.
   */
  sources: AppVideoSource[];

  /**
   * Keep a fixed aspect ratio (e.g. 16/9 = 1.777...).
   * If omitted, video uses its natural aspect ratio.
   */
  aspectRatio?: number;

  /**
   * If true, video will expand to fill container width.
   */
  fluid?: boolean;

  /**
   * Optional overlay element (e.g. play button).
   */
  overlay?: React.ReactNode;
}

/**
 * Design-system video component.
 * - Responsive via aspectRatio + fluid
 * - Supports multiple <source> tags
 * - Leaves styling (border radius, shadow) to parent surface/card.
 */
export const AppVideo: React.FC<AppVideoProps> = ({
  sources,
  aspectRatio,
  fluid = true,
  controls = true,
  muted,
  autoPlay,
  loop,
  playsInline = true,
  overlay,
  style,
  ...rest
}) => {
  const wrapperStyle: React.CSSProperties = aspectRatio
    ? {
        position: "relative",
        width: fluid ? "100%" : "auto",
        paddingTop: `${(1 / aspectRatio) * 100}%`,
        overflow: "hidden",
        borderRadius: "inherit",
      }
    : {
        position: "relative",
        width: fluid ? "100%" : "auto",
        overflow: "hidden",
        borderRadius: "inherit",
      };

  const videoStyle: React.CSSProperties = aspectRatio
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }
    : {
        width: fluid ? "100%" : "auto",
        height: "auto",
        ...style,
      };

  return (
    <div style={wrapperStyle}>
      <video
        style={videoStyle}
        controls={controls}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        playsInline={playsInline}
        {...rest}
      >
        {sources.map((source) => (
          <source
            key={source.src}
            src={source.src}
            type={source.type ?? "video/mp4"}
          />
        ))}
        Your browser does not support the video tag.
      </video>

      {overlay && (
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
          }}
        >
          {overlay}
        </div>
      )}
    </div>
  );
};
