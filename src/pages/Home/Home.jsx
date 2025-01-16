import CharacterScene from '../../components/CharacterModel/CharacterModel';
import TopBar from '../../components/TopBar/TopBar';
import BottomNav from '../../components/BottomNav/BottomNav';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <TopBar />

      <div className="content-wrapper">
        <h1 className="home-title">Avatar Customizer</h1>

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