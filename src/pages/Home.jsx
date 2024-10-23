import { useState } from 'react';
import SwipeCard from '../components/SwipeCard';
import '../styles/SwipeCard.css';

const Home = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleComplete = () => {
    setShowWelcome(false);
  };

  return (
    <div>
      {showWelcome && <SwipeCard onComplete={handleComplete} />}
      {/* Your existing home page content */}
      <h1>Welcome to Character Closet</h1>
      <p>Customize outfits and explore fashion</p>
    </div>
  );
};

export default Home;