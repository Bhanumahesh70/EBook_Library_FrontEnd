import React from 'react';
import BackGroungImage from '../../assets/BgHd2.jpg';

const Header = () => {
  return (
    <div
      className="header-container text-center mb-4 p-3"
      style={{
        position: 'relative',
        height: '40vh',
        backgroundImage: `url(${BackGroungImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // black with 50% opacity
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <h1 style={{ zIndex: 2, textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
        Welcome to EBook Website
      </h1>
    </div>
  );
};

export default Header;
