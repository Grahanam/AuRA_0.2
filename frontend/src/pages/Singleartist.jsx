import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic} from '@fortawesome/free-solid-svg-icons'
import {Link, useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchArtistTrack, fetchSingleArtist } from '../actions/artist/artistaction'


const SingleArtist=({access,getlocation})=>{
    const [song,setsong]=useState([])
    // const [artist,setArtist]=useState([])
    const params=useParams()
    const dispatch=useDispatch()

    const {artist,tracks}=useSelector((state)=>state.artist)
    

    // getlocation()
    // let getartist=async()=>{
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `JWT ${access}`,
    //             'Accept': 'application/json'
    //         }
    //     };
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/artist/${params.id}/`, config);
    //         setArtist(res.data)
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
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/getartistsong/${params.id}/`, config);
    //         setsong(res.data)
    //     } catch (err) {
    //         console.log('something went wrong')
    //     }   
    // }
    useEffect(()=>{
        // getartist()
        // getsong()
        dispatch(fetchSingleArtist(params.id))
        dispatch(fetchArtistTrack(params.id))
    },[])
    return(
        <>
        <div className='h-52 md:h-96 lg:h-96 bg-fixed bg-no-repeat bg-cover bg-center' style={{backgroundImage:`url(${artist.picture})`}}>
            <div className='mt-2 ml-4 flex flex-col justify-end items-start p-9'>
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
                        // <Link to={`/song/${song._id}`} >
                          <div key={index} className='p-2 w-48'>
                              <div className='bg-dark w-full h-auto p-5 rounded-lg shadow-md hover:bg-light'>
                                <img src={song.picture} alt='cover' className='h-auto w-full shadow mb-2'/>
                                <h1 className='text-white text-md tracking-wide font-semibold'>{song.name}</h1>
                                <h2 className='text-xs text-lightest tracking-wide pb-1'>Song</h2>   
                              </div>
                          </div>
                        // </Link>
                    ))}</>):(<></>)}
            </div>
            <div className=" flex items-center justify-between">
               <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider hover:underline ">About</h1>
               
            </div>
            <div className='h-96  bg-no-repeat bg-cover bg-center p-5 md:p-7 lg:p-10 bg-light' style={{backgroundImage:`url($)`}}>
                <p className='text-white font-semibold tracking-wider'>{artist.description}</p>
            </div>
          
        </div>
         


        </>
    )
}
// const mapStateToProps = state=>({
//     user:state.auth.user,
//     access:state.auth.access
//   })
// export default connect(mapStateToProps,{getlocation})(SingleArtist) 

export default SingleArtist