import { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SwipeCard = ({ onComplete }) => {
  const navigate = useNavigate();
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  const lastTouchY = useRef(0);
  const velocityY = useRef(0);
  const lastTimeStamp = useRef(0);

  const handleStart = (clientY) => {
    setStartY(clientY);
    setIsDragging(true);
    lastTouchY.current = clientY;
    lastTimeStamp.current = Date.now();
    velocityY.current = 0;
    
    if (cardRef.current) {
      cardRef.current.classList.add('dragging');
    }
  };

  const handleMove = (clientY) => {
    if (!isDragging) return;

    const currentTime = Date.now();
    const deltaTime = currentTime - lastTimeStamp.current;
    const deltaY = lastTouchY.current - clientY;
    
    if (deltaTime > 0) {
      velocityY.current = deltaY / deltaTime;
    }

    lastTouchY.current = clientY;
    lastTimeStamp.current = currentTime;

    const deltaPosition = startY - clientY;
    const newY = Math.max(0, Math.min(deltaPosition, window.innerHeight * 0.85));
    setCurrentY(newY);
  };

  const handleEnd = () => {
    setIsDragging(false);
    
    if (cardRef.current) {
      cardRef.current.classList.remove('dragging');
    }

    const shouldComplete = currentY > window.innerHeight * 0.3 || 
                          (currentY > window.innerHeight * 0.1 && Math.abs(velocityY.current) > 0.5);

    if (shouldComplete) {
      setCurrentY(window.innerHeight * 0.85);
      onComplete();
      // Navigate to dashboard after animation
      setTimeout(() => {
        console.log('Navigating to dashboard');
        navigate('/dashboard');
      }, 300);
    } else {
      setCurrentY(0);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse event handlers
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.button !== 0) return; // Only handle left click
      handleStart(e.clientY);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      handleMove(e.clientY);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [isDragging]);

  return (
    <div className="swipe-card-container">
      <div
        ref={cardRef}
        className={`swipe-card ${isDragging ? 'dragging' : ''}`}
        style={{
          transform: `translateY(${-currentY}px)`
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
          <ChevronUp className="chevron-icon" size={60} />
        </div>
      </div>
    </div>
  );
};

SwipeCard.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default SwipeCard;