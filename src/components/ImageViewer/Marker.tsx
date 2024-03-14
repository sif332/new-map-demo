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

// Function to convert natural image coordinates to displayed (offset) coordinates
export const convertNaturalToOffset = (
  naturalPosition: Position,
  imageSize: Position,
  displayedImageSize: Position,
  zoom: number,
  imagePosition: Position
): Position => {
  // Calculate scaling factors based on natural and displayed dimensions
  const scaleX = displayedImageSize.x / imageSize.x;
  const scaleY = displayedImageSize.y / imageSize.y;

  // Adjust the natural position by the scaling factors and zoom, then apply the current image position
  const adjustedX = naturalPosition.x * scaleX * zoom + imagePosition.x;
  const adjustedY = naturalPosition.y * scaleY * zoom + imagePosition.y;

  return { x: adjustedX, y: adjustedY };
};

export const convertOffsetToNatural = (
  offsetPosition: Position, // The current position in the offset (displayed) coordinates
  imageSize: Position, // Natural size of the image
  displayedImageSize: Position, // Displayed (offset) size of the image
  zoom: number, // Current zoom level
  imagePosition: Position // Current position of the image within the viewer
): Position => {
  // Calculate the inverse scaling factors based on natural and displayed dimensions
  const scaleX = imageSize.x / displayedImageSize.x;
  const scaleY = imageSize.y / displayedImageSize.y;

  // Adjust the offset position to account for the current zoom and image position,
  // then apply the inverse scaling factor to get the natural coordinates
  const adjustedX = ((offsetPosition.x - imagePosition.x) / zoom) * scaleX;
  const adjustedY = ((offsetPosition.y - imagePosition.y) / zoom) * scaleY;

  return { x: adjustedX, y: adjustedY };
};
