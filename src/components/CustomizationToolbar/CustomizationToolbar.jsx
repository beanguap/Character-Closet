import React, { useState } from "react";
import {
  FaTshirt,
  FaShoppingBag,
  FaShoePrints,
  FaHatCowboy,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import "./customizationtoolbar.css";

export default function CustomizationToolbar({
  onShirtColorConfirm,
  onPantsColorConfirm,
  onShoesColorConfirm,
  onHatColorConfirm,
}) {
  const [localShirtColor, setLocalShirtColor] = useState("#000000");
  const [localPantsColor, setLocalPantsColor] = useState("#333333");
  const [localShoesColor, setLocalShoesColor] = useState("#555555");
  const [localHatColor, setLocalHatColor] = useState("#777777");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="toolbar-wrapper">
      <div className={`customization-toolbar ${isExpanded ? "expanded" : ""}`}>
        {/* Left Arrow - Only show when expanded */}
        {isExpanded && (
          <button className="arrow-button left" onClick={toggleExpanded}>
            <FaChevronLeft />
          </button>
        )}

        {/* Main Tools */}
        <div className="tools-container">
          {isExpanded ? (
            // Expanded View
            <>
              <Tooltip title="Shirt" placement="top">
                <div className="toolbar-row">
                  <IconButton size="small">
                    <FaTshirt color="var(--dark-lavender)" />
                  </IconButton>
                  <input
                    type="color"
                    value={localShirtColor}
                    onChange={(e) => setLocalShirtColor(e.target.value)}
                  />
                  <button onClick={() => onShirtColorConfirm(localShirtColor)}>
                    ✓
                  </button>
                </div>
              </Tooltip>

              <Tooltip title="Pants" placement="top">
                <div className="toolbar-row">
                  <IconButton size="small">
                    <FaShoppingBag color="var(--dark-lavender)" />
                  </IconButton>
                  <input
                    type="color"
                    value={localPantsColor}
                    onChange={(e) => setLocalPantsColor(e.target.value)}
                  />
                  <button onClick={() => onPantsColorConfirm(localPantsColor)}>
                    ✓
                  </button>
                </div>
              </Tooltip>

              <Tooltip title="Shoes" placement="top">
                <div className="toolbar-row">
                  <IconButton size="small">
                    <FaShoePrints color="var(--dark-lavender)" />
                  </IconButton>
                  <input
                    type="color"
                    value={localShoesColor}
                    onChange={(e) => setLocalShoesColor(e.target.value)}
                  />
                  <button onClick={() => onShoesColorConfirm(localShoesColor)}>
                    ✓
                  </button>
                </div>
              </Tooltip>

              <Tooltip title="Hat" placement="top">
                <div className="toolbar-row">
                  <IconButton size="small">
                    <FaHatCowboy color="var(--dark-lavender)" />
                  </IconButton>
                  <input
                    type="color"
                    value={localHatColor}
                    onChange={(e) => setLocalHatColor(e.target.value)}
                  />
                  <button onClick={() => onHatColorConfirm(localHatColor)}>
                    ✓
                  </button>
                </div>
              </Tooltip>
            </>
          ) : (
            // Collapsed View - Just show current active icons
            <div className="collapsed-icons">
              <FaTshirt color="var(--dark-lavender)" />
              <FaShoppingBag color="var(--dark-lavender)" />
              <FaShoePrints color="var(--dark-lavender)" />
              <FaHatCowboy color="var(--dark-lavender)" />
            </div>
          )}
        </div>

        {/* Right Arrow - Only show when collapsed */}
        {!isExpanded && (
          <button className="arrow-button right" onClick={toggleExpanded}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
