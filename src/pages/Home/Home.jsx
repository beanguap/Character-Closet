import React, { useState } from 'react'
import CharacterModel from '../../components/CharacterModel'
import CustomizationToolbar from '../../components/CustomizationToolbar'
import './home.css'

export default function Home() {
  // For example, separate state for shirt, pants, shoes, hat, etc.
  const [shirtColor, setShirtColor] = useState('#000000')
  const [pantsColor, setPantsColor] = useState('#333333')
  const [shoesColor, setShoesColor] = useState('#555555')
  const [hatColor, setHatColor] = useState('#777777')

  return (
    <div className="home-container">
      {/* Top bar or other components here... */}

      {/* Pass "confirm" callbacks to the toolbar */}
      <CustomizationToolbar
        onShirtColorConfirm={setShirtColor}
        onPantsColorConfirm={setPantsColor}
        onShoesColorConfirm={setShoesColor}
        onHatColorConfirm={setHatColor}
      />

      <div className="canvas-wrapper">
        {/* Pass final color states to the 3D model */}
        <CharacterModel
          shirtColor={shirtColor}
          pantsColor={pantsColor}
          shoesColor={shoesColor}
          hatColor={hatColor}
        />
      </div>

      {/* Bottom nav or other UI... */}
    </div>
  )
}
