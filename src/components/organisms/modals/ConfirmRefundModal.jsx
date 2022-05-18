import { useState } from "react"
import { useContext } from "react"
import { AiOutlineClose } from "react-icons/ai"
import Loading from "react-loading"
import { ConfirmRefundModalContext } from "../../../contexts/ConfrimRefundModalContext"
import transaction from "../../../services/app/transaction"

export default function ConfirmModal() {

    const {isModalShown, payload, hideModal} = useContext(ConfirmRefundModalContext)
    const [loading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [password, setPassword] = useState("")

    

    const handleOnBgClick = ()=>{
        setPassword("")
        setErrorMessage("")
        setIsLoading(false)
        hideModal()
    }

    const refund = async ()=>{

        setIsLoading(true)

        const current_user = JSON.parse(localStorage.getItem("current_user"))

        const transactionPayload = {
            password,
            payment_id: payload.toString(),
            email: current_user.email
        }

        try {
            setIsLoading(true)
            await transaction.refundPayment(transactionPayload)
            hideModal()
            window.location.reload()
        } catch (error) {
            setIsLoading(false)
            setPassword("")
            setErrorMessage(error.message)
        }
        
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
                            <div className='flex flex-col h-full justify-center items-center w-full'>
                                <h3 className="capitalize text-center text-lg">
                                    Please enter password to confirm refund payment of id: <span className="text-gray-400">{payload}</span>
                                </h3>

                                <input 
                                    className="border border-gray-400 p-1 mt-3 outline-none rounded w-8/12 focus:ring-2 focus:ring-black/30"
                                    placeholder='Password'
                                    type="password" 
                                    onChange={(e)=>setPassword(e.target.value)}
                                    value={password}
                                />

                                <span className="text-red-500 text-sm mt-4">
                                    {errorMessage}
                                </span>

                                <button 
                                    className="bg-black py-2 mt-1 px-3 rounded text-white duration-100 transition active:scale-95 disabled:bg-zinc-600"
                                    onClick={refund}
                                    disabled={password ==="" ? true : false}
                                >
                                    {loading ? <Loading type="spin" height={16} width={16} color="#fff" /> : <span>Proceed to refund</span>}
                                </button>
                                
                                
                            </div>
                        </div>
                            

                    </div>
                    
                )
            }
        </>
    )
}
