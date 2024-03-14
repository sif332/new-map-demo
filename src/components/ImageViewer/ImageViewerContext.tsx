import { createContext } from "react";
import { Position } from "./type";

type ImageViewerContextType = {
  imageSize: Position | null;
  displayedImageSize: Position | null;
  imagePosition: Position;
  zoom: number;
};

export const ImageViewerContext = createContext<
  ImageViewerContextType | undefined
>(undefined);
