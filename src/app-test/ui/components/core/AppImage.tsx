import * as React from "react";

export interface AppImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: number;
  cover?: boolean;
}

export const AppImage: React.FC<AppImageProps> = ({
  aspectRatio,
  cover = true,
  style,
  ...rest
}) => {
  const wrapperStyle: React.CSSProperties = aspectRatio
    ? {
        position: "relative",
        width: "100%",
        paddingTop: `${(1 / aspectRatio) * 100}%`,
        overflow: "hidden",
        borderRadius: "inherit",
      }
    : {
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: "inherit",
      };

  const imgStyle: React.CSSProperties = {
    position: aspectRatio ? "absolute" : "static",
    top: aspectRatio ? 0 : undefined,
    left: aspectRatio ? 0 : undefined,
    width: "100%",
    height: aspectRatio ? "100%" : "auto",
    objectFit: cover ? "cover" : "contain",
    ...style,
  };

  return (
    <div style={wrapperStyle}>
      <img {...rest} style={imgStyle} />
    </div>
  );
};
