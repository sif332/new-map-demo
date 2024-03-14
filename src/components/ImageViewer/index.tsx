import {
  useState,
  useRef,
  WheelEvent,
  MouseEvent,
  useEffect,
  ReactNode,
} from "react";
import { Position } from "./type";
import { ImageViewerContext } from "./ImageViewerContext";

export default function ImageViewer(props: {
  src: string;
  children?: ReactNode;
}) {
  const { src, children } = props;

  const [zoom, setZoom] = useState<number>(1);
  const [imagePosition, setImagePosition] = useState<Position>({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState<Position | null>(null);
  const [displayedImageSize, setDisplayedImageSize] = useState<Position | null>(
    null
  );
  const [dragging, setDragging] = useState<boolean>(false);
  const [startDragPos, setStartDragPos] = useState<Position>({ x: 0, y: 0 });

  const viewerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (displayedImageSize && viewerRef.current) {
      const { width: viewerWidth, height: viewerHeight } =
        viewerRef.current.getBoundingClientRect();
      const imageWidth = displayedImageSize.x;
      const imageHeight = displayedImageSize.y;

      console.log({ imageWidth: imageWidth, imageHeight: imageHeight });

      // Init Display the image at the center of the viewer
      const initialX = (viewerWidth - imageWidth) / 2;
      const initialY = (viewerHeight - imageHeight) / 2;

      setImagePosition({ x: initialX, y: initialY });
    }
  }, [displayedImageSize]);

  useEffect(() => {
    const handleWheel: EventListener = (event) => {
      const e = event as unknown as WheelEvent;
      e.preventDefault();
      const scaleAmount = 0.1;

      if (!viewerRef.current) return;

      const rect = viewerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - imagePosition.x;
      const mouseY = e.clientY - rect.top - imagePosition.y;

      let newZoom = zoom;
      if (e.deltaY < 0) {
        newZoom = zoom * (1 + scaleAmount);
      } else if (e.deltaY > 0) {
        newZoom = Math.max(1, zoom * (1 - scaleAmount));
      }

      const newX = e.clientX - rect.left - (mouseX * newZoom) / zoom;
      const newY = e.clientY - rect.top - (mouseY * newZoom) / zoom;

      setZoom(newZoom);
      setImagePosition({ x: newX, y: newY });
    };

    const viewer = viewerRef.current;
    //passive false for prevent entire page scrolling, cannot attach handleWheel event direactly to the viewer div
    //because React not support setup passive: false
    viewer?.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      viewer?.removeEventListener("wheel", handleWheel);
    };
  }, [imagePosition, zoom]);

   //update displayedImageSize when viewport has been changed (Responsive Design)
   useEffect(() => {
    if (!viewerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      handleImageLoad();
    });
    resizeObserver.observe(viewerRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartDragPos({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y,
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setImagePosition({
        x: e.clientX - startDragPos.x,
        y: e.clientY - startDragPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleImageLoad = () => {
    const image = imageRef.current;
    if (image) {
      //image size that has already been calculated by CSS
      setDisplayedImageSize({ x: image.offsetWidth, y: image.offsetHeight });
      //actual image size
      setImageSize({ x: image.naturalWidth, y: image.naturalHeight });
      console.log("actual image size:", {
        x: image.naturalWidth,
        y: image.naturalHeight,
      });
    }
  };

  return (
    <ImageViewerContext.Provider
      value={{
        imagePosition: imagePosition,
        zoom: zoom,
        imageSize: imageSize,
        displayedImageSize: displayedImageSize,
      }}
    >
      <div
        ref={viewerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          overflow: "hidden",
          position: "relative",
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        <img
          ref={imageRef}
          src={src}
          alt="the_image"
          onLoad={handleImageLoad}
          style={{
            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
          }}
          draggable={false}
        />
        {children}
      </div>
    </ImageViewerContext.Provider>
  );
}
