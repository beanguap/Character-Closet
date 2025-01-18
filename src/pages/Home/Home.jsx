import { useState } from "react";
import { CharacterModel } from "../../components/CharacterModel/CharacterModel";
import CustomizationToolbar from "../../components/CustomizationToolbar/CustomizationToolbar";
import TopBar from "../../components/TopBar/TopBar";
import BottomNav from "../../components/BottomNav/BottomNav";
import "./home.css";

function Home() {
  const [shirtColor, setShirtColor] = useState("#000000");
  const [pantsColor, setPantsColor] = useState("#333333");
  const [shoesColor, setShoesColor] = useState("#555555");
  const [hatColor, setHatColor] = useState("#777777");

  return (
    <div className="home-container">
      <TopBar />

      <div className="content-wrapper">
        {/* Main canvas wrapper with relative positioning */}
        <div className="canvas-wrapper">
          {/* Absolutely positioned toolbar */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              width: "90%", // Ensures some margin on the sides
              maxWidth: "600px", // Prevents toolbar from getting too wide
            }}
          >
            <CustomizationToolbar
              onShirtColorConfirm={setShirtColor}
              onPantsColorConfirm={setPantsColor}
              onShoesColorConfirm={setShoesColor}
              onHatColorConfirm={setHatColor}
            />
          </div>

          {/* Character Model */}
          <CharacterModel
            shirtColor={shirtColor}
            pantsColor={pantsColor}
            shoesColor={shoesColor}
            hatColor={hatColor}
          />

          {/* Rotation indicator */}
          <div className="rotation-icon">
            <svg
              viewBox="0 0 120 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="120"
                height="40"
                rx="20"
                fill="rgba(255, 255, 255, 0.8)"
              />
              <path
                d="M45 20C45 15.5817 48.5817 12 53 12C57.4183 12 61 15.5817 61 20"
                stroke="var(--dark-lavender)"
                strokeWidth="2"
              />
              <path
                d="M61 20C61 24.4183 57.4183 28 53 28C48.5817 28 45 24.4183 45 20"
                stroke="var(--dark-lavender)"
                strokeWidth="2"
              />
              <path
                d="M60 17L61 20L64 19"
                stroke="var(--dark-lavender)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="70"
                y="24"
                fill="var(--dark-lavender)"
                fontSize="12"
                fontFamily="sans-serif"
              >
                Rotate
              </text>
            </svg>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Home;
