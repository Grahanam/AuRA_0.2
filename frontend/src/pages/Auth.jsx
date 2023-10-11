
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from "../components/googleauth"


const Auth=()=>{
    return(
        
        <>
           Auth
            <GoogleOAuthProvider clientId="1085411245872-87hip3iu8scfa78ff2frakbc6udd2ebd.apps.googleusercontent.com">
                <Google />
            </GoogleOAuthProvider>
        </>
    )
}

export default Auth