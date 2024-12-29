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
import { getqueryUser, setUserSearchEmpty } from "../features/User/userSlice";
import { io } from "socket.io-client";
import { fetchJam } from "../actions/jam/jamaction";
import { updateJamConnector } from "../features/Jam/jamSlice";

const Jam = () => {
  const { token } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  const [title, setTitle] = useState("");
  const { userSearch, usearch, user } = useSelector((state) => state.user);
  const [jamUser, setJamUser] = useState([]);
  const { jams, jamConnector } = useSelector((state) => state.jam);
  const { addedUsers, setAddedUsers } = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let createJam = () => {
    const userids = [];
    for (let x of jamUser) {
      userids.push(x._id);
    }
    const jam = {
      title: title,
      user: user._id,
      users: userids,
    };
    socket.emit("create-jam", jam, (response) => {
      if (response && response.success) {
        // Navigate to the new jam route with the returned ID
        navigate(`/onjam/${response.id}`);
      } else {
        console.error("Error creating jam:", response.error || "Unknown error");
      }
    });
  };

  const addUser = (nuser) => {
    dispatch(getqueryUser(""));
    dispatch(setUserSearchEmpty());
    const arr = jamUser;
    let found = false;
    for (let i of arr) {
      if (i._id == nuser._id) {
        found = true;
        break;
      }
    }
    if (found == false) {
      arr.push(nuser);
    }
    setJamUser(arr);
  };

  const inputEvent = (e) => {
    const data = e.target.value;
    dispatch(getqueryUser(data));
    if (data.length > 0) {
      dispatch(fetchUserSearch(data));
    } else {
      dispatch(setUserSearchEmpty());
    }
  };

  useEffect(() => {
    if (token?.userid) {
      const socketInstance = io("http://localhost:4000", {
        query: { user: token.userid },
      });
      //socket intialization
      setSocket(socketInstance);

      // socketInstance.on("jam-connectors", handleJamConnector);
      socketInstance.on("jam-connector", (newJam) => {
        console.log("Received new jam:", newJam);
        dispatch(updateJamConnector(newJam));
      });
      return () => {
        socketInstance.disconnect();
      };
    } else {
      return () => {};
    }
  }, [token]);

  useEffect(() => {
    // console.log(token);
    if (token?.userid) {
      dispatch(fetchJam(token.userid));
    }
  }, [token]);

  console.log(jamConnector);

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
                    {/* <form onSubmit={createJam}> */}
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
                        value={usearch}
                        onChange={inputEvent}
                      />
                    </h1>
                    <div className="w-full h-3">
                      <div className=" absolute bg-black rounded">
                        {userSearch.map((data, index) => {
                          if (data._id == user._id) {
                            return <div key={index}></div>;
                          }
                          return (
                            <div
                              key={index}
                              className="p-1 w-full h-10 flex justify-between  items-center"
                            >
                              <div className="p-1 rounded-lg shadow-md w-full">
                                <div className="flex flex-wrap">
                                  <img
                                    className="h-7 w-auto shadow mr-1"
                                    src={data.picture}
                                    alt=""
                                  />
                                  <div className=" flex items-center justify-center items-start">
                                    <h1 className="text-m font-semibold text-white tracking-wide">
                                      {data.fullname}
                                    </h1>
                                  </div>
                                </div>
                              </div>
                              {/* <form onSubmit={updateplaylist}> */}

                              <button
                                onClick={() => addUser(data)}
                                className="text-white font-semibold border rounded px-2"
                              >
                                <i>
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    className="text-white text-72xl"
                                  />
                                </i>
                              </button>
                              {/* </form> */}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      {/* <h2 className='text-sm text-lightest tracking-wide '><input type='text' name='username' value={`${user.id}`} hidden></input></h2> */}

                      <div className="w-full flex flex-row overflow-x-auto pb-6">
                        {jamUser.map((user, index) => (
                          <div key={index}>
                            <div className="pr-4">
                              <div
                                className={`h-10 w-10 rounded-full border border-2  hover:cursor-pointer border-gray-900 p-1`}
                              >
                                <img
                                  className="rounded-full w-full h-full"
                                  src={user?.picture}
                                  alt="profile img"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={createJam}
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
                    </div>
                    {/* </form> */}
                  </div>
                </div>
              </div>
            </div>
            {jams.length > 0 ? (
              <>
                <h1>Your Jam</h1>
                {jams.map((jam, index) => (
                  <Link key={index} to={`/onjam/${jam._id}`}>
                    <div className="md:mb-2 lg:mb-2 p-2 w-full h-14">
                      <div className="rounded-lg shadow-md bg-light hover:md:bg-light">
                        <div className="flex flex-wrap justify-between">
                          <div className="p-2 md:p-4 lg:p-4 items-start">
                            <h1 className="text-md font-semibold text-white tracking-wide">
                              {jam.title}
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

            {jamConnector.jam?.length > 0 ? (
              <>
                <h1>Jam Connector</h1>
                {jamConnector?.jam.map((jam, index) => (
                  <Link key={index} to={`/onjam/${jam._id}`}>
                    <div className="md:mb-2 lg:mb-2 p-2 w-full h-14">
                      <div className="rounded-lg shadow-md bg-light hover:md:bg-light">
                        <div className="flex flex-wrap justify-between">
                          <div className="p-2 md:p-4 lg:p-4 items-start">
                            <h1 className="text-md font-semibold text-white tracking-wide">
                              {jam.title}
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
