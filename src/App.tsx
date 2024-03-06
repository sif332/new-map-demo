import GoogleMap from "./components/GoogleMap";
import MapBoxGL from "./components/MapBox";
import MapComponent from "./components/MapLeaflet";
import "leaflet/dist/leaflet.css";
//missing this import css will cause Mapbox to display Marker improperly
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  //lat long
  const position: L.LatLngExpression = [14.197053, 100.650128];
  return (
    <div>
      <h1>React Leaflet Example</h1>
      <MapComponent position={position} />
      <h1>React MapBoxGL Example</h1>
      <MapBoxGL position={{ lat: position[0], lng: position[1] }} />
      <h1>React MapBoxGL Example</h1>
      <GoogleMap position={{ lat: position[0], lng: position[1] }} />
    </div>
  );
}

export default App;
