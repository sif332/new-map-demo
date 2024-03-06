import MapComponent from "./components/MapComponent";
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <div>
      <h1>React Leaflet Example</h1>
      <MapComponent position={[51.505, -0.09]} />
    </div>
  );
}

export default App;
