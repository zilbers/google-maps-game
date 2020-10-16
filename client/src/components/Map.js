import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import mapStyles from './style/mapStyles';

function Map() {
  const [cities, setCities] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: currentCities } = await axios.get('/api/v1/cities');
        setCities(currentCities);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, []);

  return cities ? (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 31.768318, lng: 35.213711 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {cities.map((city) => {
        return (
          <Marker
            key={city.Id}
            position={{ lat: parseFloat(city.lat), lng: parseFloat(city.lng) }}
            onClick={() => {
              setSelectedCity(city);
            }}
            icon={{
              url: '/Knights_Templar.svg',
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        );
      })}
      {selectedCity && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedCity.lat),
            lng: parseFloat(selectedCity.lng),
          }}
          onCloseClick={() => setSelectedCity(null)}
        >
          <div
            className='Full-description'
            dangerouslySetInnerHTML={{
              __html: `<h3>${selectedCity.Name}</h3>${selectedCity.FullDescription}`,
            }}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <h1>Loading..</h1>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
