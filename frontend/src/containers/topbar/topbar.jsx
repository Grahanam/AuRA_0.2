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

// import {connect} from 'react-redux'
// import { logout } from '../../actions/auth';

const Topbar=({logout,user})=>{
    const [open,setOpen]=useState(false);
    const [profile,setprofile]=useState([])
    const locate=useLocation()

    const {location}=useSelector((state)=>state.location)
    
    const dispatch=useDispatch()
    
    const guestLinks=()=>(
        <Fragment>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/signup'>Signup</Link>
            </li>
        </Fragment>

    );
    const authLinks=()=>(
        <Fragment>
            <li>
                <span onClick={logout_user}>Logout</span>
            </li>
           
        </Fragment>

    )
    const logout_user = () => {
        logout();
    };
    
    // let {user,logoutUser,display,location}=useContext(AuthContext) 
    // const location=useLocation()
    // const path =location.pathname
    // let [display,setdisplay]=useState()
    // let api=useAxios()
    
    // let getprofile=async()=>{
    //     let response=await api.get(`api/profile/?q=${user.username}`)
    //     if(response.status===200){
    //         setprofile(response.data)
    //     }
    // }
    
    useEffect(()=>{
        dispatch(getlocation(locate.pathname))

    //   setdisplay(path!=="/search"?false:true)
    // getprofile()
    },[dispatch,locate])
    return(
        <>
        <div className="bg-dark w-full sticky top-0 py-2 px-1 md:py-4 md:px-6 lg:py-4 lg:px-6 flex items-center md:justify-between lg:justify-between justify-end">
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
            
          
            {/* {location=='/search'?(null):(
            <div className={`relative md:relative lg:relative `}>
            {user?(
                    <button className="bg-black rounded-full py-1 px-2 flex items-center" >
                        {user.img ?(<div><img src='' alt="profile img" className='rounded-full h-6 w-6 mr-2' /></div>):(<i ><FontAwesomeIcon icon={faUser} className=" text-white mr-2"/></i>) }
                        
                        
                        {user &&   <Link to={`/user`}>  <p className='text-white font-semibold text-xs mr-3 hover:underline'>{user.name}</p> </Link>}
                        <i onClick={()=>{setOpen(!open)}}><FontAwesomeIcon icon={faChevronDown} className=" text-white"/></i>
                    </button>
                    

                ):(
                <div className='flex'>
                    <button className="bg-dark rounded-full py-1 px-3 flex items-center" onClick={()=>{setOpen(!open)}}>
                    <Link to='/signup'><p className='text-lightest font-semibold text-xs mr-1'>Signup</p></Link>  
                    </button>
                    <button className="bg-white rounded-full py-1 px-3 flex items-center" onClick={()=>{setOpen(!open)}}>
                    <Link to='/login'><p className='text-black font-semibold text-xs mr-1'>Login</p></Link>  
                    </button>
                </div>
                )}
                {user?(<div className={`drop-down absolute bg-light w-full rounded mt-1 ${open?'':'hidden'} `} >
                <ul> 
                   <li><Link to={`/profile`}><button className='w-full text-sm py-2 text-lightest hover:text-white border-b border-white opacity-75 hover:opacity-100' onClick={()=>{setOpen(!open)}}>Account</button></Link></li>
                   <li><button onClick={logout_user} className='w-full text-sm py-2 text-lightest hover:text-white border-b border-white opacity-75 hover:opacity-100' >Log Out</button></li>              
                </ul>
                </div>):(null)}
            </div>
            )} */}
        </div>
        
        
        </>
    )
}
// const mapStateToProps = state=>({
//     isAuthenticated:state.auth.isAuthenticated,
//     user:state.auth.user,
//     location:state.auth.location
// })

// export default connect(mapStateToProps,{logout})(Topbar)

export default Topbar