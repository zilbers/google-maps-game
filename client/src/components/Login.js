import React, { useState } from 'react';
import './style/Login.css';

function App({ onClick }) {
  return (
    <div className='login'>
      <h2>Choose your faction</h2>
      <div className='factions'>
        <div className='display-faction' onClick={() => onClick('assassins')}>
          <img
            className='faction-icon-assassins'
            src='/assassins-creed-logo.svg'
          />
          <span>Asassins</span>
        </div>

        <div className='display-faction' onClick={() => onClick('tempalrs')}>
          <img
            className='faction-icon-templars'
            src='/knights_templar_cross.svg'
          />
          <span>Tempalrs</span>
        </div>
      </div>
    </div>
  );
}

export default App;
