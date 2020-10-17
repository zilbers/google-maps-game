import React, { useContext } from 'react';
import { UserContext } from './context/UserContext';
import WrappedMap from './pages/Map';
import SideMenu from './components/SideMenu';
import Login from './components/Login';
import './App.css';

function App() {
  const context = useContext(UserContext);

  return (
    <div className='App'>
      {!context.faction && <Login onClick={context.chooseFaction} />}
      <SideMenu />
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
