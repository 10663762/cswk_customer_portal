import { createContext, useState } from "react";

export const AlertModalContext = createContext({
    isModalShown: true,
    hideModal: ()=>{},
    showModal: (data)=>{},
    data: {}
})

export const AlertModalProvider = ({children})=>{

    const [isModalShown, setIsModalShown] = useState(false)
    const [data, setData] = useState({})
    // const [m]


    const hideModal = ()=>{
        setIsModalShown(false)
        setData({})
    }
    const showModal = (data)=>{
        setData(data)
        setIsModalShown(true)
    }

    return (

        <AlertModalContext.Provider value={{isModalShown, data,hideModal, showModal}}>
            {children}
        </AlertModalContext.Provider>
        
    )
    
}