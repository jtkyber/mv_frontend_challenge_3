import PlaylistMenu from "./components/PlaylistMenu";
import PlaylistContent from "./components/PlaylistContent";
import background from './bg.jpg';

function App() {
  return (
    <>
      <div className="bgContainer" style={{ backgroundImage: `url(${background})` }}></div>
      <div className="appContainer">
          <PlaylistMenu />
          <PlaylistContent />
      </div>
    </>
  );
}

export default App;