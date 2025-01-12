//import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
//import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import './map.css';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

// Configuración del contenedor del mapa
const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const Map = ({ activityName, city, country }) => {

  const [center, setCenter] = useState(null);

  // Cargar la API de Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Función para geocodificar la dirección y obtener las coordenadas
  const geocodeAddress = (address) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        const { lat, lng } = results[0].geometry.location;
        setCenter({ lat: lat(), lng: lng() });
      } else {
        console.error("Geocodificación fallida: " + status);
      }
    });
  };

  useEffect(() => {
    if (isLoaded && activityName && city && country) {
      const address = `${activityName}, ${city}, ${country}`;
      geocodeAddress(address);
    }
  }, [activityName, city, country, isLoaded]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  if (!center) return <div>Geocodificando dirección...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

/*
const Map = ({latitude, longitude}) => {
    console.log(latitude, longitude); // Verifica las coordenadas recibidas

    return(
        <div>
            <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[latitude, longitude]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
        </div>
    )
}*/

export default Map;