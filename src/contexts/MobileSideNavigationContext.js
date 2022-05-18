import {createContext, useState} from 'react'

export const MobileSideNavigationContext = createContext({
    isVisible: false,
    toggleNavigationVisibility: ()=>{}
})

export const MobileSideNavigationProvider = ({children})=>{

    const [isVisible, setIsVisible] = useState(false)

    const toggleMenuVisibility =()=>setIsVisible(isVisible === true ? false : true)

    return(
        <MobileSideNavigationContext.Provider value={{isVisible, toggleNavigationVisibility: toggleMenuVisibility}}>
            {children}
        </MobileSideNavigationContext.Provider>
    )
    
}