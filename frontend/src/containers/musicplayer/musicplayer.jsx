import ReactAudioPlayer from 'react-audio-player';
import Audioplayer from 'react-h5-audio-player' 
import './custom-react-audio-player.scss'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { connect, useSelector ,useDispatch} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faChevronDown, faChevronUp, faMusic} from "@fortawesome/free-solid-svg-icons";
import {handleEnd,handlenext,handleprevious} from "../../features/player/playerSlice"



const Musicplayer=()=>{
    const {track,playlist,currenttrack}=useSelector((state)=>state.player)
    const dispatch=useDispatch()
    const [open,setopen]=useState(false)
 
    useEffect(()=>{
         
    },[currenttrack,playlist])

    return(
        <>
        <div className="w-full h-[0vh] md:h-[12vh] lg:h-[12vh] bg-transparent md:bg-black lg:bg-black mb-10 md:mb-0">
        <div className={`w-full ${!open?'absolute':'hidden'} h-full top-0 z-10 bg-black md:z-0 lg:z-0 fixed md:static lg:static`}>
                <div  className='p-0 md:p-1 lg:p-1 w-full h-full'>
                    <div className=' rounded-lg shadow-md h-full flex flex-col md:flex-row lg:flex-row'>
                        <div className='md:hidden lg:hidden flex items-center p-2 h-[10%]'>
                            <i onClick={()=>setopen(!open)} className='p-1'><FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></i>
                        </div>
                        <div className='h-[75%] md:flex md:w-3/12 lg:flex flex flex-col md:flex-row lg:flex-row items-center '>
                            {track.picture?<>
                                <img src={track.picture?.url} alt="coverimg" className='h-auto w-[80%] md:h-12 lg:h-12 md:w-auto lg:w-auto shadow'/>
                            <div className='m-2 items-start text-center'>
                                <h1 className='text-sm md:text-sm lg:text-m font-semibold text-white truncate ellipse tracking-wide'>{track.name}</h1>
                                <h2 className='text-sm text-lightest tracking-wide truncate pb-0'> 
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

                        <div className='w-full h-[15%] md:w-9/12 lg:w-9/12'>
                                {track.audio?<>
                                <Audioplayer className=' ' src={track.audio?.url} showSkipControls onClickNext={()=> dispatch(handlenext())} onClickPrevious={()=>dispatch(handleprevious)} onEnded={()=>dispatch(handleEnd)} />  
                            </>:<>
                            <Audioplayer  />  
                            </>}
                        </div>
                    </div> 
                </div>
         
         </div>  
        </div>
        {track.audio?<>
            <div className='fixed bottom-14 rounded mx-2 w-[96%] flex flex-row bg-black items-center justify-start md:hidden lg:hidden'>
            <div>
                <i className='p-2' onClick={()=>setopen(!open)}><FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon></i>
            </div>
                            <div className=' md:flex md:w-3/12 lg:flex flex flex-row md:flex-row lg:flex-row items-center '>
                                {track.picture?<>
                                <img src={track.picture?.url} alt="coverimg" className='h-9 w-auto md:h-12 lg:h-12 md:w-auto lg:w-auto shadow'/>
                                <div className='m-2 items-start'>
                                    <h1 className='text-sm md:text-sm lg:text-m font-semibold text-white truncate ellipse tracking-wide'>{track.name}</h1>
                                    <h2 className='text-sm text-lightest tracking-wide truncate pb-0'> 
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
        {/* <Audioplayer className=' ' src={track.audio?.url} showSkipControls onClickNext={()=> dispatch(handlenext())} onClickPrevious={()=>dispatch(handleprevious)} onEnded={()=>dispatch(handleEnd)} />  
                          */}
        </div>
        </>:<>
        
        </>}
        
        </>
    )
}

export default Musicplayer