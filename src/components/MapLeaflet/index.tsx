import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import PopUpDemo from "../PopUpDemo";

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

  // Define a custom icon using divIcon
  const customIcon = divIcon({
    className: "custom-div-icon",
    html: "<div style='background-color: red; width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; color: white;'>Hello</div>",
    iconSize: [50, 50],
    iconAnchor: [25, 25], // Adjust based on the exact positioning you need
  });

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
        <Marker position={position} icon={customIcon}>
          <Popup offset={[0, -25]}>
            <PopUpDemo />
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default MapComponent;
