import React, { useContext, useEffect, useState } from 'react'
import Loading from 'react-loading'
import { ModalContext } from '../../contexts/ModalContext'
import Transaction from '../../services/app/transaction'



export default function Refunds() {

    const {toggleModalVisibility} = useContext(ModalContext)
    const [refunds, setRefunds] = useState([])
    const [loading, setIsLoading] = useState(false)

    useEffect(()=>{
        getRefunds()
    },[])
    
    const getRefunds = async ()=>{

        try {
            setIsLoading(true)
            const refunds = await Transaction.getRefunds()
            console.log(refunds)
            setRefunds(refunds)
            setIsLoading(false)
            
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
        
    }
    
    const handleOnTransactionClick = (transaction)=>{
        toggleModalVisibility({
            title: "Refund details",
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
                        <b>Refundee</b>
                        <span>{transaction?.payer_name}</span>
                    </div>
                    <div className="flex flex-col w-full border-b border-b-black/10 py-2">
                        <b>Refundee number</b>
                        <span>{transaction?.payer_number}</span>
                    </div>
                    <div className="flex flex-col w-full border-b border-b-black/10 py-2">
                        <b>Amount</b>
                        <span>GHC {transaction?.amount}</span>
                    </div>
                </>
            )
        })
    }


     if(loading === true) return(
        <div className="flex-1 w-full overflow-x-auto custom_sb">

                <header className='flex flex-col justify-between mb-8 md:flex-row md:items-center'>
                    <div>
                        <h2 className="text-4xl font-bold">
                            Refunds
                        </h2>
                        <p className="text-gray-600">
                            Refunds made to customers.
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


     if(refunds.length === 0) return(
        <div className="w-full overflow-x-auto custom_sb">

                <header className='flex flex-col justify-between mb-8 md:flex-row md:items-center'>
                    <div>
                        <h2 className="text-4xl font-bold">
                            Refunds
                        </h2>
                        <p className="text-gray-600">
                            Refunds made to customers.
                        </p>
                    </div>
                    <div className="flex flex-col mt-4 md:mt-0">
                        <span className="text-gray-500">Balance</span>
                        <span className="flex items-start text-black font-bold">
                            GH₵ <span className="ml-1 text-3xl">
                                {refunds.reduce((prev, cur)=>prev + parseFloat(cur.amount), 0).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </span>
                        </span>
                    </div>
                </header>
                <div className="border-b border-b-gray-300 mb-2 w-full"/>
                <span>No refunds made yet!</span>
        </div>
    )
    
    return (
            <div className="w-full overflow-x-auto custom_sb">

                <header className='flex flex-col justify-between mb-8 md:flex-row md:items-center'>
                    <div>
                        <h2 className="text-4xl font-bold">
                            Refunds
                        </h2>
                        <p className="text-gray-600">
                            Refunds made to customers.
                        </p>
                    </div>
                    <div className="flex flex-col mt-4 md:mt-0">
                        <span className="text-gray-500">Refunded</span>
                        <span className="flex items-start text-black font-bold">
                            GH₵ <span className="ml-1 text-3xl">
                                {refunds.reduce((prev, cur)=>prev + parseFloat(cur.amount), 0).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </span>
                        </span>
                    </div>
                </header>

                <table className="block w-128 lg:w-full">
                    <thead className='w-full block'>
                        <tr className='p-2 w-full flex justify-center items-center text-left border-b-2 border-b-gray-600 text-ellipsis ' >
                            <th className='block flex-1 overflow-hidden'>Payer Name</th>
                            <th className='block flex-1 overflow-hidden'>Payment Date</th>
                            <th className='block flex-1 overflow-hidden'>Refund Date</th>
                            <th className='block flex-1 overflow-hidden'>{`Amount (GH₵)`}</th>
                        </tr>
                    </thead>
                    <tbody className='block w-full'>
                        {
                            refunds.map((transaction, idx)=>(

                                <tr
                                    className='cursor-pointer p-2 w-full flex justify-start items-center text-left even:bg-black/10 focus:outline-none'
                                    onClick={(e)=>handleOnTransactionClick(transaction)}
                                    key={idx}
                                >
                                    <td className='flex flex-1 justify-start'>{transaction?.payer_name}</td>
                                    <td className='flex flex-1 justify-start'>{new Date(transaction?.payment_date._seconds*1000).toDateString()}</td>
                                    <td className='flex flex-1 justify-start'>{new Date(transaction?.refund_date._seconds*1000).toDateString()}</td>
                                    {/* <td className='flex-1'>Out going</td> */}
                                    <td className='flex flex-1 justify-start'>{transaction?.amount.toLocaleString("en-IN",{minimumFractionDigits: 2, maximumFractionDigits:2})}</td>
                                    
                                </tr>
                                
                            ))
                        }
                    
                    </tbody>
                </table>
                
            </div>
    )
}
