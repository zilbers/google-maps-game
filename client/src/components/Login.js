import React, { useContext } from 'react';
import './style/Login.css';

function App({ onClick }) {
  return (
    <div className='login'>
      <h2>Choose your faction</h2>
      <div className='factions'>
        <div className='display-faction' onClick={() => onClick('assassins')}>
          <img
            className='faction-icon-assassins'
            src='/icons/assassins-creed-logo.svg'
          />
          <span>Assassins</span>
        </div>

        <div className='display-faction' onClick={() => onClick('tempalrs')}>
          <img
            className='faction-icon-templars'
            src='/icons/knights_templar_cross.svg'
          />
          <span>Templars</span>
        </div>
      </div>
    </div>
  );
}

export default App;
