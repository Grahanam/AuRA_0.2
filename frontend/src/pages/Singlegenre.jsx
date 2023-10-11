import {Link, useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
// import axios from 'axios'

// import CardSong from '../../components/songcard/cardsong'

import { useSelector,useDispatch } from 'react-redux'
import { fetchGenreTrack, fetchSingleGenre } from '../actions/genre/genreaction'
// import { getlocation } from '../actions/auth'

const SingleGenre=({user,access,getlocation})=>{
    // getlocation()
    // const [song,setsong]=useState([])
    // const [genre,setGenre]=useState([])
    const params=useParams()
    const dispatch=useDispatch()
    const {genre,tracks}=useSelector((state)=>state.genre)

    // let getgenre=async()=>{
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `JWT ${access}`,
    //             'Accept': 'application/json'
    //         }
    //     };
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/genre/${params.id}/`, config);
    //         setGenre(res.data)
    //     } catch (err) {
    //         console.log('something went wrong')
    //     }   
    // }

    // let getsong=async()=>{
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `JWT ${access}`,
    //             'Accept': 'application/json'
    //         }
    //     };
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/getgenresong/${params.id}/`, config);
    //         setsong(res.data)
    //     } catch (err) {
    //         console.log('something went wrong')
    //     }   
    // }
    
    useEffect(()=>{
        // getgenre()
        // getsong()
        dispatch(fetchSingleGenre(params.id))
        dispatch(fetchGenreTrack(params.id))
    },[])
    return(
        <>
        <div className='h-52 md:h-96 lg:h-96 bg-fixed bg-no-repeat bg-cover bg-bottom' style={{backgroundImage:`url(${genre.picture})`}}>
            <div className='mt-2  md:ml-4 lg:ml-4 flex flex-col justify-end items-start p-9'>
                <h1 className='text-m font-semibold text-white tracking-wide'>GENRE</h1>
                <h1 className='text-4xl md:text-6xl lg:text-8xl font-extrabold text-white tracking-wide pb-5'>{genre.title}</h1>
                <h2 className='text-sm text-lightest tracking-wide'></h2>
            </div>
        </div>
        <div className="  py-1 md:px-6 md:py-3 lg:px-6 lg:py-3 box-content h-auto">
        <div className="w-full flex flex-wrap">
                    {tracks.map((song)=>(
                        // <Link to={`/song/${songs.id}`} >
                          <div className='p-2 w-36 md:w-48 lg:w-48'>
                              <div className='bg-dark w-full h-auto p-5 rounded-lg shadow-md hover:bg-light'>
                                <img src={song.picture} className='h-auto w-full shadow mb-2'/>
                                <h1 className='text-white text-sm md:text-md lg:text-md tracking-wide font-semibold'>{song.name}</h1>
                                <h2 className='text-xs text-lightest tracking-wide lg:pb-1'>Song</h2>   
                              </div>
                          </div>
                        // </Link>
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