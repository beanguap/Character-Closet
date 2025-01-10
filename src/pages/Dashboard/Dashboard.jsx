// Dashboard.jsx
import React from 'react';
import { Typography, Paper } from '@mui/material';

// Import the relevant CSS
import '../../styles/variables.css'; 
import '../../styles/layout.css';    
import '../../styles/claycard.css'; 

import TopBar from '../../components/TopBar/TopBar.jsx';
import BottomNav from '../../components/BottomNav/BottomNav.jsx'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <TopBar />
      <main className="dashboard-content">
        <Paper className="clay-card">
          <Typography variant="h5">Outfit Detection</Typography>
          <Typography variant="body1">
            Process images for fashion item recognition.
          </Typography>
        </Paper>

        <Paper className="clay-card">
          <Typography variant="h5">Results</Typography>
          <Typography variant="body1">
            View recommended items and styling suggestions.
          </Typography>
        </Paper>

        <Paper className="clay-card">
          <Typography variant="h5">Scanner</Typography>
          <Typography variant="body1">
            Open the camera for live outfit detection.
          </Typography>
        </Paper>

        <Paper className="clay-card">
          <Typography variant="h5">Upload Zone</Typography>
          <Typography variant="body1">
            Drag and drop or pick an image file.
          </Typography>
        </Paper>
      </main>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
