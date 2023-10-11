




import {Outlet,Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSearch,faBarChart ,faAdd,faHeart} from '@fortawesome/free-solid-svg-icons'
// import { connect } from "react-redux"



const Sidebar = ({location})=>{
  
    return(
        <>
        <div className="md:w-48 lg:w-64 h-full flex-none bg-black hidden md:block lg:block">
            <div className="h-10 p-5 pb-10 mb-5 text-center">
            <Link to="" className=""  >
                <span className="md:text-3xl lg:text-4xl font-extrabold text-white">AURA.</span>
            </Link>
            </div>
            <div className="mx-2 mt-2 mb-2 rounded bg-neutral-900">
                <Link to="/" className=""  >
                  <button className={`w-full md:text-md rounded-none lg:text-lg font-semibold text-${location==='/'?'white':'lightest'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                  <i ><FontAwesomeIcon icon={faHome} className="mx-2 md:text-xl lg:text-2xl"/></i>
                    <p>Home</p>
                  </button>
                </Link>
                <Link to="/search" className="" >
                  <button className={`w-full md:text-md lg:text-lg font-semibold text-${location==='/search'?'white':'lightest'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                  <i><FontAwesomeIcon icon={faSearch} className="mx-2 md:text-xl lg:text-2xl"/></i>
                    <p>Search</p>
                  </button>
                </Link>
              </div>
              <div className="mx-2  rounded bg-neutral-900">
                <Link to="/yourlibrary" className="" >
                  <button className={`w-full md:text-md lg:text-lg font-semibold text-${location==='/yourlibrary'?'white':'lightest'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                    <i><FontAwesomeIcon icon={faBarChart} className="mx-2 text-2xl"/></i>
                    <p>Your Library</p>
                  </button>
                </Link>
                <Link to="/playlist" className="" >
                  <button className={`w-full md:text-md lg:text-lg font-semibold text-${location==='/playlist'?'white':'lightest'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                    <i><FontAwesomeIcon icon={faAdd} className="mx-2 md:text-xl lg:text-2xl"/></i>
                    <p>Create Playlist</p>
                  </button>
                </Link>
                <Link to="/like" className="" >
                  <button className={`w-full md:text-md lg:text-lg font-semibold text-${location==='/like'?'white':'lightest'} rounded px-3 py-2 flex items-center justify-start hover:text-white `}>
                    <i><FontAwesomeIcon icon={faHeart} className="mx-2 md:text-xl lg:text-2xl"/></i>
                    <p>Liked Song</p>
                  </button>
                </Link>  
                
              </div>

              
                {/* <br/>
                
                 
                <Outlet/> */}
            
            {/* <div className="mx-5">
               <h1 className="text-xs text-lightest tracking-widest uppercase">Playlists</h1>
               <Link to="" className="" activeClassName="active" >
                  <button className="w-full text-sm  font-semibold text-white rounded px-3 py-2 flex items-center justify-start opacity-75 hover:opacity-100">
                    <i><FontAwesomeIcon icon={faAdd} className="mx-2"/></i>
                    <p>Create Playlist</p>
                  </button>
                </Link>  
                <Link to="" className="" activeClassName="active" >
                  <button className="w-full text-sm font-semibold text-white rounded px-3 py-2 flex items-center justify-start opacity-75 hover:opacity-100">
                    <i><FontAwesomeIcon icon={faHeart} className="mx-2"/></i>
                    <p>Liked Song</p>
                  </button>
                </Link> 
                         
            </div> */}
        </div>
        </>
    )
}
// const mapStateToProps = state=>({
//   user:state.auth.user,
//   location:state.auth.location
// })
// export default connect(mapStateToProps,{})(Sidebar)
export default Sidebar