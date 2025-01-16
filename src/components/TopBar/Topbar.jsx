// TopBar.jsx
import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { User, Info, Search } from 'lucide-react'; // Add more icons

import '/src/styles/variables.css'; // Ensure we have access to the color variables
import './TopBar.css';     // Specific styles for top bar

const TopBar = () => {
  return (
    <header className="top-bar">
      <IconButton className="menu-icon">
        <Info size={20} />
      </IconButton>
      
      <div className="title-section">
        <Typography variant="h6" className="app-title">
          Character Closet
        </Typography>
        <Typography variant="caption" className="sub-title">
          AI Fashion Explorer
        </Typography>
      </div>

      <IconButton className="menu-icon">
        <User size={20} />
      </IconButton>
    </header>
  );
};

export default TopBar;
