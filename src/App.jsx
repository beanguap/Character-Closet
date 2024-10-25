import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import OutfitDetection from './pages/OutfitDetection';
import Customization from './pages/Customization';
import Wardrobe from './pages/Wardrobe';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/outfit-detection" element={<OutfitDetection />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
      </Routes>
    </Router>
  );
};

export default App;
