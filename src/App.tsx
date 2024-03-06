import Map from "react-map-gl";

function App() {
  return (
    <div className="w-[500px] h-[500px] border border-red-500">
      <Map
        mapboxAccessToken="pk.eyJ1Ijoid29yYXdhdGUiLCJhIjoiY2xubXpmMjVuMDE4NzJybGp3Zjc0YjJudSJ9.lMMtWaTf7t_bIzyghIqTTA"
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}

export default App;
