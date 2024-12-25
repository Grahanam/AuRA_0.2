import { useSelector, useDispatch } from "react-redux";
import { loadmusic } from "../../features/player/playerSlice";
import { fetchQueue } from "../../actions/player/playeraction";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Tracksquare = ({ song }) => {
  const dispatch = useDispatch();
  const { track, playlist } = useSelector((state) => state.player);
  const loadtrackandqueue = () => {
    console.log("ho");
    dispatch(fetchQueue(song._id));
    dispatch(loadmusic(song));
  };
  return (
    <>
      <div onClick={() => loadtrackandqueue()} className="p-2 w-48 ">
        <div className="group bg-neutral-800 hover:bg-neutral-700 w-full h-auto p-5 rounded-lg shadow-md hover:cursor-pointer">
          <div className="relative">
            <img
              src={song.picture.url}
              alt="cover"
              className="h-auto w-full shadow mb-2"
            />
            <i className="group-hover:visible invisible  transition delay-150 absolute bottom-0 right-0 h-full w-full bg-black bg-opacity-25 flex items-center justify-center h-9 w-9 text-white">
              <FontAwesomeIcon icon={faPlay} />
            </i>
          </div>
          <h1 className="text-white text-sm tracking-wide font-semibold truncate">
            {song.name}
          </h1>
          <h2 className="text-xs text-lightest tracking-wide pb-1">Song</h2>
        </div>
      </div>
    </>
  );
};

export default Tracksquare;
