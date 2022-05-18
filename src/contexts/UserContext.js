import { createContext, useState } from "react";

export const CurrentUserContext = createContext({
    isUserLoggedIn: false,
    userProps: {},
    toggleUserLoginState: ()=>{},
    setUserPropsState: ()=>{},
    logUserOut: ()=>{},
    logUserIn: ()=>{}
})

export const CurrentUserProvider = ({children})=>{

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [userProps, setUserPropsState] = useState({})

    const toggleUserLoginState = ()=>setIsUserLoggedIn(isUserLoggedIn===true ? false : true)

    const logUserOut = ()=>setIsUserLoggedIn(false)
    const logUserIn = ()=>setIsUserLoggedIn(true)

    return(
        <CurrentUserContext.Provider 
            value={{
                isUserLoggedIn,
                userProps,
                toggleUserLoginState,
                setUserPropsState,
                logUserOut,
                logUserIn
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    )
    
}