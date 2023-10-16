import React,{useState,useContext,Fragment} from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import { faChevronDown,faChevronRight,faChevronLeft,faUser, faBoltLightning} from '@fortawesome/free-solid-svg-icons'
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux'
import { googleAuth } from '../actions/auth/authaction';
import { logout } from '../features/Auth/authSlice';


const google = () => {
    const [open,setOpen]=useState(false);
    const {token,loading,error}=useSelector((state)=>state.auth)
    
    const dispatch = useDispatch()

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
                <span onClick={logout}>Logout</span>
            </li>
           
        </Fragment>

    )
    
    const Logout=()=>{
        dispatch(logout())
    }

    const googlelogin=useGoogleLogin({
        onSuccess:credentialResponse=>{
            console.log(credentialResponse)
            // dispatch(googleAuth(credentialResponse))
            
        },
        flow:'auth-code',
        onError:err=>{
            console.log('Login Failed')
        }
    })      
    
    const verifytoken=(token)=>{
        console.log(token)
        fetch('http://localhost:4000/googletoken',{
            method:'POST',
            headers:{
               "Accept":"application/json",
               "Content-Type":"application/json",
            },
            body:JSON.stringify({token})
        }).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            alert('internal server error')
        })
    }
    return (
        <>
        <div className=" h-full flex items-center ">
            {token?(
                    <>
                        <div  onClick={()=>{setOpen(!open)}} className='h-10 w-10 rounded-full border border-2 border-gray-900 hover:cursor-pointer hover:border-blue-500 p-1'>
                            <img className='rounded-full w-full h-full' src={token.picture} alt='profile img'/>
                        </div>
                        {/* <div>{token.fullname}</div> */}
                        {/* <button onClick={Logout}>Logout </button> */}
                    </> 
                ):(
                    <>
                    <div className='px-8 bg-white h-full flex items-center'>
                    <GoogleLogin
                    className='p-4'
                        onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        dispatch(googleAuth(credentialResponse))
                        }}
                        onError={() => {
                        console.log('Login Failed');
                        }}
                    />
                    </div>

                    </>
                )}
                {token?(<div className={`drop-down absolute bg-black bg-light rounded mt-1 ${open?'':'hidden'} `} >
                <ul className=''> 
                   <li><Link to={`/profile`}><button className='w-full text-sm py-2 text-lightest hover:text-white border-b border-white opacity-75 hover:opacity-100' onClick={()=>{setOpen(!open)}}>Account</button></Link></li>
                   <li><button onClick={Logout} className='w-full text-sm py-2 text-lightest hover:text-white border-b border-white opacity-75 hover:opacity-100' >Log Out</button></li>              
                </ul>
                </div>):(null)}
            </div>
        
        </>
    )
}

export default google;