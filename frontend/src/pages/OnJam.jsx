import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookie from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faEllipsisVertical,
  faMultiply,
  faPlay,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchSinglePlaylist,
  fetchTrackSearch,
} from "../actions/playlist/playlistaction";
import { getquery } from "../features/Jam/jamSlice";
import { fetchSingleJam } from "../actions/jam/jamaction";
import { loadPlaylistSong } from "../features/player/playerSlice";

const OnJam = () => {
  const { jamId } = useParams();
  const { users, setUsers } = useState([]);
  const { search, tracks, playlist, jam } = useSelector((state) => state.jam);
  const { token } = useSelector((state) => state.auth);
  //   const { search } = useLocation();
  //   const { token } = useSelector((state) => state.auth);
  const cookie = new Cookie();

  const username = cookie.get("UID", {
    path: "/",
  });
  const [socket, setSocket] = useState(null);
  const [clients, setClients] = useState([]); //Storing user data
  const [jamtracks, setJamTracks] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const dispatch = useDispatch();

  const inputEvent = (e) => {
    const data = e.target.value;
    dispatch(getquery(data));
    if (data.length > 0) {
      dispatch(fetchTrackSearch(data));
    }
  };

  let updateJamPlaylist = (track) => {
    socket.emit("add-track", { jamId, track });
  };
  let removeTrackJamPlaylist = (trackId) => {
    socket.emit("remove-track", { jamId, trackId });
  };
  let updateCurrentSong = (track) => {
    socket.emit("current-track", { jamId, track });
    setCurrentSong(track);
  };

  const handleConnectedUsers = (users) => {
    // console.log(`Updated list of connected users: ${users}`);
    console.log(users);
    setClients(users);
  };
  const handletracks = (tracks) => {
    // console.log(`Updated list of connected users: ${users}`);
    setJamTracks(tracks);
  };

  const loadSong = (data) => {
    dispatch(
      loadPlaylistSong({ jamtracks: data.jamtracks, index: data.index })
    );
    updateCurrentSong(data.jamtracks[data.index]);
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:4000");
    //socket intialization
    setSocket(socketInstance);

    //On socket connect
    socketInstance.on("connect", () => {
      console.log("Socket connected, joining room with ID:", jamId);
      // socketInstance.emit("create-jam", { jamId, username });
      socketInstance.emit("join-jam", { jamId, token });
    });
    //on user join
    socketInstance.on("user-joined", (username) => {
      if (typeof socket === "undefined") return;

      setClients((prev) => [...prev, username]);
      console.log(clients);
      console.log("new user joined");
      //   toast.success(`${username} has joined the room.`);
      socketInstance.emit("connected-users", clients); //Emit User Array
    });

    //list of updated connected users
    socketInstance.on("connected-users", handleConnectedUsers);
    socketInstance.on("added-tracks", handletracks);
    socketInstance.on("current-track", (track) => setCurrentSong(track));
    //On user-leave
    socketInstance.on("user-left", (username) => {
      //remove user from the list
      setClients((prev) =>
        prev.filter((user) => user.token.userid !== username)
      );

      //   toast.success(`${username} has left the room.`);
      socketInstance.emit("connected-users", clients);
    });
    //User back online
    socketInstance.on("useronline", (user) => {
      //   toast(`${user?.username} is Online !`);
    });
    //User goes offline
    socketInstance.on("useroffline", (user) => {
      //   toast(`${user?.username} is Offline !`);
      console.log("user disconnected");
    });

    return () => {
      socketInstance.off("user-joined");
      socketInstance.off("connected-users");
      socketInstance.off("user-left");
      socketInstance.off("current-track");
      socketInstance.disconnect();
      console.log("Cleaned up on component unmount");
    };
  }, [jamId, token]);

  useEffect(() => {
    dispatch(fetchSingleJam(jamId));
  }, [jamId, jamtracks]);
  // console.log(clients);
  // console.log(clients);
  // console.log(jam);
  // console.log(token);
  return (
    <>
      <div className="p-3">
        <div className="w-full flex flex-row overflow-x-auto pb-6">
          {clients.map((data, id) => (
            <div key={id}>
              <div className="pr-4">
                <div
                  className={`h-10 w-10 rounded-full border border-2  hover:cursor-pointer ${
                    data.status ? "border-blue-500" : "border-gray-900"
                  } p-1`}
                >
                  <img
                    className="rounded-full w-full h-full"
                    src={data.token?.picture}
                    alt="profile img"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" flex items-center justify-between pb-2">
          <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider hover:underline ">
            Jam Playlist
          </h1>
        </div>
        <div className="columns-1  pb-6">
          {jamtracks.map((track, index) => (
            <div key={index} className="w-full mb-2 hover:cursor-pointer">
              <div
                onClick={(e) => {
                  if (
                    !e.target.closest(".no-click") &&
                    token.userid == jam.user
                  ) {
                    loadSong({ jamtracks, index });
                  }
                }}
                className=" w-full  "
              >
                <div className="group rounded-lg shadow-md bg-neutral-800 hover:bg-neutral-700 transition delay-150 hover:bg-light">
                  <div className="flex relative flex-wrap overflow-hidden relative">
                    <div className="transition delay-150 flex items-center justify-center text-center h-[100] w-9 text-white">
                      <div className="absolute group-hover:invisible visible">
                        {index + 1}
                      </div>
                      <div className="absolute group-hover:visible invisible">
                        <FontAwesomeIcon icon={faPlay} />
                      </div>
                    </div>
                    <img
                      src={track.picture?.url}
                      alt="cover img"
                      className="h-14 overflow-hidden p-1 w-auto shadow"
                    />
                    <div className=" items-start">
                      <h1 className="text-m font-semibold text-white tracking-wide">
                        {track.name}
                      </h1>
                      <h2 className="text-sm text-lightest tracking-wide pb-0 ">
                        {track.artist?.map((name, index) => (
                          <span key={index}>
                            <span
                              className="no-Click hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log(`Artist clicked: ${name.name}`);
                              }}
                            >
                              {name.name}
                            </span>
                            {index !== track.artist?.length - 1 && (
                              <span>, </span>
                            )}
                          </span>
                        ))}
                      </h2>
                    </div>
                    <i
                      className="group-hover:visible invisible  transition delay-150 absolute  bottom-3 right-3  flex items-center justify-center h-10 w-10 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Options clicked:}`);
                      }}
                    >
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </i>
                  </div>
                </div>
              </div>
              {/* <i
                    onClick={() => removeTrackJamPlaylist(track._id)}
                    className="group-hover:visible   transition delay-150  bg-green-400 flex items-center justify-center h-9 w-9 rounded-full text-black"
                  >
                    <FontAwesomeIcon icon={faMultiply} />
                  </i> */}
            </div>
          ))}
        </div>
        <div className="mx-4 mt-10">
          <h1 className="pl-2 text-2xl font-semibold text-white tracking-wider hover:underline ">
            Let's find something for your playlist
          </h1>
        </div>
        <div className="flex mx-5 my-4 bg-white rounded-full p-2">
          <i>
            <FontAwesomeIcon className="text-black mx-2" icon={faSearch} />
          </i>
          <form>
            <input
              type="text"
              id="search"
              className="w-full bg-white text-black border-0 outline-0"
              placeholder="Search for songs"
              value={search}
              onChange={inputEvent}
            />
            {/* <button type="submit">search</button> */}
          </form>
        </div>
        <div className="px-6 py-3 mb-10">
          <div className="w-full">
            {tracks.map((song) => (
              <div className="p-2 w-full h-14 flex justify-between  items-center">
                <Link to={`/song/${song._id}`}>
                  <div className="p-3 rounded-lg shadow-md w-full">
                    <div className="flex flex-wrap">
                      <img
                        className="h-14 w-auto shadow"
                        src={song.picture}
                        alt=""
                      />
                      <div className="m-2 items-start">
                        <h1 className="text-m font-semibold text-white tracking-wide">
                          {song.name}
                        </h1>
                        <h2 className="text-sm text-lightest tracking-wide pb-0">
                          Song
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* <form onSubmit={updateplaylist}> */}

                <button
                  onClick={() => updateJamPlaylist(song)}
                  className="text-white font-semibold border rounded px-2"
                >
                  <i>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-white text-72xl "
                    />
                  </i>
                </button>
                {/* </form> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnJam;
