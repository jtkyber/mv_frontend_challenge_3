import PlaylistMenu from "./components/PlaylistMenu";
import PlaylistContent from "./components/PlaylistContent";
import FullScreenVideo from "./components/FullScreenVideo";
import { useSelector } from 'react-redux';

function App() {
  const route = useSelector(state => state.route);

  return (
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
  );
}

export default App;