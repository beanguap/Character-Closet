// Dashboard.jsx
import React from 'react';
import { Typography, Paper } from '@mui/material';
import './dashboard.css'; // Same CSS
import TopBar from '../../components/TopBar/Topbar';     
import BottomNav from '../../components/BottomNav/BottomNav';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Reusable header */}
      <TopBar />

      {/* Main content area */}
      <main className="dashboard-content">
        <Paper className="clay-card" elevation={3}>
          <Typography variant="h5">Outfit Detection</Typography>
          <Typography variant="body1">Process images for fashion item recognition.</Typography>
        </Paper>

        <Paper className="clay-card" elevation={3}>
          <Typography variant="h5">Results</Typography>
          <Typography variant="body1">View recommended items and styling suggestions.</Typography>
        </Paper>

        <Paper className="clay-card" elevation={3}>
          <Typography variant="h5">Scanner</Typography>
          <Typography variant="body1">Open the camera for live outfit detection.</Typography>
        </Paper>

        <Paper className="clay-card" elevation={3}>
          <Typography variant="h5">Upload Zone</Typography>
          <Typography variant="body1">Drag and drop or pick an image file.</Typography>
        </Paper>
      </main>

      {/* Reusable footer */}
      <BottomNav />
    </div>
  );
};

export default Dashboard;
