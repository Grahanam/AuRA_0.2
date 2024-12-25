import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faHeart,
  faHashtag,
  faPlus,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserSearch } from "../actions/user/useraction";
import { getquery, setUserSearchEmpty } from "../features/User/userSlice";
import { io } from "socket.io-client";
import { fetchJam } from "../actions/jam/jamaction";

const Jam = () => {
  const { token } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  const [title, setTitle] = useState("");
  const { userSearch, search, user } = useSelector((state) => state.user);
  const { jams } = useSelector((state) => state.jam);
  const { addedUsers, setAddedUsers } = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputEvent = (e) => {
    const data = e.target.value;
    dispatch(getquery(data));
    if (data.length > 0) {
      dispatch(fetchUserSearch(data));
    } else {
      dispatch(setUserSearchEmpty());
    }
  };
  // const session_id = 123456;
  useEffect(() => {
    const socketInstance = io("http://localhost:4000");
    //socket intialization
    setSocket(socketInstance);
    if ("_id" in user) {
      dispatch(fetchJam(user._id));
    }

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  console.log(jams);

  return (
    <>
      <Link to={"/onjam/67583c0f3329f7761e3cb3d3"}>
        <button>Create a New Jam</button>
      </Link>
      {token ? (
        <>
          <div className="px-1 min-h-full py-1 md:px-3 md:py-2 lg:px-6 lg:py-3 bg-gradient-to-b from-purple-700 box-content h-auto">
            <div className="w-full ">
              <div className="p-3 md:p-4 lg:p-5 w-[100%]">
                <div className="flex flex-wrap">
                  <div className="h-32 w-32 md:h-44 md:w-44 lg:h-56 lg:w-56  flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-500  to-purple-300">
                    <img
                      src="https://scontent.fpnq7-5.fna.fbcdn.net/v/t39.30808-6/242687081_588608932488500_7135915945962870089_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=GiYH1SP-PDoQ7kNvgEG0W6l&_nc_zt=23&_nc_ht=scontent.fpnq7-5.fna&_nc_gid=A3eHOHmvMGUSYiwZGFyn5pk&oh=00_AYDTcl_aIRamTnlXS0oL7uQZE3zWWQojdCQl8CcwGVEbvg&oe=6765FFB1"
                      alt="jamtogether img"
                    />
                    {/* <i>
                      <FontAwesomeIcon
                        icon={faMusic}
                        className="text-white text-3xl md:text-7xl md:text-7xl"
                      />
                    </i> */}
                  </div>
                  {/* <img src='https://m.media-amazon.com/images/I/71a37QykgSL._SY355_.jpg' alt="cover" className='h-56 w-auto'/> */}
                  <div className=" lg:ml-2 flex flex-col justify-end md:p-1 lg:p-1">
                    {/* <form onSubmit={createplaylist}> */}
                    <h1 className="text-sm md:text-3xl lg:text-3xl font-semibold text-white tracking-wide">
                      Create New Jam
                    </h1>
                    <h1 className="text-xl md:text-3xl lg:text-3xl font-extrabold tracking-wide pb-2 md:pb-3 lg:pb-5 text-black">
                      <input
                        type="text"
                        name="title"
                        placeholder="Jam Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </h1>
                    <h1 className="text-sm md:text-md lg:text-md font-semibold text-white tracking-wide">
                      Add Users
                    </h1>
                    <h1 className="text-xl md:text-3xl lg:text-3xl font-extrabold tracking-wide pb-2 md:pb-3 lg:pb-5 text-black">
                      <input
                        type="text"
                        name="title"
                        placeholder="Search User"
                        value={search}
                        onChange={inputEvent}
                        required
                      />
                    </h1>
                    <div className="w-full h-3">
                      <div className=" absolute bg-black rounded">
                        {userSearch.map((user) => (
                          <div className="p-2 w-full h-10 flex justify-between  items-center">
                            <div className="p-3 rounded-lg shadow-md w-full">
                              <div className="flex flex-wrap">
                                <img
                                  className="h-14 w-auto shadow"
                                  src={user.picture}
                                  alt=""
                                />
                                <div className=" flex items-center justify-center items-start">
                                  <h1 className="text-m font-semibold text-white tracking-wide">
                                    {user.fullname}
                                  </h1>
                                </div>
                              </div>
                            </div>
                            {/* <form onSubmit={updateplaylist}> */}

                            <button
                              onClick={() => updateplaylist(user._id)}
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
                    <div className="flex justify-between items-center">
                      {/* <h2 className='text-sm text-lightest tracking-wide '><input type='text' name='username' value={`${user.id}`} hidden></input></h2> */}
                      <button
                        // onClick={createplaylist}
                        className="text-white font-semibold border rounded px-2"
                      >
                        <i>
                          Start Jam{" "}
                          <FontAwesomeIcon
                            icon={faAnglesRight}
                            className="text-white text-72xl "
                          />
                        </i>
                      </button>
                    </div>
                    {/* </form> */}
                  </div>
                </div>
              </div>
            </div>
            {jams.length > 0 ? (
              <>
                {jams.map((jam, index) => (
                  <Link key={index} to={`/jam/${jam._id}`}>
                    <div className="md:mb-2 lg:mb-2 p-2 w-full h-14">
                      <div className="rounded-lg shadow-md bg-light hover:md:bg-light">
                        <div className="flex flex-wrap justify-between">
                          <div className="p-2 md:p-4 lg:p-4 items-start">
                            <h1 className="text-md font-semibold text-white tracking-wide">
                              {/* {playlist.title} */}
                              jam {index}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center h-full py-2">
            <i>
              <FontAwesomeIcon
                icon={faMusic}
                className="mt-10 text-white text-md md:text-xl lg:text-xl"
              />
            </i>
            <h1 className="text-2xl md:text-3xl lg:text-3xl my-4 font-semibold text-white tracking-wide">
              Sign-in to create your Jam
            </h1>
            <h1 className="text-md text-center md:text-xl lg:text-xl font-medium text-white tracking-wide pb-5">
              TuneYourAura.
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default Jam;
