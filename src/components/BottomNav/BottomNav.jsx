// BottomNav.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import { Home, Camera, ShoppingBag, User } from 'lucide-react';
import ''

const BottomNav = () => {
  return (
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
  );
};

export default BottomNav;
