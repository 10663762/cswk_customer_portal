import { useContext, useEffect, useState } from 'react'
import Loading from 'react-loading'
import { ConfirmRefundModalContext } from '../../contexts/ConfrimRefundModalContext'
import { ModalContext } from '../../contexts/ModalContext'
import transaction from '../../services/app/transaction'


export default function Payments() {

    const {toggleModalVisibility} = useContext(ModalContext)
    const {showModal} = useContext(ConfirmRefundModalContext)
    const [payments, setPayments] = useState([])
    const [loading, setIsLoading] = useState(false)

    useEffect(()=>{
        getPayments()
    },[])


    const getPayments = async ()=>{

        try {
            setIsLoading(true)
            const payments = await transaction.getPayments()
            setPayments(payments)
            setIsLoading(false)
            
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
        
    }

    
    const handleOnTransactionClick = (transaction)=>{
        toggleModalVisibility({
            title: "Payment details",
            children: (
                <>
                    <div className="flex flex-col w-full border-b border-b-black/10 py-2">
                        <b>Id</b>
                        <span>{transaction?.id}</span>
                    </div>
                    <div className="flex flex-col w-full border-b border-b-black/10 py-2">
                        <b>Date</b>
                        <span>{transaction?.date}</span>
                    </div>
                    <div className="flex flex-col w-full border-b border-b-black/10 py-2">
                        <b>Amount</b>
                        <span>GHC {transaction?.amount_involved}</span>
                    </div>
                </>
            )
        })
    }

    const handleOnRefund = async(e,payment)=>{

        e.stopPropagation()
        showModal(`${payment.id}`)

    }


    // render when fetching data
    if(loading) return(
            <div className="w-full overflow-x-auto custom_sb">

                        <header className='flex flex-col justify-between mb-8 md:flex-row md:items-center'>
                            <div>
                                <h2 className="text-4xl font-bold">
                                    Payments
                                </h2>
                                <p className="text-gray-600">
                                    Payments recieved from customers.
                                </p>
                            </div>
                            <div className="flex flex-col mt-4 md:mt-0">
                                <span className="text-gray-500">Balance</span>
                                <span className="flex items-start text-black font-bold">
                                    GH₵ <span className="ml-1 text-3xl">
                                        <Loading type='spin' color='#000' height={32} width={32} />
                                    </span>
                                </span>
                            </div>
                        </header>
                        <div className="border-b border-b-gray-300 mb-2 w-full"/>
                        <span>Loading please wait....</span>
            </div>
    )

    
    if(payments.length === 0) return(
            <div className="w-full overflow-x-auto custom_sb">

                        <header className='flex flex-col justify-between mb-8 md:flex-row md:items-center'>
                            <div>
                                <h2 className="text-4xl font-bold">
                                    Payments
                                </h2>
                                <p className="text-gray-600">
                                    Payments recieved from customers.
                                </p>
                            </div>
                            <div className="flex flex-col mt-4 md:mt-0">
                                <span className="text-gray-500">Balance</span>
                                <span className="flex items-start text-black font-bold">
                                    GH₵ <span className="ml-1 text-3xl">
                                        {payments.reduce((prev, cur)=>prev + parseFloat(cur?.amount), 0)?.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                    </span>
                                </span>
                            </div>
                        </header>
                        <div className="border-b border-b-gray-300 mb-2 w-full"/>
                        <span>No paymenents received yet from customers!</span>
            </div>
    )
    
    return (
            <div className="w-full overflow-x-auto custom_sb">

                <header className='flex flex-col justify-between mb-8 md:flex-row md:items-center'>
                    <div>
                        <h2 className="text-4xl font-bold">
                            Payments
                        </h2>
                        <p className="text-gray-600">
                            Payments recieved from customers.
                        </p>
                    </div>
                    <div className="flex flex-col mt-4 md:mt-0">
                        <span className="text-gray-500">Balance</span>
                        <span className="flex items-start text-black font-bold">
                            GH₵ <span className="ml-1 text-3xl">
                                {payments.reduce((prev, cur)=>prev + parseFloat(cur?.amount), 0)?.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </span>
                        </span>
                    </div>
                </header>

                <table className="block w-128 lg:w-full">
                    <thead className='w-full block'>
                        <tr className='p-2 w-full flex justify-center items-center text-left border-b-2 border-b-gray-600 text-ellipsis ' >
                            <th className='block flex-1 overflow-hidden'>Date</th>
                            <th className='block flex-1 overflow-hidden'>Payer name</th>
                            <th className='block flex-1 overflow-hidden'>Payer email</th>
                            <th className='block flex-1 overflow-hidden'>Payer phone</th>
                            <th className='block flex-1 overflow-hidden'>{`Amount (GH₵)`}</th>
                            <th className='block flex-1 overflow-hidden'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='block w-full'>
                        {
                            payments.map((payment, key)=>(

                                <tr
                                    className='cursor-pointer p-2 w-full flex justify-start items-center text-left even:bg-black/10 focus:outline-none'
                                    onClick={(e)=>handleOnTransactionClick(payment)}
                                >
                                    <td className='flex flex-1 justify-start'>{new Date(payment?.payment_date._seconds*1000).toDateString()}</td>
                                    <td className='flex flex-1 justify-start'>{payment?.payer_name}</td>
                                    <td className='flex flex-1 justify-start'>{payment?.payer_email}</td>
                                    <td className='flex flex-1 justify-start'>{"0"+payment?.payer_phone}</td>
                                    {/* <td className='flex-1'>Out going</td> */}
                                    <td className='flex flex-1 justify-start'>{parseFloat(payment?.amount)?.toLocaleString("en-IN",{minimumFractionDigits: 2, maximumFractionDigits:2})}</td>
                                    <td className="flex flex-1 justify-start">
                                        <button className="bg-yellow-500 p-2 rounded text-black"
                                            onClick={(e)=>handleOnRefund(e,payment)}
                                        >
                                            Refund
                                        </button>
                                    </td>
                                </tr>
                                
                            ))
                        }
                    
                    </tbody>
                </table>
                
            </div>
    )
}
