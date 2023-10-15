import React,{useEffect,useState} from 'react'
// import { connect } from 'react-redux'
// import { getlocation } from '../actions/auth'

import { useSelector, useDispatch } from 'react-redux'
import {fetchAlbumSearch, fetchArtistSearch,fetchTrackSearch} from '../actions/search/searchaction'
import {loadmusic} from '../features/player/playerSlice'

import {Link} from 'react-router-dom'
import Genre from '../components/genre/genre'

import Track from '../components/track/track'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import axios from 'axios'

const Search=({getlocation,songresult,artistresult,access})=>{
    let [artist,setartist]=useState([])
    let [songs,setsong]=useState([])
    const {track,playlist}=useSelector((state)=>state.player)
    const {artists,tracks,albums,searchquery,artistloading,artisterror,trackloading,tracterror} = useSelector((state) => state.search)
    const dispatch = useDispatch()
    // getlocation() 
    let getartists=async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/artist/?q=${searchquery}`, config);
            // const art=  await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${data}`, config);
            setartist(res.data)
        } catch (err) {
            console.log('something went wrong')
        }   
    }
    let getsongs=async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${searchquery}`, config);
            // const art=  await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${data}`, config);
            setsong(res.data)
        } catch (err) {
            console.log('something went wrong')
        }   
    }
    useEffect(()=>{
        dispatch(fetchArtistSearch(searchquery))
        dispatch(fetchTrackSearch(searchquery))
        dispatch(fetchAlbumSearch(searchquery))

    },[searchquery])
    
    return (
        <>
        {searchquery?(
            <>
            {tracks.length>0?(
            <div  className='px-1 py-1 mb-5 md:px-6 md:py-3 lg:px-6 lg:py-3 md:mb-10 lg:mb-10'>
              <div>
                  <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider">Song</h1>
              </div>
                  
                      {tracks.map((song,index)=>(
                        <div key={index}>
                            <Track  song={song}/>
                        </div>
                    // <div className="w-full">
                    //     {/* <Link to={`/song/${song.id}`}> */}
                    //   <div onClick={()=>dispatch(loadmusic(song))} className='p-2 w-full hover:cursor-pointer '>
                    //       <div className='p-3 rounded-lg shadow-md hover:bg-light'>
                    //           <div className='flex flex-wrap'>
                    //              <img src={song.picture} alt='cover img'  className='h-14 w-auto shadow'/>
                    //               <div className='m-2 items-start'>
                    //                  <h1 className='text-m font-semibold text-white tracking-wide'>{song.name}</h1>
                    //                  <h2 className='text-sm text-lightest tracking-wide pb-0'>Song</h2>
                    //               </div>
                    //           </div>   
                    //       </div>
                    //   </div>
                    //   {/* </Link> */}
                    //   </div>
                      ))}    
                  
            </div>):(<></>)}
            
            {artists.length>0 ?(<div className='px-1 py-1 md:px-6 md:py-3 lg:px-6 lg:py-3'>    
                <div>
                    <div>
                        <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider">Artist</h1>
                    </div>
                    <div className="w-full flex flex-wrap">
                    {artists.map((artist,index)=>(
                        <Link key={index} to={`/artist/${artist._id}`} >
                        <div className='p-2 w-48'>
                            <div className='bg-neutral-800 hover:bg-neutral-700 transition delay-150 w-full h-auto p-4 rounded-lg shadow-md hover:bg-light'>
                              <img src={artist.picture?.url} className='rounded h-auto w-full shadow mb-2'/>
                              <h1 className='text-white text-md tracking-wide font-semibold truncate'>{artist.name}</h1>
                              <h2 className='text-xs tracking-wide pb-1'>Artist</h2>   
                            </div>
                        </div>
                        </Link>
                    ))}
         </div>
         </div>
         </div>):(<></>)} 

         {albums.length>0 ?(<div className='px-1 py-1 md:px-6 md:py-3 lg:px-6 lg:py-3'>    
                <div>
                    <div>
                        <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider">Album</h1>
                    </div>
                    <div className="w-full flex flex-wrap">
                    {albums.map((album,index)=>(
                        <Link key={index} to={`/album/${album._id}`} >
                          <div className='p-2 w-48'>
                              <div className='bg-neutral-800 group hover:bg-neutral-700 transition delay-150 w-full h-auto p-4 rounded-lg shadow-md hover:bg-light'>
                                <div className='relative'>
                                    <img src={album.picture?.url} className='rounded h-auto w-full shadow mb-2'/>
                                    <i className='group-hover:visible invisible  transition delay-150 absolute bottom-3 right-1 bg-green-400 flex items-center justify-center h-9 w-9 rounded-full text-black'><FontAwesomeIcon icon={faPlay}/></i>
                                </div>
                                <h1 className='text-white text-md tracking-wide font-semibold truncate'>{album.name}</h1>
                                <h2 className='text-xs text-lightest tracking-wide pb-1'>Album</h2>   
                                
                              </div>
                          </div>
                        </Link>
                    ))}
         </div>
         </div>
         </div>):(<></>)} 
         
         </>
         ):(
            <>
            <Genre/>
            
            </>
         )} 
        </>
    )
}
// const mapStateToProps = state=>({
//     searchquery:state.auth.searchquery,
//     songresult:state.auth.songresult,
//     artistresult:state.auth.artistresult,
//     location:state.auth.location,
//     access:state.auth.access
// })

// export default connect(mapStateToProps,{getlocation})(Search)

export default Search 