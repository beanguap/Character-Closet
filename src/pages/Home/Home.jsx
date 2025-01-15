// Home.jsx is the main page of the application. It contains the title of the application and the CharacterScene component.
import CharacterScene from '../../components/CharacterScene/CharacterScene';
import './home.css';

function Home() {
  return (
    <div>
      <h1>My Interactive Mii-Like Character</h1>
      <CharacterScene />
    </div>
  );
}

export default Home;
