import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
// import { connect } from 'react-redux'
// import { getlocation } from '../actions/auth'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getartist } from '../features/search/artistSlice'
import { fetchArtists } from '../actions/artist/artistaction'
import {fetchAlbums}  from '../actions/album/albumaction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPodcast} from '@fortawesome/free-solid-svg-icons'
import { fetchTracks } from '../actions/track/trackaction'
import Track from '../components/track/track'
import { loadmusic } from '../features/player/playerSlice'


const Home=({getlocation,access})=>{
    let [artist,setartist]=useState([])
    let [track,settrack]=useState([])
    let [greeting,setgreeting]=useState([])
    const {artists,loading,error} = useSelector((state) => state.artist)
    const {albums} = useSelector((state) => state.album)
    const {tracks} = useSelector((state) => state.track)

    const dispatch = useDispatch()
    const loadtrackandqueue=(track)=>{
        //   dispatch(fetchQueue(song._id))
          dispatch(loadmusic(track))
    }
    let gettime=async()=>{
        let date=new Date()
        let hours=date.getHours()
        if(hours<12){
            setgreeting('Good Morning ')
        }else if(hours>=12 && hours<=17){
            setgreeting('Good Afternoon ')
        }else if(hours>17 && hours<=24){
            setgreeting('Good Evening ')
        }
    }

    // let getartist=async()=>{
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `JWT ${localStorage.getItem('access')}`,
    //             'Accept': 'application/json'
    //         }
    //     };
    //     try {
    //         const mus = await axios.get(`${process.env.REACT_APP_API_URL}/api/artist/?q=`, config);
    //         // const art=  await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${data}`, config);
    //         setartist(mus.data)
    //     } catch (err) {
    //         console.log('something went wrong')
    //     }   
    // }
    let gettrack=async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const art = await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=`, config);
            // const art=  await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${data}`, config);
            settrack(art.data)
        } catch (err) {
            console.log('something went wrong')
        }   
    }
    
    // getlocation()
     useEffect(()=>{
        gettime()
        dispatch(fetchArtists())
        dispatch(fetchAlbums())
        dispatch(fetchTracks())
        // gettrack()
     },[])


    return(
        <div className="px-2 py-2 md:px-6 lg:px-6  md:py-3 lg:py-3 ">
            <div className='text-2xl md:text-4xl lg:text-4xl text-semibold text-white'>{greeting}</div>
        <br/>
        <div className='columns-1 md:columns-2 lg:columns-2 pb-6'>
            {tracks.map((track,index)=>(
                <div key={index} className="w-full mb-2">
                <div onClick={()=>loadtrackandqueue(track)} className=' w-full hover:cursor-pointer '>
                    <div className='group rounded-lg shadow-md bg-neutral-800 hover:bg-neutral-700 transition delay-150 hover:bg-light'>
                        <div className='flex relative flex-wrap overflow-hidden'>
                            <img src={track.picture?.url} alt='cover img'  className='h-14 overflow-hidden pr-1 w-auto shadow'/>
                                <div className=' items-start'>
                                    <h1 className='text-m font-semibold text-white tracking-wide'>{track.name}</h1>
                                    <h2 className='text-sm text-lightest tracking-wide pb-0'>
                                        {track.artist?.map((name,index)=>(
                                            <span key={index}> 
                                                {name.name}
                                                {index!==track.artist?.length-1 && <span>,</span>} 
                                            </span>
                                        ))}
                                    </h2>
                                </div>
                            <i className='group-hover:visible invisible  transition delay-150 absolute  bottom-3 right-3 bg-green-400 flex items-center justify-center h-9 w-9 rounded-full text-black'><FontAwesomeIcon icon={faPlay}/></i>    
                        </div>   
                    </div>
                </div>
            </div>
                // <div key={index}>
                //      <Track song={track}/>
                // </div>
            ))}
            

        </div>
        
        {artists.length>0?<>
            <div className=" flex items-center justify-between">
                <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider hover:underline ">Artist you may like</h1>
            </div>
            <div className="w-full flex flex-row overflow-x-auto pb-6">
                    {artists.map((artist,index)=>(
                        <Link key={index} to={`/artist/${artist._id}`} >
                          <div className='p-2 w-48'>
                              <div className='bg-neutral-800 hover:bg-neutral-700 transition delay-150 w-full h-auto p-4 rounded-lg shadow-md hover:bg-light'>
                                <img src={artist.picture?.url} className='rounded h-auto w-full shadow mb-2'/>
                                <h1 className='text-white text-md tracking-wide font-semibold truncate'>{artist.name}</h1>
                                <h2 className='text-xs text-lightest tracking-wide pb-1'>Artist</h2>   
                              </div>
                          </div>
                        </Link>
                    ))}
            </div>  
        
        </>:<>
        
        </>}
         

        {albums.length>0?<>
            <div className=" flex items-center justify-between">
                <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider hover:underline ">Album you may like</h1>
            </div>
            <div className="w-full flex flex-row overflow-x-auto pb-6">
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
        </>:<>
        
        
        </>}
        
        
       
        {/* {access?(
            <>
            <div className=" flex items-center justify-between">
            <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider hover:underline ">Songs for you</h1>
            </div>
            <div className="w-full flex flex-row overflow-x-auto">
                    {track.map((song)=>(
                        <Link to={`/song/${song.id}`} >
                          <div className='p-2 w-48'>
                              <div className='bg-dark w-full h-auto p-5 rounded-lg shadow-md hover:bg-light'>
                                <img src={song.img} className='h-auto w-full shadow mb-2'/>
                                <h1 className='text-white text-md tracking-wide font-semibold'>{song.title}</h1>
                                <h2 className='text-xs text-lightest tracking-wide pb-1'>Song</h2>   
                              </div>
                          </div>
                        </Link>
                    ))}
            </div>
            <div className=" flex items-center justify-between">
            <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider hover:underline ">Artist you may like</h1>
            </div>
            <div className="w-full flex flex-row overflow-x-auto">
                    {artist.map((artists)=>(
                        <Link to={`/artist/${artists.id}`} >
                          <div className='p-2 w-48'>
                              <div className='bg-dark w-full h-auto p-5 rounded-lg shadow-md hover:bg-light'>
                                <img src={artists.img} className='h-auto w-full shadow mb-2'/>
                                <h1 className='text-white text-md tracking-wide font-semibold'>{artists.name}</h1>
                                <h2 className='text-xs text-lightest tracking-wide pb-1'>Artist</h2>   
                              </div>
                          </div>
                        </Link>
                    ))}
            </div>
         </>
        ):(
            <div className='w-full h-full flex items-center justify-center'>
            <div className='flex  items-center'>
                <i ><FontAwesomeIcon icon={faPodcast} className="text-white text-4xl md:text-7xl lg:text-7xl"/></i>
                <h1 className='p-2 text-xl font-bold text-white tracking-wide'>Tune your Aura</h1>
            </div>
            </div>
        )} */}
              
     </div>
    )
}

// const mapStateToProps = state=>({
//     location:state.auth.location,
//     access:state.auth.access
// })

// export default connect(mapStateToProps,{getlocation})(Home)
export default Home