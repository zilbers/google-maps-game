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
import { GameContext } from '../context/GameContext';
import mapStyles from '../components/style/mapStyles';
import '../components/style/Map.css';

const options = {
  mapTypeControl: false,
  panControl: false,
  streetViewControl: false,
  zoomControl: false,
};

function Map() {
  const userContext = useContext(UserContext);
  const gameContext = useContext(GameContext);

  const [cities, setCities] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userChosenLocation, setUserChosenLocation] = useState(null);
  const [action, setAction] = useState(null);
  const [formValues, setFormValues] = useState(null);

  function getCurrentLocation(position) {
    setCurrentLocation({
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    });
  }

  const rad = function (x) {
    return (x * Math.PI) / 180;
  };

  const getDistance = function (p1, p2) {
    const earthRadius = 6378137; // Earth’s mean radius in meter
    const distanceLat = rad(p2.lat() - p1.lat());
    const distanceLng = rad(p2.lng() - p1.lng());
    const a =
      Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
      Math.cos(rad(p1.lat())) *
        Math.cos(rad(p2.lat())) *
        Math.sin(distanceLng / 2) *
        Math.sin(distanceLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return Math.floor(distance); // returns the distance in meter
  };

  const handleClick = ({ latLng }) => {
    setUserChosenLocation({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
    const distance = getDistance(latLng, {
      lat: () => currentLocation.lat,
      lng: () => currentLocation.lng,
    });
    gameContext.setDistance(distance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (formValues.action) {
      case 'move':
        setCurrentLocation(userChosenLocation);
        break;
      case 'attack':
        break;
      case 'defend':
        break;
    }
    setUserChosenLocation(null);
    setAction(null);
  };

  useEffect(() => {
    console.log(gameContext, userContext);
    (async () => {
      try {
        const { data: currentCities } = await axios.get('/api/v1/cities');
        setCities(currentCities);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getCurrentLocation);
        } else {
          setCurrentLocation({ lat: 31.768318, lng: 35.213711 });
          alert('Geolocation is not supported by this browser.');
        }
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, []);

  return cities && currentLocation ? (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={currentLocation}
      defaultOptions={{ ...options, styles: mapStyles }}
      onClick={handleClick}
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
      {userContext.faction && (
        <Marker
          position={currentLocation}
          icon={{
            url:
              userContext.faction === 'assassins'
                ? '/icons/assassin.png'
                : '/icons/knight.png',
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      )}

      {/* User placed Marker */}
      {userChosenLocation && (
        <Marker
          position={userChosenLocation}
          icon={{
            url: '/icons/fighting.png',
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          onClick={() => {
            setAction(userChosenLocation);
          }}
        />
      )}
      {action && (
        <InfoWindow position={action} onCloseClick={() => setAction(null)}>
          <form className='action-form' onSubmit={handleSubmit}>
            <h3>Choose action!</h3>
            <h4>Your distance is {gameContext.distance} meters</h4>

            <span>
              <input
                type='radio'
                id='move'
                name='action'
                onChange={() => setFormValues({ action: 'move' })}
              ></input>
              <label htmlFor='move'>Move here</label>
            </span>

            <span>
              <input
                type='radio'
                id='attack'
                name='action'
                onChange={() => setFormValues({ action: 'attack' })}
              ></input>
              <label htmlFor='attack'>Attack</label>
            </span>

            <span>
              <input
                type='radio'
                id='defend'
                name='action'
                onChange={() => setFormValues({ action: 'defend' })}
              ></input>
              <label htmlFor='defend'>Defend</label>
            </span>

            <input type='submit' value='Submit' />
          </form>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <h1>Loading..</h1>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
