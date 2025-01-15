// src/pages/Home/Home.jsx
import React from 'react';
import CharacterScene from '../../components/CharacterScene/CharacterScene';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Character Closet</h1>

      <div className="canvas-wrapper">
        <CharacterScene />
      </div>

      <p className="home-description">
        Rotate and customize your 3D character!
      </p>
    </div>
  );
};

export default Home;
