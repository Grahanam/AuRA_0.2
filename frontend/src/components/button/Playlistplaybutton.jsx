
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {loadplaylist} from '../../features/player/playerSlice'
import { useSelector,useDispatch } from "react-redux";
// import { connect } from "react-redux";
// import { setSong } from "../../actions/auth";


const Playlistplaybutton=({playlist})=>{
    // const play=()=>setSong(song)
    const dispatch=useDispatch()
    return(
        <>
           <FontAwesomeIcon className="icon-controller " icon={faPlay} onClick={()=>dispatch(loadplaylist(playlist))} />
        </>
    )
}

// export default connect(null,{setSong})(Playbutton)
export default Playlistplaybutton