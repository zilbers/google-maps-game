import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  Circle,
} from 'react-google-maps';
import { UserContext } from '../context/UserContext';
import mapStyles from '../components/style/mapStyles';

const options = {
  mapTypeControl: false,
  panControl: false,
  streetViewControl: false,
  zoomControl: false,
};

function Map() {
  const context = useContext(UserContext);

  const [cities, setCities] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [startLocation, setStartLocation] = useState(null);

  function getCurrentLocation(position) {
    setStartLocation({
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    });
  }

  useEffect(() => {
    (async () => {
      try {
        const { data: currentCities } = await axios.get('/api/v1/cities');
        setCities(currentCities);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getCurrentLocation);
        } else {
          setStartLocation({ lat: 31.768318, lng: 35.213711 });
          alert('Geolocation is not supported by this browser.');
        }
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, []);

  return cities && startLocation ? (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={startLocation}
      defaultOptions={{ ...options, styles: mapStyles }}
    >
      {cities.map((city, index) => {
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
                  ? '/icons/assassins-creed-logo.svg'
                  : '/icons/knights_templar_cross.svg',
                scaledSize: faction
                  ? new window.google.maps.Size(40, 40)
                  : new window.google.maps.Size(30, 30),
              }}
            />
            <Circle
              key={city.Id + index}
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

      {/* Users Marker */}
      {context.faction && (
        <Marker
          position={startLocation}
          icon={{
            url:
              context.faction === 'assassins'
                ? '/icons/assassin.png'
                : '/icons/knight.png',
            scaledSize:
              context.faction === 'assassins'
                ? new window.google.maps.Size(40, 40)
                : new window.google.maps.Size(40, 40),
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <h1>Loading..</h1>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
