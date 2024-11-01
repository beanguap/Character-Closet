import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import PropTypes from 'prop-types';

const SwipeCard = ({ onComplete }) => {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Example useEffect to avoid no-unused-vars error
    console.log('SwipeCard component mounted');
  }, []);
  
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const deltaY = startY - e.touches[0].clientY;
      setCurrentY(Math.max(0, Math.min(deltaY, 200)));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (currentY > 100) {
      onComplete();
    } else {
      setCurrentY(0);
    }
  };

  return (
    <div className="swipe-card-container">
      <div 
        className="swipe-card"
        style={{ 
          transform: `translateY(${-currentY}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h1 className="title">
          <img src="src/assets/Character-Closet.png" alt="Character Closet" />
        </h1>
        <div className="wardrobe-carousel">Wardrobe Carousel</div>
        <div className="swipe-indicator">
          <p>Pull up to get started</p>
          <ChevronUp className="chevron-icon" size={24} />
        </div>
      </div>
    </div>
  );
};

SwipeCard.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default SwipeCard;