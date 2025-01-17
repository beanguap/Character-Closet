import React, { useState } from 'react';
import { Shirt, HardHat, PantsIcon, Shoe } from 'lucide-react';
import './customizationtoolbar.css';

const CustomizationToolbar = () => {
  const [activeTab, setActiveTab] = useState('hat');

  const tools = [
    { id: 'hat', icon: HardHat, label: 'Hats' },
    { id: 'shirt', icon: Shirt, label: 'Tops' },
    { id: 'pants', icon: PantsIcon, label: 'Pants' },
    { id: 'shoes', icon: Shoe, label: 'Shoes' }
  ];

  return (
    <div className="toolbar-wrapper">
      <div className="toolbar-container">
        <div className="tools-grid">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`tool-button ${activeTab === tool.id ? 'active' : ''}`}
            >
              <div className="tool-content">
                <tool.icon 
                  size={24} 
                  className={`tool-icon ${activeTab === tool.id ? 'active' : ''}`}
                />
                <span className={`tool-label ${activeTab === tool.id ? 'active' : ''}`}>
                  {tool.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizationToolbar;