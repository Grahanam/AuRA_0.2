import {Outlet,Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSearch,faBarChart ,faAdd,faHeart} from '@fortawesome/free-solid-svg-icons'

import { useSelector } from "react-redux"

const Mobilebar = ()=>{
     const {location}=useSelector((state)=>state.location)
    return(
        <>
          <div className="w-full fixed bottom-0 inset-x-0 justify-between flex bg-black  md:hidden lg:hidden">
          <div className="flex justify-between w-full">
              <Link to="/" className="" >
                <button className={` text-lg font-semibold ${location==='/'?'text-white':'text-gray-400'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                <i ><FontAwesomeIcon icon={faHome} className="mx-2 text-2xl"/></i>
                </button>
              </Link>
              <Link to="/search" className="" >
                <button className={` text-lg font-semibold ${location==='/search'?'text-white':'text-gray-400'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                <i><FontAwesomeIcon icon={faSearch} className="mx-2 text-2xl"/></i>
                </button>
              </Link>
              <Link to="/yourlibrary" className="" >
                <button className={` text-lg font-semibold ${location==='/'?'text-white':'text-gray-400'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                  <i><FontAwesomeIcon icon={faBarChart} className="mx-2 text-2xl"/></i>
                </button>
              </Link>
              <Link to="/playlist" className="" >
                <button className={`w-full text-lg font-semibold ${location==='/playlist'?'text-white':'text-gray-400'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                  <i><FontAwesomeIcon icon={faAdd} className="mx-2 text-2xl"/></i>
                </button>
              </Link> 
          </div>
      </div>
      
        </>
    )
}
// const mapStateToProps = state=>({
//   location:state.auth.location,
//   access:state.auth.access
// })
// export default connect(mapStateToProps,{})(Mobilebar)
export default Mobilebar