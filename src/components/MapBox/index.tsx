import { Map as MapGL, Marker } from "react-map-gl";
import { Pin } from "../Pin";
import React, { useState } from "react";

export default function MapBoxGL(props: {
  position: { lat: number; lng: number };
}) {
  const { position } = props;
  const [viewState, setViewState] = useState({
    longitude: position.lng,
    latitude: position.lat,
    zoom: 14,
  });

  console.log("MapBoxGL Render");

  return (
    <MapGL
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
      <Marker longitude={position.lng} latitude={position.lat} anchor="center">
        <Pin />
      </Marker>
    </MapGL>
  );
}
