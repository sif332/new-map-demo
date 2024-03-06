import { Map as MapGL, Marker } from "react-map-gl";

export default function MapBoxGL(props: {
  position: { lat: number; lng: number };
}) {
  const { position } = props;
  return (
    <MapGL
      mapboxAccessToken="pk.eyJ1Ijoid29yYXdhdGUiLCJhIjoiY2xubXpmMjVuMDE4NzJybGp3Zjc0YjJudSJ9.lMMtWaTf7t_bIzyghIqTTA"
      initialViewState={{
        longitude: position.lng,
        latitude: position.lat,
        zoom: 14,
      }}
      style={{ width: 400, height: 400 }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
    >
      <Marker longitude={position.lng} latitude={position.lat} anchor="bottom">
        <div className="w-[50px] h-[50px] bg-red-500">Hello</div>
      </Marker>
    </MapGL>
  );
}
