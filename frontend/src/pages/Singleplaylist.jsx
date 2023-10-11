import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMusic,faClock,faHashtag,faSearch,faPlus,faX, faDumpster, faDeleteLeft} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import React,{ useEffect, useState } from "react";
import {getquery} from '../features/Playlist/playlistSlice'
import { useSelector,useDispatch } from "react-redux";
import {fetchTrackSearch,fetchSinglePlaylist} from '../actions/playlist/playlistaction'

import Playlistplaybutton from "../components/button/Playlistplaybutton";


// import Playbutton from "../components/buttons/playbutton";

// import Playlistsong from "../components/playlistsong/playlistsong";

// import { connect } from "react-redux";
// import { getlocation } from "../actions/auth";


const Singleplaylist = ({access,user,getlocation}) => {
//   getlocation()
//   const [search, setSearch] = useState("");
//   let [playlist, setplaylist] = useState([]);
  let [songs, setsong] = useState([]);
  const {token}=useSelector((state)=>state.auth)
  const {search,tracks,playlist}=useSelector((state)=>state.playlist)
  let [playlistsong,setplaylistsong]=useState([])
  const dispatch=useDispatch()
  const params = useParams();
  const navigate = useNavigate();
  
 

  
//   let getplaylist=async()=>{
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `JWT ${access}`,
//             'Accept': 'application/json'
//         }
//     };
//     try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/playlist/${params.id}`, config);
//         setplaylist(res.data);
//       let data1=res.data
//       let songs=data1.songs
//       setplaylistsong(songs)
//     } catch (err) {
//         console.log('something went wrong')
//     }   
// }


// let getsongs=async()=>{
//   const config = {
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `JWT ${access}`,
//           'Accept': 'application/json'
//       }
//   };
//   try {
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${search}`, config);
//       setsong(res.data);
//   } catch (err) {
//       console.log('something went wrong')
//   }   
// }
  const inputEvent = (e) => {
    const data = e.target.value;
    dispatch(getquery(data))
    if(data.length>0){
        dispatch(fetchTrackSearch(data))
    }
  }

  let updateplaylist=(id)=>{
    fetch(`http://localhost:4000/playlist/add/${params.id}`,{
    method:"PUT",    
    headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
        },
    body:JSON.stringify({id:id})    
    }).then(response=>response.json())
    .then(response=>{
        dispatch(fetchSinglePlaylist(params.id))
        alert(response.message)
    })

    // e.preventDefault()
    // const config = { 
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `JWT ${access}`,
    //         'Accept': 'application/json'
    //     },
    // };
    // const body =JSON.stringify({'songid':e.target.songid.value,});
    // try {
    //     const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/playlistupdate/${params.id}`,body, config);
        
    //     getplaylist()
    // } catch (err) {
    //     console.log('something went wrong')
    //     alert("unsuccessfull")
    // }   
  }

  const removetrack=()=>{

    fetch(`http://localhost:4000/playlist/remove/${params.id}`,{
    method:"PUT",    
    headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
        },
    body:JSON.stringify({track:id})    
    }).then(response=>response.json())
    .then(response=>{
        dispatch(fetchSinglePlaylist(params.id))
        alert(response.message)
    })
  }

//   const playlistdelete=async()=>{
//     const config = {
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `JWT ${access}`,
//           'Accept': 'application/json'
//       },
//   };
  
//   try {
//       const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/playlist/delete/${playlist.id}`, config);
//       console.log(res.data)
//       navigate(`/playlist`)
//   } catch (err) {
//       console.log('something went wrong')
//   }  
  
//   }

  useEffect(() => {
    dispatch(fetchSinglePlaylist(params.id))
    // getplaylist();
    // getsongs();
  }, [search,token]); 
  return (
    <>
      <div className="border-lightest border-b-2">
        <div className=" px-6 py-3 bg-gradient-to-b from-purple-700 box-content h-auto">
          <div className="w-full ">
            <div className="p-5 w-full">
              <div className="flex flex-wrap">
                <div className="h-56 w-56  flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-500  to-purple-300">
                  <i><FontAwesomeIcon icon={faMusic} className="text-white text-7xl "/></i>
                  
                </div>
                {/* <img src='https://m.media-amazon.com/images/I/71a37QykgSL._SY355_.jpg' alt="cover" className='h-56 w-auto'/> */}
                <div className="ml-2 w-full md:w-[50%] lg:w-[50%] flex flex-col justify-end p-2">
                  <div className="flex w-full p-2 md:p-4 lg:p-4 items-start justify-end "><i ><FontAwesomeIcon icon={faX} className="text-white text-m  "/></i></div>
                
                  <h1 className="text-m font-semibold text-white tracking-wide"> PLAYLIST</h1>
                  <h1 className="text-6xl font-extrabold text-white tracking-wide pb-5">{playlist.title}</h1>
                  <h2 className="text-sm text-lightest tracking-wide ">{token?.fullname}</h2>
                </div>
              </div>
            </div>
          </div>
         
          
          <div className="p-4 flex justify-between">
          {(playlist.tracks?.length>0)?(
            <div className="flex w-11 rounded-full bg-green-500 m-3 py-2 align-center justify-center ">
              <i className="text-xl text-black">
                <Playlistplaybutton playlist={playlist.tracks} />
              </i>
            </div>
            ):(<div className="flex w-11 rounded-full m-3 p-2 align-center justify-center ">
              
            </div>)}
            
            {/* <div className="flex p-2 md:p-4 lg:p-4 items-start justify-self-end "><i ><FontAwesomeIcon icon={faX} className="text-white text-m  "/></i></div> */}
          </div>
          
          {(playlist.tracks?.length>0)?(
            <>
            
          <div className="flex flex-row items-center justify-center py-2 align-center border-lightest border-b-2 p-6">
            <div className="w-2/12">
              <i><FontAwesomeIcon icon={faHashtag} className="mt-2 text-lightest text-l"/></i>
            </div>
            <div className="w-8/12">
              <h1 className="text-l font-medium text-lightest tracking-wide">Title</h1>
            </div>
            <div className="w-2/12 ">
              <i>
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-lightest text-l"
                />
              </i>
            </div>
            <div className="flex p-2 md:p-4 lg:p-4 items-start justify-self-end "><i><FontAwesomeIcon icon={faDeleteLeft} className="text-white text-m  "/></i></div>
          </div>
          
          
          <ul>
        {playlist?.tracks.map((song,index) => (
          <li key={index}>
            <div className="flex flex-row items-center align-center justify-center py-2 p-6">
            <div className="w-2/12 text-xl font-medium text-white">
                {/* <i><FontAwesomeIcon icon={faMusic} className="mt-2 text-white text-l"/></i> */}
                {index+1}.
            </div> 
            <div className="w-8/12">
                <h1 className="text-xl font-medium text-white tracking-wide">{song.name}</h1>
            </div>
            <div className="w-2/12">
                <h1 className="text-xl font-medium text-white tracking-wide">{Math.floor(song.duration/60)}:{song.duration%60<10?'0':''}{song.duration%60}</h1>
            </div>
            <div className="flex p-2 md:p-4 lg:p-4 items-start justify-self-end "><i onClick={()=>removetrack(song._id)}><FontAwesomeIcon icon={faX} className="text-white text-m  "/></i></div>
            </div>
          {/* <Playlistsong playlistid={params.id} songid={item} songcall={getplaylist}/> */}
          {/* <Navigator id={item}></Navigator> */}
          {/* <Playlistsongclass  songid={item}/> */}
          </li>
        ))}
      </ul>
          </>
          ):(
            <></>
          )}
          
        </div>
      </div>
      <div className="mx-4 mt-10">
          <h1 className="pl-2 text-2xl font-semibold text-white tracking-wider hover:underline ">Let's find something for your playlist</h1>
      </div>
      <div className="flex mx-5 my-4 bg-white rounded-full p-2">
        <i><FontAwesomeIcon className="text-black mx-2" icon={faSearch} /></i>
        <form>
          <input type="text" id="search" className="w-full bg-white text-black border-0 outline-0" placeholder="Search for songs" value={search} onChange={inputEvent}/>
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
                    <img className="h-14 w-auto shadow" src={song.picture} alt="" />
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

            <button onClick={()=>updateplaylist(song._id)} className='text-white font-semibold border rounded px-2'><i><FontAwesomeIcon icon={faPlus} className="text-white text-72xl "/></i></button>
            {/* </form> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// const mapStateToProps = state=>({
//   user:state.auth.user,
//   access:state.auth.access
// })
// export default connect(mapStateToProps,{getlocation})(Singleplaylist)

export default Singleplaylist