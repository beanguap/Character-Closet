// CustomizationToolbar.jsx
import React, { useState } from 'react'
import { FaTshirt, FaShoppingBag, FaShoePrints, FaHatCowboy } from 'react-icons/fa'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import './customizationtoolbar.css'

/**
 * We receive callbacks for each clothing item:
 *   - onShirtColorConfirm
 *   - onPantsColorConfirm
 *   - onShoesColorConfirm
 *   - onHatColorConfirm
 */
export default function CustomizationToolbar({
  onShirtColorConfirm,
  onPantsColorConfirm,
  onShoesColorConfirm,
  onHatColorConfirm
}) {
  // Local color inputs so the user can see the color before confirming
  const [localShirtColor, setLocalShirtColor] = useState('#000000')
  const [localPantsColor, setLocalPantsColor] = useState('#333333')
  const [localShoesColor, setLocalShoesColor] = useState('#555555')
  const [localHatColor, setLocalHatColor] = useState('#777777')

  return (
    <div className="customization-toolbar">
      {/* SHIRT */}
      <Tooltip title="Shirt">
        <div className="toolbar-row">
          <IconButton>
            <FaTshirt size={24} />
          </IconButton>
          <input
            type="color"
            value={localShirtColor}
            onChange={(e) => setLocalShirtColor(e.target.value)}
          />
          <button onClick={() => onShirtColorConfirm(localShirtColor)}>✓</button>
        </div>
      </Tooltip>

      {/* PANTS */}
      <Tooltip title="Pants">
        <div className="toolbar-row">
          <IconButton>
            <FaShoppingBag size={24} />
          </IconButton>
          <input
            type="color"
            value={localPantsColor}
            onChange={(e) => setLocalPantsColor(e.target.value)}
          />
          <button onClick={() => onPantsColorConfirm(localPantsColor)}>✓</button>
        </div>
      </Tooltip>

      {/* SHOES */}
      <Tooltip title="Shoes">
        <div className="toolbar-row">
          <IconButton>
            <FaShoePrints size={24} />
          </IconButton>
          <input
            type="color"
            value={localShoesColor}
            onChange={(e) => setLocalShoesColor(e.target.value)}
          />
          <button onClick={() => onShoesColorConfirm(localShoesColor)}>✓</button>
        </div>
      </Tooltip>

      {/* HAT */}
      <Tooltip title="Hat">
        <div className="toolbar-row">
          <IconButton>
            <FaHatCowboy size={24} />
          </IconButton>
          <input
            type="color"
            value={localHatColor}
            onChange={(e) => setLocalHatColor(e.target.value)}
          />
          <button onClick={() => onHatColorConfirm(localHatColor)}>✓</button>
        </div>
      </Tooltip>
    </div>
  )
}
