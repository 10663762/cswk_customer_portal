import { createContext, useState } from "react";

export const ConfirmRefundModalContext = createContext({
    isModalShown: true,
    hideModal: ()=>{},
    showModal: (payload)=>{},
    payload: ""
})

export const ConfirmModalProvider = ({children})=>{

    const [isModalShown, setIsModalShown] = useState(false)
    const [payload, setPayload] = useState("")


    const hideModal = ()=>{
        setIsModalShown(false)
    }
    const showModal = (payload)=>{
        setPayload(payload)
        setIsModalShown(true)
    }

    return (

        <ConfirmRefundModalContext.Provider value={{isModalShown, payload, hideModal, showModal}}>
            {children}
        </ConfirmRefundModalContext.Provider>
        
    )
    
}