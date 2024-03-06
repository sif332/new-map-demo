import GoogleMapReact from "google-map-react";

export default function GoogleMap(props: {
  position: { lat: number; lng: number };
}) {
  const { position } = props;
  const defaultProps = {
    center: {
      lat: position.lat,
      lng: position.lng,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: 500, width: 500 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </div>
  );
}
