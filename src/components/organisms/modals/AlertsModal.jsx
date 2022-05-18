import { useContext, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { AlertModalContext } from "../../../contexts/AlertModalContext"
import { Button } from "../../atoms"
import { Checkmark } from "../../icons"

export default function AlertsModal() {

    const {isModalShown, data, hideModal} = useContext(AlertModalContext)
    const [mode, setMode] = useState("")

    const handleOnBgClick = ()=>{
        setMode("")
        hideModal()
    }
    
    return (
        <>
            {
                isModalShown && (

                    <div
                        className="absolute w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center"
                    >

                        

                        <div
                            className="w-11/12 h-5/6 relative bg-white rounded lg:w-1/3 lg:h-3/5 flex flex-col justify-center items-center"
                        >
                            <div className="absolute top-4 right-4">
                                <AiOutlineClose onClick={handleOnBgClick}/>
                            </div>
                            {
                                mode !== "receipt" ? (

                                    <>
                                        <div className="w-64 text-center">
                                            <h2 className="text-3xl font-bold text-center">
                                                Payment Made Successfully
                                            </h2>
                                        </div>
                                        <div className="w-16 h-16 my-12 bg-green-700 p-2 flex justify-center items-center rounded-full border-4">
                                            <Checkmark />
                                        </div>

                                        <div className="flex items-center">
                                            <Button handleOnClick={()=>setMode("receipt")}>
                                                Generate  Receipt
                                            </Button>
                                            <div className="mr-8"/>
                                            
                                            <Button handleOnClick={handleOnBgClick}>
                                                Done
                                            </Button>
                                        </div>
                                    </>
                                    
                                ):(
                                    <div className="flex flex-col justify-center items-center text-xl">
                                        <div className="whitespace-nowrap">
                                            <span className="font-bold">Transaction ID:</span> {data?.id}
                                        </div>
                                        <div className="mb-2"/>

                                        <div className="whitespace-nowrap">
                                            <span className="font-bold">Payee Name:</span> {data?.client_name}
                                        </div>
                                        <div className="mb-2"/>

                                        <div className="whitespace-nowrap">
                                            <span className="font-bold">Account Number:</span> {data?.account_number}
                                        </div>
                                        <div className="mb-2"/>

                                        <div className="whitespace-nowrap">
                                            <span className="font-bold">Amount:</span> GHC {data?.amount}
                                        </div>
                                        <div className="mb-2"/>

                                    </div>
                                )
                            }
                        </div>

                    </div>
                    
                )
            }
        </>
    )
}
