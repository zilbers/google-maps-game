import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  Circle,
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
        const faction = Math.random() > 0.5;
        city.faction = faction;
        return (
          <>
            <Marker
              key={city.Id}
              position={{
                lat: parseFloat(city.lat),
                lng: parseFloat(city.lng),
              }}
              onClick={() => {
                setSelectedCity(city);
              }}
              icon={{
                url: faction
                  ? '/assassins-creed-logo.svg'
                  : '/knights_templar_cross.svg',
                scaledSize: faction
                  ? new window.google.maps.Size(40, 40)
                  : new window.google.maps.Size(30, 30),
              }}
            />
            <Circle
              defaultCenter={{
                lat: parseFloat(city.lat),
                lng: parseFloat(city.lng),
              }}
              radius={10000 * Math.random()}
              options={{ strokeColor: faction ? '#00ffff' : '#ff0000' }}
            />
          </>
        );
      })}
      {selectedCity && (
        <Circle
          defaultCenter={{
            lat: parseFloat(selectedCity.lat),
            lng: parseFloat(selectedCity.lng),
          }}
          radius={3000}
          options={{ strokeColor: '#ff0000' }}
        />
      )}

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
