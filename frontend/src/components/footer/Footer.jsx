import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket,faChartColumn, faHeart, faLaptopCode, faRupee, faRupeeSign, faIndianRupeeSign, faUserTie, faMagnifyingGlass, faCat, faMedal, faBolt, faEnvelopesBulk, faBars } from '@fortawesome/free-solid-svg-icons'
import {faReact,faAmazon,faGoogle,faDailymotion,faMicrosoft,faFacebook,faMeta, faApple, faStripe, faXTwitter, faPaypal, faYahoo, faUnity, faSoundcloud, faShopify, faKickstarter, faCloudflare, faWix, faAirbnb, faInstagram, faLinkedin, faCodepen, faSpotify} from '@fortawesome/free-brands-svg-icons'
import auralogo from '../../assets/auralogo.png'


const Footer=()=>{
    return(
        <>
          <div className='flex flex-col pb-10 md:pb-0 lg:pb-0 md:flex-row lg:flex-row py-12 bg-black items-center md:items-start lg:items-start  text-center justify-items-center justify-around'>
            <div className='flex flex-col items-center md:items-left lg:items-left px-10 md:px-1 lg:px-1 w-52 '>
              <div className='flex flex-row  items-center '>
                <i className='p-1 rounded bg-white'>
                  <img className='h-5 w-5' src={auralogo} alt='logo'/>
                </i>
                <h2 className='text-xl md:text-2xl lg:text-2xl pl-1 font-extrabold'>URA.</h2>
              </div>
              <p className='text-xs py-4'>Tune Your Aura</p>
              <div className='py-4'>
                <i className='p-2'><FontAwesomeIcon icon={faXTwitter}/></i>
                <i className='p-2'><FontAwesomeIcon icon={faFacebook}/></i>
                <i className='p-2'><FontAwesomeIcon icon={faInstagram}/></i>
                <i className='p-2'><FontAwesomeIcon icon={faLinkedin}/></i>
              </div>
            </div>
          
          <div className='text-xs w-52 py-5 md:py-0 lg:py-0'>
            <h2 className='text-md font-extrabold'>COMPANY</h2>
            <p className='py-2'>Careers</p>
            <p>Privacy Policy</p>
          </div>
          <div className='text-xs w-52 py-5 md:py-0 lg:py-0 flex flex-col items-center'>
            <h2 className='text-md font-extrabold'>INSPIRED BY</h2>
            <div className='flex flex-row  items-center '>
                <i className='p-1 rounded bg-black'>
                  <FontAwesomeIcon className='text-2xl' icon={faSpotify} />
                </i>
                <h2 className='text-md md:text-xl lg:text-xl pl-1 font-extrabold'>Spotify</h2>
            </div>
          </div>
         </div>
        </>
    )
}

export default Footer