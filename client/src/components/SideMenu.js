import React, { useState } from 'react';
import './style/SideMenu.css';

function SideMenu() {
  const [visible, setVisible] = useState(false);

  let visibility = 'hide';

  if (visible) {
    visibility = 'show';
  }

  const toggleMenu = () => {
    setVisible(!visible);
  };

  const handleMouseDown = (e) => {
    toggleMenu();

    console.log('clicked');
    e.stopPropagation();
  };
  return (
    <div id='side-menu'>
      {visible ? (
        <div
          id='flyoutMenu'
          onMouseDown={handleMouseDown}
          className={visibility}
        >
          <h2>
            <a href='#'>Home</a>
          </h2>
          <h2>
            <a href='#'>About</a>
          </h2>
          <h2>
            <a href='#'>Contact</a>
          </h2>
          <h2>
            <a href='#'>Search</a>
          </h2>
        </div>
      ) : (
        <button id='roundButton' onMouseDown={handleMouseDown}></button>
      )}
    </div>
  );
}

export default SideMenu;
