import React from 'react';
import WrappedMap from './components/Map';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='Menu'></div>
      <div className='Map'>
        <WrappedMap
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
        />
      </div>
    </div>
  );
}

export default App;
