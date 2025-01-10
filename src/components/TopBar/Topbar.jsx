// TopBar.jsx
import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { User } from 'lucide-react';
import das

const TopBar = () => {
  return (
    <header className="top-bar">
      <Typography variant="h6" className="app-title">
        Character Closet
      </Typography>
      <IconButton className="menu-icon">
        <User />
      </IconButton>
    </header>
  );
};

export default TopBar;
