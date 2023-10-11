import {Route,Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Playlist from '../pages/Playlist'
import Sidebar from '../components/sidebar/Sidebar'
import Topbar from '../containers/topbar/topbar'
import Search from '../pages/Search'
import Musicplayer from '../containers/musicplayer/musicplayer'
import Singleplaylist from '../pages/Singleplaylist'
import SingleArtist from '../pages/Singleartist'
import SingleGenre from '../pages/Singlegenre'

const  Aura=()=>{
    return(
        <>
        <div className="bg-dark h-screen">
        
        <div className="flex h-[84vh] md:h-[88vh] lg:h-[88vh]">
         <Sidebar/>
         <div className='w-full h-full overflow-y-scroll'>
           <Topbar/>
           
            <Routes>
              <Route path="/" exact element={<Home/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path="/playlist" exact element={<Playlist/>}/>
              <Route path="/playlist/:id" exact element={<Singleplaylist/>}/>
              <Route path="/artist/:id" exact element={<SingleArtist/>}/>
              <Route path="/genre/:id" exact element={<SingleGenre/>}/>
              {/* <Route path="/search" exact element={<PrivateRoute><Search/></PrivateRoute>}/>
              <Route path="/yourlibrary" exact element={<PrivateRoute><YourLibrary/></PrivateRoute>}/>
              <Route path="/like" exact element={<PrivateRoute><Like/></PrivateRoute>}/>
              
              <Route path="/artist/:id" exact element={<PrivateRoute><SingleArtist/></PrivateRoute>}/>
              <Route path="/genre/:id" exact element={<PrivateRoute><SingleGenre/></PrivateRoute>}/>
              
              <Route path="/song/:id" exact element={<PrivateRoute><SingleSong/></PrivateRoute>}/>
              <Route path="/profile" exact element={<PrivateRoute><Profile/></PrivateRoute>}/> 
              <Route path="/user" exact element={<PrivateRoute><User/></PrivateRoute>}/> */}
              
              
            </Routes>
            
         </div>
        </div> 
         {/* music player */}
         <Musicplayer/>
        {/* <div className="w-full h-[12vh] bg-light"></div> */}
         {/* <Mobilebar/> */}
      
      </div>
        </>
    )
}


export default Aura