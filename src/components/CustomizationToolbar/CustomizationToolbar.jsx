import React from 'react';
import {
  FaTshirt,
  FaHatCowboy,
  FaShoppingBag,
  FaShoePrints
} from 'react-icons/fa';

// MUI components
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import './customizationtoolbar.css';

function CustomizationToolbar() {
  return (
    <div className="customization-toolbar">
      <Tooltip title="Tops">
        <IconButton>
          <FaTshirt size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Hats">
        <IconButton>
          <FaHatCowboy size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Pants">
        <IconButton>
          <FaShoppingBag size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Shoes">
        <IconButton>
          <FaShoePrints size={24} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default CustomizationToolbar;
