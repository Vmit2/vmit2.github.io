import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

enum LibraryName {
  PLACES = "places",
  DRAWING = "drawing",
  GEOMETRY = "geometry",
  LOCAL_CONTEXT = "localContext",
  VISUALIZATION = "visualization",
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

interface Props {
  apiKey: string;
}

const libraries = [LibraryName.PLACES];

function MapContainer(props: Props) {
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: props.apiKey,
    libraries: libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      localStorage.setItem(
        "CurrentLocation",
        JSON.stringify({ lat: latitude, lng: longitude })
      );
      setCenter({ lat: latitude, lng: longitude });
      setMarkerPosition({ lat: latitude, lng: longitude });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      localStorage.setItem(
        "CurrentLocation",
        JSON.stringify({ lat: latitude, lng: longitude })
      );
      setCenter({ lat: latitude, lng: longitude });
      setMarkerPosition({ lat: latitude, lng: longitude });
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  const handleMarkerDrag = (event: google.maps.MapMouseEvent) => {
    if (mapRef.current && event.latLng) {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const handleCenterChange = () => {
    const newCenter = mapRef.current?.getCenter();
    if (newCenter) {
      setCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
    }
  };

  const localCordinates = localStorage.getItem("CurrentLocation");
  const currentLocation = center ||
    (localCordinates && JSON.parse(localCordinates)) 
    // || {
    //   lat: 37.7749,
    //   lng: -122.4194,
    // };

  return (
    <>
      <div className="mapStyle">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation}
          zoom={16}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onDragEnd={handleCenterChange}
        >
          {markerPosition && (
            <Marker
              draggable
              position={markerPosition}
              onDragEnd={handleMarkerDrag}
              title="Current Location"
            />
          )}
        </GoogleMap>
      </div>
    </>
  );
}

export default MapContainer;
