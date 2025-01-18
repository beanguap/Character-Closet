import { useState } from 'react';
import { CharacterModel } from '../../components/CharacterModel/CharacterModel';
import CustomizationToolbar from '../../components/CustomizationToolbar/CustomizationToolbar';
import TopBar from '../../components/TopBar/TopBar';
import BottomNav from '../../components/BottomNav/BottomNav';
import './home.css';

function Home() {
  const [shirtColor, setShirtColor] = useState('#000000');
  const [pantsColor, setPantsColor] = useState('#333333');
  const [shoesColor, setShoesColor] = useState('#555555');
  const [hatColor, setHatColor] = useState('#777777');

  return (
    <div className="home-container">
      <TopBar />
      
      <div className="content-wrapper">
        <div className="canvas-wrapper">
          <CharacterModel
            shirtColor={shirtColor}
            pantsColor={pantsColor}
            shoesColor={shoesColor}
            hatColor={hatColor}
          />
        </div>

        <CustomizationToolbar
          onShirtColorConfirm={setShirtColor}
          onPantsColorConfirm={setPantsColor}
          onShoesColorConfirm={setShoesColor}
          onHatColorConfirm={setHatColor}
        />
      </div>

      <BottomNav />
    </div>
  );
}

export default Home;