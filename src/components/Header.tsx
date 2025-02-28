import React from 'react';
import BackGroungImage from '../assets/BackgroundImage.jpeg';

const Header = () => {
  return (
    <div
      className="header-container text-center"
      style={{
        backgroundImage: `url(${BackGroungImage})`,
      }}
    >
      <h1>Welcome to EBook Website</h1>
    </div>
  );
};

export default Header;
