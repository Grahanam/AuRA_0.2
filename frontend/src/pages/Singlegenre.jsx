import {Link, useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchGenreTrack, fetchSingleGenre } from '../actions/genre/genreaction'
import Tracksquare from '../components/track/tracksquare'


const SingleGenre=({user,access,getlocation})=>{

    const params=useParams()
    const dispatch=useDispatch()
    const {genre,tracks}=useSelector((state)=>state.genre)
      
    useEffect(()=>{
        dispatch(fetchSingleGenre(params.id))
        dispatch(fetchGenreTrack(params.id))
    },[])
    return(
        <>
        <div className='h-52 md:h-96 lg:h-96 w-[100%] bg-fixed bg-no-repeat bg-contain bg-black bg-opacity-25  bg-center' style={{backgroundImage:`url(${genre.picture?.url})`}}>
            <div className='mt-2  md:ml-4 lg:ml-4 flex flex-col bg-black bg-opacity-25 h-full justify-end items-start p-9'>
                <h1 className='text-m font-semibold text-white tracking-wide'>GENRE</h1>
                <h1 className='text-4xl md:text-6xl lg:text-8xl font-extrabold text-white tracking-wide pb-5'>{genre.title}</h1>
                <h2 className='text-sm text-lightest tracking-wide'></h2>
            </div>
        </div>
        <div className="  py-1 md:px-6 md:py-3 lg:px-6 lg:py-3 box-content h-auto">
        <div className="w-full flex flex-wrap">
                    {tracks.map((song,index)=>(
                        <div key={index}>
                            <Tracksquare song={song} index={index}/>
                        </div>
                    ))}
        </div>
            <br/>
            <br/>
            
            
          
        </div>
         


        </>
    )
}
// const mapStateToProps = state=>({
//     user:state.auth.user,
//     access:state.auth.access
//   })
// export default connect(mapStateToProps,{getlocation})(SingleGenre)

export default SingleGenre