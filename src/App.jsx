import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const OutfitDetection = lazy(() => import('./pages/OutfitDetection/OutfitDetection'));
const Customization = lazy(() => import('./pages/Customization/Customization'));
const Wardrobe = lazy(() => import('./pages/Wardrobe/Wardrobe'));
const LoadingFallback = lazy(() => import('./components/LoadingFallback/LoadingFallback'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/outfit-detection" element={<OutfitDetection />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;