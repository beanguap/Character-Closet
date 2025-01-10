// Dashboard.jsx
import React from 'react';
import { Typography } from '@mui/material';

import '../../styles/variables.css';
import '../../styles/layout.css';    
import '../../styles/claycard.css';  // We'll place the laser path animation here

import TopBar from '../../components/TopBar/TopBar.jsx';
import BottomNav from '../../components/BottomNav/BottomNav.jsx';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <TopBar />

      <main className="dashboard-content">
        {/* CARD 1 */}
        <div className="clay-card">
          <div className="card-content">
            <Typography variant="h5">Outfit Detection</Typography>
            <Typography variant="body1">
              Process images for fashion item recognition.
            </Typography>
          </div>
          <svg
            className="laser-svg"
            viewBox="0 0 280 200"
            fill="none"
          >
            <path
              d="M 20,0
                 H 260
                 A 20,20 0 0 1 280,20
                 V 180
                 A 20,20 0 0 1 260,200
                 H 20
                 A 20,20 0 0 1 0,180
                 V 20
                 A 20,20 0 0 1 20,0
                 Z"
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
          <svg
            className="laser-svg"
            viewBox="0 0 280 200"
            fill="none"
          >
            <path
              d="M 20,0
                 H 260
                 A 20,20 0 0 1 280,20
                 V 180
                 A 20,20 0 0 1 260,200
                 H 20
                 A 20,20 0 0 1 0,180
                 V 20
                 A 20,20 0 0 1 20,0
                 Z"
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
          <svg
            className="laser-svg"
            viewBox="0 0 280 200"
            fill="none"
          >
            <path
              d="M 20,0
                 H 260
                 A 20,20 0 0 1 280,20
                 V 180
                 A 20,20 0 0 1 260,200
                 H 20
                 A 20,20 0 0 1 0,180
                 V 20
                 A 20,20 0 0 1 20,0
                 Z"
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
          <svg
            className="laser-svg"
            viewBox="0 0 280 200"
            fill="none"
          >
            <path
              d="M 20,0
                 H 260
                 A 20,20 0 0 1 280,20
                 V 180
                 A 20,20 0 0 1 260,200
                 H 20
                 A 20,20 0 0 1 0,180
                 V 20
                 A 20,20 0 0 1 20,0
                 Z"
            />
          </svg>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
