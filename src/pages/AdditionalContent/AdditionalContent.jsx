// AdditionalContent.jsx
import React from 'react';
import { Typography } from '@mui/material';

import '../../styles/variables.css';
import '../../styles/layout.css';
import '../../styles/claycard.css';

const AdditionalContent = () => {
  return (
    <div className="dashboard-container">
      <main className="dashboard-content">
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

        {/* CARD 5 */}
        <div className="clay-card">
          <div className="card-content">
            <Typography variant="h5">Another Feature</Typography>
            <Typography variant="body1">
              Description of another feature.
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
    </div>
  );
};

export default AdditionalContent;