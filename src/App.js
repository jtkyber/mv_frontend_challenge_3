import PlaylistMenu from "./components/PlaylistMenu";
import PlaylistContent from "./components/PlaylistContent";
import FullScreenVideo from "./components/FullScreenVideo";
import { useSelector } from 'react-redux';
import background from './bg.jpg';

function App() {
  const route = useSelector(state => state.route);

  return (
    <>
      <div className="bgContainer" style={{ backgroundImage: `url(${background})` }}></div>
      <div className="appContainer">
        {
          route === 'home' ?
          <>
            <PlaylistMenu />
            <PlaylistContent />
          </>
          :
          <FullScreenVideo />
        }
      </div>
    </>
  );
}

export default App;