import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ImageViewerContext } from "./ImageViewerContext";
import { Position } from "./type";

export const MarkerIV = ({
  children,
  markerPosition,
}: {
  children: ReactNode;
  markerPosition: Position;
}) => {
  const context = useContext(ImageViewerContext);
  const [adjustedPosition, setAdjustedPosition] = useState({ x: 0, y: 0 });

  //imageSize is actual image file size
  //displayedImageSize is image size itself plus any added border or scrollbar, but not margins (By CSS).

  useEffect(() => {
    if (context) {
      const { imagePosition, zoom, imageSize, displayedImageSize } = context;
      if (!imageSize || !displayedImageSize) return;

      // Calculate scaling factors based on natural and displayed dimensions
      const scaleX = displayedImageSize.x / imageSize.x;
      const scaleY = displayedImageSize.y / imageSize.y;

      // Adjust marker position by scaling factors
      const adjustedX = markerPosition.x * scaleX * zoom + imagePosition.x;
      const adjustedY = markerPosition.y * scaleY * zoom + imagePosition.y;

      setAdjustedPosition({ x: adjustedX, y: adjustedY });
    }
  }, [markerPosition, context]);

  const markerStyle: React.CSSProperties = {
    position: "absolute",
    left: adjustedPosition.x,
    top: adjustedPosition.y,
    transform: "translate(-50%, -50%)",
    cursor: "auto",
  };

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      style={markerStyle}
    >
      {children}
    </div>
  );
};
