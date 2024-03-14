import GoogleMap from "./components/GoogleMap";
import MapBoxGL from "./components/MapBox";
import MapComponent from "./components/MapLeaflet";
import "leaflet/dist/leaflet.css";
//missing this import css will cause Mapbox to display Marker improperly
import "mapbox-gl/dist/mapbox-gl.css";
import ImageViewer from "./components/ImageViewer";
import { MarkerIV } from "./components/ImageViewer/Marker";

function App() {
  //lat long
  const position: L.LatLngExpression = [14.197053, 100.650128];

  const imageSrc =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXjKATWpc9ZWEcYc1aC1_kTqv4x2_Pe-IoGg&usqp=CAU";

  return (
    <div>
      <h1>React Leaflet Example</h1>
      <MapComponent position={position} />
      <h1>React MapBoxGL Example</h1>
      <MapBoxGL position={{ lat: position[0], lng: position[1] }} />
      <h1>React MapBoxGL Example</h1>
      <GoogleMap position={{ lat: position[0], lng: position[1] }} />
      <div style={{ width: 500, height: 500 }}>
        <ImageViewer src={imageSrc}>
          <MarkerIV markerPosition={{ x: 0, y: 0 }}>
            <div
              style={{
                width: 50,
                height: 50,
                backgroundColor: "red",
                zIndex: 10,
              }}
            >
              Hello World
            </div>
          </MarkerIV>
          <MarkerIV markerPosition={{ x: 225, y: 0 }}>
            <div
              style={{
                width: 50,
                height: 50,
                backgroundColor: "red",
                zIndex: 10,
              }}
            >
              Hello World
            </div>
          </MarkerIV>
          <MarkerIV markerPosition={{ x: 225, y: 225 }}>
            <div
              style={{
                width: 50,
                height: 50,
                backgroundColor: "red",
                zIndex: 10,
              }}
            >
              Hello World
            </div>
          </MarkerIV>
        </ImageViewer>
      </div>
    </div>
  );
}

export default App;
