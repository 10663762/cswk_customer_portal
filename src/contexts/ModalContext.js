import { useState, createContext } from "react";

export const ModalContext = createContext({
    isModalShown: false,
    modalData: {
        title: "",
        children: <></>
    },
    toggleModalVisibility: ()=>{}
})

export const ModalProvider = ({children})=>{

    const [isModalShown, setIsModalShown] = useState(false)
    const [modalData, setModalData] = useState({
        title: "",
        children: <></>
    })
    

    const toggleModalVisibility = (modalData)=>{
        setIsModalShown(isModalShown === true ? false : true)
        setModalData(modalData)
    }

    return(
        <ModalContext.Provider value={{isModalShown, modalData, toggleModalVisibility}}>
            {children}
        </ModalContext.Provider>
    )
    
}