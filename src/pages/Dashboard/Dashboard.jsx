import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import '../../styles/variables.css';
import '../../styles/layout.css';
import '../../styles/claycard.css';
import '../../styles/scrollbar.css'; // Import the new scrollbar styles

import TopBar from '../../components/TopBar/TopBar.jsx';
import BottomNav from '../../components/BottomNav/BottomNav.jsx';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <TopBar />

      <main className="dashboard-content">

        {/* 
          Define the laserGlow filter once at the top-level; 
          we’ll reference it in each card’s path via filter="url(#laserGlow)".
        */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* CARD 1 */}
        <div className="clay-card">
          <div className="card-content">
            <Typography variant="h5">Outfit Detection</Typography>
            <Typography variant="body1">
              Process images for fashion item recognition.
            </Typography>
          </div>
          <svg className="laser-svg" viewBox="0 0 280 200" preserveAspectRatio="none">
            <path
              d="M 20,0 
                 H 260 
                 C 270,0 280,10 280,20 
                 V 180 
                 C 280,190 270,200 260,200 
                 H 20 
                 C 10,200 0,190 0,180 
                 V 20 
                 C 0,10 10,0 20,0 
                 Z"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinejoin="round"
              filter="url(#laserGlow)"
            />
          </svg>
        </div>

        {/* CARD 2 */}
        <div className="clay-card">
          <div className="card-content">
            <Typography variant="h5">Results</Typography>
            <Typography variant="body1">
              View recommended items and styling suggestions.
            </Typography>
          </div>
          <svg className="laser-svg" viewBox="0 0 280 200" preserveAspectRatio="none">
            <path
              d="M 20,0 
                 H 260 
                 C 270,0 280,10 280,20 
                 V 180 
                 C 280,190 270,200 260,200 
                 H 20 
                 C 10,200 0,190 0,180 
                 V 20 
                 C 0,10 10,0 20,0 
                 Z"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinejoin="round"
              filter="url(#laserGlow)"
            />
          </svg>
        </div>

        {/* CARD 3 */}
        <div className="clay-card">
          <div className="card-content">
            <Typography variant="h5">Scanner</Typography>
            <Typography variant="body1">
              Open the camera for live outfit detection.
            </Typography>
          </div>
          <svg className="laser-svg" viewBox="0 0 280 200" preserveAspectRatio="none">
            <path
              d="M 20,0 
                 H 260 
                 C 270,0 280,10 280,20 
                 V 180 
                 C 280,190 270,200 260,200 
                 H 20 
                 C 10,200 0,190 0,180 
                 V 20 
                 C 0,10 10,0 20,0 
                 Z"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinejoin="round"
              filter="url(#laserGlow)"
            />
          </svg>
        </div>

        {/* CARD 4 */}
        <div className="clay-card">
          <div className="card-content">
            <Typography variant="h5">Upload Zone</Typography>
            <Typography variant="body1">
              Drag and drop or pick an image file.
            </Typography>
          </div>
          <svg className="laser-svg" viewBox="0 0 280 200" preserveAspectRatio="none">
            <path
              d="M 20,0 
                 H 260 
                 C 270,0 280,10 280,20 
                 V 180 
                 C 280,190 270,200 260,200 
                 H 20 
                 C 10,200 0,190 0,180 
                 V 20 
                 C 0,10 10,0 20,0 
                 Z"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinejoin="round"
              filter="url(#laserGlow)"
            />
          </svg>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
