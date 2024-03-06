import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  position: L.LatLngExpression;
}

const regularMapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const satelliteMapUrl =
  "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid29yYXdhdGUiLCJhIjoiY2xubXpmMjVuMDE4NzJybGp3Zjc0YjJudSJ9.lMMtWaTf7t_bIzyghIqTTA";

function MapComponent({ position }: MapProps) {
  const [mapLayer, setMapLayer] = useState(regularMapUrl);

  const toggleMapLayer = () => {
    setMapLayer(mapLayer === regularMapUrl ? satelliteMapUrl : regularMapUrl);
  };

  return (
    <>
      <button onClick={toggleMapLayer} style={{ margin: 10 }}>
        Toggle Map View
      </button>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: 500, width: 500 }}
      >
        <TileLayer
          url={mapLayer}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default MapComponent;
