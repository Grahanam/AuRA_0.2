import { useState,useEffect } from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Aura from './hocs/Aura'



import { useSelector, useDispatch } from 'react-redux'
import { checkcookies,checkTokenstamp } from './features/Auth/authSlice';

function App() {
  const {token,loading,error}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(checkcookies())
  },[dispatch])
 


  return (
    <>
     <BrowserRouter>
       <Routes>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/*' element={<Aura/>}/>
          
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
