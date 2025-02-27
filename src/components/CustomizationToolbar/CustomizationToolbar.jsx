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

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className="toolbar-wrapper">
      <div className={`customization-toolbar ${isExpanded ? "expanded" : ""}`}>
        {/* Left arrow only in expanded mode */}
        {isExpanded && (
          <div className="arrow-button-container">
            <button className="arrow-button left" onClick={toggleExpanded}>
              <FaChevronLeft />
            </button>
          </div>
        )}

        <div className="tools-container">
          {isExpanded ? (
            /* -------- EXPANDED with horizontal swipe -------- */
            <div className="expanded-content">
              {/* Scrollable row of color pickers */}
              <div className="tools-scroll-container">
                {/* Example 1: Shirt */}
                <div className="toolbar-row">
                  <Tooltip title="Shirt" placement="top">
                    <IconButton size="small">
                      <FaTshirt color="var(--dark-lavender)" />
                    </IconButton>
                  </Tooltip>
                  <input
                    type="color"
                    value={localShirtColor}
                    onChange={(e) => setLocalShirtColor(e.target.value)}
                  />
                  <button onClick={() => onShirtColorConfirm(localShirtColor)}>
                    ✓
                  </button>
                </div>

                {/* Example 2: Pants */}
                <div className="toolbar-row">
                  <Tooltip title="Pants" placement="top">
                    <IconButton size="small">
                      <FaShoppingBag color="var(--dark-lavender)" />
                    </IconButton>
                  </Tooltip>
                  <input
                    type="color"
                    value={localPantsColor}
                    onChange={(e) => setLocalPantsColor(e.target.value)}
                  />
                  <button onClick={() => onPantsColorConfirm(localPantsColor)}>
                    ✓
                  </button>
                </div>

                {/* Example 3: Shoes */}
                <div className="toolbar-row">
                  <Tooltip title="Shoes" placement="top">
                    <IconButton size="small">
                      <FaShoePrints color="var(--dark-lavender)" />
                    </IconButton>
                  </Tooltip>
                  <input
                    type="color"
                    value={localShoesColor}
                    onChange={(e) => setLocalShoesColor(e.target.value)}
                  />
                  <button
                    onClick={() => onShoesColorConfirm(localShoesColor)}
                  >
                    ✓
                  </button>
                </div>

                {/* Example 4: Hat */}
                <div className="toolbar-row">
                  <Tooltip title="Hat" placement="top">
                    <IconButton size="small">
                      <FaHatCowboy color="var(--dark-lavender)" />
                    </IconButton>
                  </Tooltip>
                  <input
                    type="color"
                    value={localHatColor}
                    onChange={(e) => setLocalHatColor(e.target.value)}
                  />
                  <button onClick={() => onHatColorConfirm(localHatColor)}>
                    ✓
                  </button>
                </div>

                {/* More items... */}
              </div>

              {/* Centered swipe indicator */}
              <div className="swipe-indicator">
                <p>Swipe left / right to see more</p>
              </div>
            </div>
          ) : (
            /* -------- COLLAPSED view -------- */
            <div className="collapsed-icons">
              <FaTshirt color="var(--dark-lavender)" />
              <FaShoppingBag color="var(--dark-lavender)" />
              <FaShoePrints color="var(--dark-lavender)" />
              <FaHatCowboy color="var(--dark-lavender)" />
            </div>
          )}
        </div>

        {/* Right arrow only in collapsed mode */}
        {!isExpanded && (
          <button className="arrow-button right" onClick={toggleExpanded}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
