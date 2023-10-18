import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic ,faHeart,faHashtag,faPlus} from '@fortawesome/free-solid-svg-icons'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { fetchPlaylist,savePlaylist } from '../actions/playlist/playlistaction'

import { useEffect,useContext,useState } from 'react'


const Playlist=()=>{
//   getlocation()
  let [playlistinput,setplaylistinput]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {playlists,loading,error}=useSelector((state)=>state.playlist)
  const {token}=useSelector((state)=>state.auth)

let createplaylist=()=>{
  const userid=token.userid
  const data={
    title:playlistinput,
    user:userid
  }
  setplaylistinput('')
  dispatch(savePlaylist(data))
  
  dispatch(fetchPlaylist(token?.userid))
}

  useEffect(()=>{
    if(token?.userid){
    dispatch(fetchPlaylist(token?.userid))
    }
    // getplaylist()
  },[token])
    return(
        <>
        {token?<>
          <div className="px-1 py-1 md:px-3 md:py-2 lg:px-6 lg:py-3 bg-gradient-to-b from-purple-700 box-content h-auto">
            <div className="w-full ">
                        <div className='p-3 md:p-4 lg:p-5 w-[100%]'>
                            
                                <div className='flex flex-wrap'>
                                  <div className='h-32 w-32 md:h-44 md:w-44 lg:h-56 lg:w-56  flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-500  to-purple-300'>
                                    <i ><FontAwesomeIcon icon={faMusic} className="text-white text-3xl md:text-7xl md:text-7xl"/></i>
                                  </div>
                                {/* <img src='https://m.media-amazon.com/images/I/71a37QykgSL._SY355_.jpg' alt="cover" className='h-56 w-auto'/> */}
                                <div className=' lg:ml-2 flex flex-col justify-end md:p-1 lg:p-1'>
                                {/* <form onSubmit={createplaylist}> */}
                                <h1 className='text-sm md:text-md lg:text-md font-semibold text-white tracking-wide'>PLAYLIST</h1>
                                <h1 className='text-xl md:text-3xl lg:text-5xl font-extrabold tracking-wide pb-2 md:pb-3 lg:pb-5'><input type='text' name='title' placeholder='Playlist Name' value={playlistinput} onChange={(e)=>setplaylistinput(e.target.value)} required/></h1>
                                <div className='flex justify-between items-center'>
                                {/* <h2 className='text-sm text-lightest tracking-wide '><input type='text' name='username' value={`${user.id}`} hidden></input></h2> */}
                                <button onClick={createplaylist} className='text-white font-semibold border rounded px-2'><i><FontAwesomeIcon icon={faPlus} className="text-white text-72xl "/></i></button>
                                </div>
                                {/* </form> */}
                                </div>
                                </div>  
                        </div>
            </div>
            {playlists.length>0?<>
                {playlists.map((playlist,index)=>(
                      <Link key={index} to={`/playlist/${playlist._id}`}>
                        <div className='md:mb-2 lg:mb-2 p-2 w-full h-14'>
                          <div className='rounded-lg shadow-md bg-light hover:md:bg-light'>
                              <div className='flex flex-wrap justify-between'>
                                  <div className='p-2 md:p-4 lg:p-4 items-start'>
                                     <h1 className='text-md font-semibold text-white tracking-wide'>{playlist.title}</h1>
                                  </div>
                              </div>   
                          </div>
                        </div>
                      </Link>   
                ))}
            </>:<>
            
            </>}
            
        </div>
        </>:<>
        <div className="flex flex-col items-center h-full py-2">
                  <i ><FontAwesomeIcon icon={faMusic} className="mt-10 text-white text-md md:text-xl lg:text-xl"/></i>
                  <h1 className='text-2xl md:text-3xl lg:text-3xl my-4 font-semibold text-white tracking-wide'>Sign-in to create your playlist</h1>
                  <h1 className='text-md text-center md:text-xl lg:text-xl font-medium text-white tracking-wide pb-5'>TuneYourAura.</h1>
                  {/* <Link to="/search" className="" activeClassName="active" >
                  <button className='text-m font-semibold tracking-wide text-black py-3 px-6 bg-white rounded-full '>Find artists</button>
                  </Link> */}
                </div>
        </>}
          

      </>)}

export default Playlist

