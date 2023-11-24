import React,{ useState, useEffect,useContext} from "react";
// import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { connect } from "react-redux";
// import { search } from "../actions/auth";
import { useSelector, useDispatch } from 'react-redux'
import {getquery} from '../../features/search/searchSlice'



const Searchbar = ()=>{
    // const [search,setSearch] =useState("");
    // let {setSearchquery}=useContext(AuthContext)
    const {artists,tracks,searchquery,loading,error} = useSelector((state) => state.search)
    const dispatch=useDispatch()
    const inputEvent=(e)=>{
      const data = e.target.value;
      dispatch(getquery(data))
      // search(data)
      // setSearch(data)
      // setSearchquery(data)
    }
    return(
    <>
      <div className="flex items-center bg-white rounded-full ml-3 pl-2">
      <i><FontAwesomeIcon className="mx-1 text-black text-sm md:mx-2 lg:mx-2 text-" icon={faSearch}/></i>
        <form >
        <input type="text" id="search" className="w-56 md:w-56 bg-white rounded-full text-black border-none focus:outline-none focus:ring-transparent lg:w-56 border-0 outline-0" placeholder="What do you want to listen to?" value={searchquery} onChange={inputEvent}/>
        {/* <button type="submit">search</button> */}
        
        </form>
      </div>
      <div style={{width:"100%"}}>
      {/* {search===""?null:<Sresult name={search}/>} */}
      </div>
    </>
    )
  }

// const mapStateToProps = state=>({
//     searchquery:state.auth.searchquery
// })

// export default connect(mapStateToProps,{search})(Searchbar)

export default Searchbar