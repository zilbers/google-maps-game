import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 31.768318, lng: 35.213711 }}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
