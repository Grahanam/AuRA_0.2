import { useSelector, useDispatch } from 'react-redux'
import { loadmusic } from '../../features/player/playerSlice'
import { fetchQueue } from '../../actions/player/playeraction'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'


const Track=({song})=>{
    const dispatch=useDispatch()
    const {track,playlist}=useSelector((state)=>state.player)
    const loadtrackandqueue=()=>{
        //   dispatch(fetchQueue(song._id))
          dispatch(loadmusic(song))
    }
    return(
        <>
        <div className="w-full">
            <div onClick={()=>loadtrackandqueue()} className='p-2 w-full hover:cursor-pointer '>
                <div className='hover group p-3 rounded-lg shadow-md bg-neutral-800 hover:bg-neutral-700'>
                    <div className='flex flex-wrap'>
                        <div className='relative'>
                            <img src={song.picture?.url} alt='cover img'  className='h-14 w-auto shadow'/>
                            <i className='group-hover:visible invisible  transition delay-150 absolute bottom-0 right-0 h-full w-full bg-black bg-opacity-25 flex items-center justify-center h-9 w-9 text-white'><FontAwesomeIcon icon={faPlay}/></i>    
                        </div>
                            <div className='pl-2 items-start'>
                                <h1 className='text-m font-semibold text-white tracking-wide hover:underline'>{song.name}</h1>
                                <h2 className='text-sm text-lightest tracking-wide pb-0'>
                                    {song.artist?.map((name,index)=>(
                                        <Link  key={index} to={`/artist/${name._id}`}>
                                        <span className='hover:underline text-white'> 
                                            {name.name}
                                            {index!==song.artist?.length-1 && <span>,</span>} 
                                        </span>
                                        </Link>
                                    ))}
                                </h2>
                            </div>
                            
                         
                    </div>   
                </div>
            </div>
        </div>
        </>
    )
}

export default Track