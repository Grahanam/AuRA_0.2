import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic} from '@fortawesome/free-solid-svg-icons'
import {Link, useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchArtistTrack, fetchSingleArtist } from '../actions/artist/artistaction'
import Tracksquare from '../components/track/tracksquare'

const SingleArtist=()=>{
    const params=useParams()
    const dispatch=useDispatch()
    const {artist,tracks}=useSelector((state)=>state.artist)
    useEffect(()=>{
        // getartist()
        // getsong()
        dispatch(fetchSingleArtist(params.id))
        dispatch(fetchArtistTrack(params.id))
    },[])
    return(
        <>
        <div className='h-52 md:h-96 lg:h-96 bg-fixed bg-no-repeat bg-cover md:bg-contain lg:bg-contain bg-black bg-opacity-25 bg-center' style={{backgroundImage:`url(${artist.picture?.url})`}}>
            <div className=' flex flex-col justify-end bg-black bg-opacity-25 h-full items-start p-9'>
                <h1 className='text-md font-semibold text-white tracking-wide'>Artist</h1>
                <h1 className='text-4xl md:text-6xl lg:text-8xl font-extrabold text-white tracking-wide pb-5'>{artist.name}</h1>
                <h2 className='text-sm text-lightest tracking-wide'></h2>
            </div>
        </div>
        <div className="px-2 py-2 md:px-6 md:py-3 lg:px-6 lg:py-3 box-content h-auto">
             <div className=" flex items-center justify-between">
               {/* <Followbutton artist_id={artist.id}/> */}
            </div>
            <br/>
            <br/>
            <div className="w-full flex flex-row overflow-x-auto">
                {tracks?(<>{tracks.map((song,index)=>(
                       <div key={index}>
                       <Tracksquare song={song} index={index}/>
                   </div>
                    ))}</>):(<></>)}
            </div>
        </div>
         


        </>
    )
}

export default SingleArtist