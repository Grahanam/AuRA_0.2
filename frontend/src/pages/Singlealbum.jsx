import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMusic,faClock,faHashtag,faSearch,faPlus,faX, faDumpster, faDeleteLeft} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import React,{ useEffect, useState } from "react";

import { useSelector,useDispatch } from "react-redux";
import {fetchSingleAlbum} from '../actions/album/albumaction'

import Playlistplaybutton from "../components/button/Playlistplaybutton";




const Singlealbum = ({access,user,getlocation}) => {
//   getlocation()
//   const [search, setSearch] = useState("");
//   let [playlist, setplaylist] = useState([]);
  let [songs, setsong] = useState([]);
  const {token}=useSelector((state)=>state.auth)
  const {album,singleloading,singleerror}=useSelector((state)=>state.album)
  const {track,playlist,currenttrack}=useSelector((state)=>state.player)
  const dispatch=useDispatch()
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleAlbum(params.id))
    // getplaylist();
    // getsongs();
  }, []); 
  return (
    <>
      <div className="border-lightest border-b-2">
        <div className="px-1 py-1 md:px-4 lg:py-2 lg:px-6 lg:py-3 bg-gradient-to-b from-purple-700 box-content h-auto">
          <div className="w-full ">
            <div className="p-5 w-full">
              <div className="flex flex-wrap items-center justify-center md:justify-start lg:justify-start">
                <div className="h-56 w-56  flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-500  to-purple-300">
                  {/* <i><FontAwesomeIcon icon={faMusic} className="text-white text-7xl "/></i> */}
                  <img src={album.picture?.url}/>
                  
                </div>
                {/* <img src='https://m.media-amazon.com/images/I/71a37QykgSL._SY355_.jpg' alt="cover" className='h-56 w-auto'/> */}
                <div className="ml-2 w-full md:w-[50%] lg:w-[50%] flex flex-col justify-end p-2">
                
                  <h1 className="text-m font-semibold text-white tracking-wide"> {album.album_type}</h1>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wide pb-5">{album.name}</h1>
                  {/* <h2 className="text-sm text-lightest tracking-wide ">{token?.fullname}</h2> */}
                </div>
              </div>
            </div>
          </div>
         
          
          <div className="p-0 md:p-4 lg:p-4 flex justify-between">
          {(album.tracks?.length>0)?(
            <div className="flex w-11 rounded-full bg-green-500 m-3 py-2 align-center justify-center ">
              <i className="text-xl text-black">
                <Playlistplaybutton playlist={album.tracks} />
              </i>
            </div>
            ):(<div className="flex w-11 rounded-full m-3 p-2 align-center justify-center ">
              
            </div>)}
          </div>
          
          {(album.tracks?.length>0)?(
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
          </div>
          
          
          <ul>
        {album.tracks.map((song,index) => (
          <li key={index}>
            <div className={`flex flex-row items-center text-sm md:text-lg lg:text-xl align-center ${track._id==song._id?'text-green-500':'text-white'} justify-evenly py-2 p-6`}>
            <div className={`w-2/12  font-medium  `}>
                {/* <i><FontAwesomeIcon icon={faMusic} className="mt-2 text-white text-l"/></i> */}
                {/* {index+1}. */}
                {track._id==song._id?<i><FontAwesomeIcon icon={faMusic} className="mt-2 text-l"/></i>
                :<>
                    {index+1}.
                </>}
            </div> 
            <div className="w-8/12">
                <h1 className=" font-medium tracking-wide truncate">{song.name}</h1>
            </div>
            <div className="w-2/12">
                <h1 className=" font-medium tracking-wide">{Math.floor(song.duration/60)}:{song.duration%60<10?'0':''}{song.duration%60}</h1>
            </div>
            </div>
          </li>
        ))}
      </ul>
          </>
          ):(
            <></>
          )}
          
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

export default Singlealbum