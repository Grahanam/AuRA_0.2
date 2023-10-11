import { useSelector, useDispatch } from 'react-redux'
import { loadmusic } from '../../features/player/playerSlice'
import { fetchQueue } from '../../actions/player/playeraction'


const Track=({song})=>{
    const dispatch=useDispatch()
    const {track,playlist}=useSelector((state)=>state.player)
    const loadtrackandqueue=()=>{
          dispatch(fetchQueue(song._id))
          dispatch(loadmusic(song))
    }
    return(
        <>
        <div className="w-full">
            <div onClick={()=>loadtrackandqueue()} className='p-2 w-full hover:cursor-pointer '>
                <div className='p-3 rounded-lg shadow-md hover:bg-light'>
                    <div className='flex flex-wrap'>
                        <img src={song.picture} alt='cover img'  className='h-14 w-auto shadow'/>
                            <div className='m-2 items-start'>
                                <h1 className='text-m font-semibold text-white tracking-wide'>{song.name}</h1>
                                <h2 className='text-sm text-lightest tracking-wide pb-0'>
                                    {song.artist?.map((name,index)=>(
                                        <span key={index}> 
                                            {name.name}
                                            {index!==song.artist?.length-1 && <span>,</span>} 
                                        </span>
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