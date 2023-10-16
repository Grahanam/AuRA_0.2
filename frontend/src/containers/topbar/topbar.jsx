import React,{useState,useContext,Fragment} from 'react';
import {useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronRight,faChevronLeft,faUser} from '@fortawesome/free-solid-svg-icons'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {useDispatch,useSelector} from 'react-redux'
import { getlocation } from '../../features/Location/locationslice';
import Search from  '../../components/searchbar/searchbar'
import { useEffect } from 'react';
import GoogleAuth from '../../components/googleauth'

const googleclientID=import.meta.env.VITE_GOOGLE_CLIENT_ID


const Topbar=({logout})=>{
    const [open,setOpen]=useState(false);
    const [profile,setprofile]=useState([])
    const locate=useLocation()

    const {location}=useSelector((state)=>state.location)
    
    const dispatch=useDispatch()
    
    // const guestLinks=()=>(
    //     <Fragment>
    //         <li>
    //             <Link to='/login'>Login</Link>
    //         </li>
    //         <li>
    //             <Link to='/signup'>Signup</Link>
    //         </li>
    //     </Fragment>

    // );
    // const authLinks=()=>(
    //     <Fragment>
    //         <li>
    //             <span onClick={logout_user}>Logout</span>
    //         </li>
           
    //     </Fragment>
    // )


    const logout_user = () => {
        logout();
    };
    
    useEffect(()=>{
        dispatch(getlocation(locate.pathname))
    },[dispatch,locate])
    return(
        <>
        <div className="bg-neutral-900 z-10 w-full sticky top-0 pl-2 h-14 flex items-center md:justify-between lg:justify-between justify-end">
            <div className="flex items-center hidden md:flex lg:flex">
               <button className="rounded-full bg-black w-8 h-8 text-white mr-3">
                <i><FontAwesomeIcon icon={faChevronLeft} className=" "/></i>
               </button>
               <button className="rounded-full bg-black w-8 h-8 text-white">
                <i><FontAwesomeIcon icon={faChevronRight} className=""/></i>
               </button>
            </div>
            {/* <Search/> */}
            {location=='/search'?(<Search/>):(null)}

            {/* <GoogleOAuthProvider clientId={`${googleclientID}`} > */}
                
            {/* </GoogleOAuthProvider> */}
            
                {location=='/search'?(null):(<GoogleAuth/>)}
           
        </div>
        </>
    )
}

export default Topbar