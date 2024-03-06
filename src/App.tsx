import MapComponent from "./components/MapLeaflet";
import "leaflet/dist/leaflet.css";

function App() {
  //lat long
  const position: L.LatLngExpression = [14.197053, 100.650128];
  return (
    <div>
      <h1>React Leaflet Example</h1>
      <MapComponent position={position} />
    </div>
  );
}

export default App;
