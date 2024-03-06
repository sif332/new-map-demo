import {
  Map as MapGL,
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl";
import { Pin } from "../Pin";
import React, { useRef, useState } from "react";

export default function MapBoxGL(props: {
  position: { lat: number; lng: number };
}) {
  const { position } = props;

  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState({
    longitude: position.lng,
    latitude: position.lat,
    zoom: 14,
  });

  console.log("MapBoxGL Render");

  const zoomIn = () => {
    const map = mapRef.current?.getMap();
    if (map) {
      map.flyTo({ zoom: map.getZoom() + 1 }); // Smooth zoom in
    }
  };

  const zoomOut = () => {
    const map = mapRef.current?.getMap();
    if (map) {
      map.flyTo({ zoom: map.getZoom() - 1 }); // Smooth zoom out
    }
  };

  return (
    <MapGL
      ref={mapRef}
      initialViewState={viewState}
      // longitude={viewState.longitude}
      // latitude={viewState.latitude}
      // zoom={viewState.zoom}
      mapboxAccessToken="pk.eyJ1Ijoid29yYXdhdGUiLCJhIjoiY2xubXpmMjVuMDE4NzJybGp3Zjc0YjJudSJ9.lMMtWaTf7t_bIzyghIqTTA"
      style={{ width: 400, height: 400 }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
      // onMove={(e) => {
      //   setViewState(e.viewState);
      // }}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl showCompass={false} position="top-left" />
      <ScaleControl />

      <Marker longitude={position.lng} latitude={position.lat} anchor="center">
        <Pin />
      </Marker>

      <div
        className="flex gap-4 text-red-500"
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
      </div>
    </MapGL>
  );
}
