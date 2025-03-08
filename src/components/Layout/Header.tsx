import React from 'react';
import BackGroungImage from '../assets/BackgroundImage.jpeg';

const Header = () => {
  return (
    <div
      className="header-container text-center mb-4 p-3"
      style={{
        backgroundImage: `url(${BackGroungImage})`,
      }}
    >
      <h1>Welcome to EBook Website</h1>
    </div>
  );
};

export default Header;
