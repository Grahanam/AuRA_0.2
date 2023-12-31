import {useContext,createContext,useState} from 'react'


const AuthContext=createContext()

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [token,setToken]=useState(null)

    return (
        <AuthContext.Provider value={{token,setToken}}>
            {children}
        </AuthContext.Provider>
    )
}