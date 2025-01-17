import CharacterScene from '../../components/CharacterModel/CharacterModel';
import TopBar from '../../components/TopBar/TopBar';
import BottomNav from '../../components/BottomNav/BottomNav';
import CustomizationToolbar from '../../components/CustomizationToolbar/CustomizationToolbar';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <TopBar />

      <div className="content-wrapper">
        <h1 className="home-title">Avatar Customizer</h1>
        
        <CustomizationToolbar />

        <div className="canvas-wrapper">
          <CharacterScene />
        </div>

        <p className="home-description">
          Rotate and customize your 3D character!
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;