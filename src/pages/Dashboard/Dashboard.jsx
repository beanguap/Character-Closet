import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { Home, Camera, ShoppingBag, User } from 'lucide-react';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="top-bar">
        <Typography variant="h6" className="app-title">Character Closet</Typography>
        <IconButton className="menu-icon">
          <User />
        </IconButton>
      </header>
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
      <footer className="bottom-nav">
        <IconButton className="nav-icon">
          <Home />
        </IconButton>
        <IconButton className="nav-icon">
          <Camera />
        </IconButton>
        <IconButton className="nav-icon">
          <ShoppingBag />
        </IconButton>
        <IconButton className="nav-icon">
          <User />
        </IconButton>
      </footer>
    </div>
  );
};

export default Dashboard;