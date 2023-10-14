import ReactAudioPlayer from 'react-audio-player';
import Audioplayer from 'react-h5-audio-player'
// import 'react-h5-audio-player/lib/styles.less' 
import 'react-h5-audio-player/src/styles.scss'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { connect, useSelector ,useDispatch} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";
import {handleEnd,handlenext,handleprevious} from "../../features/player/playerSlice"


const Musicplayer=()=>{
    // let {song}=useContext(AuthContext)
    // const [currenttrack,setcurrenttrack]=useState(0)
    const {track,playlist,currenttrack}=useSelector((state)=>state.player)
    const dispatch=useDispatch()
    // const handlenext=()=>{
    //     setcurrenttrack((currenttrack)=>
    //         currenttrack<playlist.length-1?currenttrack+1:0
    //     )
    // }
    // const handleprevious=()=>{
    //     setcurrenttrack((currenttrack)=>
    //         currenttrack>0?currenttrack-1:0
    //     )
    // }
    // const handleEnd = () => {
    //     setcurrenttrack((currenttrack) =>
    //         currenttrack < playlist.length - 1 ? currenttrack + 1 : 0
    //     );
    // }
    useEffect(()=>{
         
    },[currenttrack,playlist])

    return(
        <>
        <div className="w-full sticky h-[16vh] md:h-[12vh] lg:h-[12vh] bg-black mb-10 md:mb-0">
        <div className="w-full h-full">
    
                <div  className='p-0 md:p-1 lg:p-1 w-full '>
                    <div className=' rounded-lg shadow-md hover:bg-light flex md:flex-row'>
                        <div className='hidden md:flex md:w-3/12 lg:flex flex flex-row items-center '>
                            {track.picture?<>
                                <img src={track.picture?.url} alt="coverimg" className='h-7 md:h-12 lg:h-12 w-auto shadow'/>
                            <div className='m-2 items-start'>
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
                            </>:<>
                            <div className='flex items-center justify-center h-7 md:h-12 lg:h-12 w-12 shadow bg-gray-700'><i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i></div>
                            </>}
                            
                        </div> 
                        <div className='w-full md:w-9/12'>
                            {/* <ReactAudioPlayer className='bg-neutral-700 rounded w-full' src={playlist[currenttrack].audio} autoPlay controls/>  */}
                            {track.audio?<>
                                <Audioplayer className=' ' src={track.audio?.url} showSkipControls onClickNext={()=> dispatch(handlenext())} onClickPrevious={()=>dispatch(handleprevious)} onEnded={()=>dispatch(handleEnd)} />  
                            </>:<>
                            <Audioplayer  />  
                            </>}
                        </div>
                    </div> 
                </div>

                {/* <div  className='text-white p-0 md:p-2 lg:p-2 w-full '>
                    <div className=' rounded-lg shadow-md hover:bg-light flex md:flex-row'>
                        <div className='hidden md:flex md:w-3/12 lg:flex flex flex-row items-center'>
                            
                            <div className='flex items-center justify-center h-7 md:h-12 lg:h-12 w-12 shadow bg-gray-700'><i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i></div>
                            <div className=' m-2 items-start'>
                                 
                                 <h2 className='text-sm text-lightest tracking-wide pb-0'></h2>
                            </div>
                         </div> 
                            <div className='w-full md:w-9/12'>
                                 <ReactAudioPlayer className='bg-neutral-700 rounded w-full'  autoPlay controls/>  
                                 <Audioplayer  />  
                            </div>
                    </div> 
                </div>  */}
         
        

         </div>  

        </div>
        </>
    )
}

// const mapStateToProps = state=>({
//     isAuthenticated:state.auth.isAuthenticated,
//     song:state.auth.song,
//     access:state.auth.access
// })
// export default connect(mapStateToProps,{})(Musicplayer)

export default Musicplayer