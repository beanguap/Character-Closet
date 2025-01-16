// src/components/BottomNav/BottomNav.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import { Home, Camera, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../../styles/variables.css';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <footer className="bottom-nav">
      <IconButton 
        className={`nav-icon ${isActive('/') ? 'active' : ''}`}
        onClick={() => navigate('/')}
      >
        <Home />
      </IconButton>
      <IconButton className="nav-icon">
        <Camera />
      </IconButton>
      <IconButton className="nav-icon">
        <ShoppingBag />
      </IconButton>
      <IconButton 
        className={`nav-icon ${isActive('/dashboard') ? 'active' : ''}`}
        onClick={() => navigate('/dashboard')}
      >
        <LayoutDashboard />
      </IconButton>
    </footer>
  );
};

export default BottomNav;