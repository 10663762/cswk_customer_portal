import {Form, Formik} from 'formik'
import { FormButtonSm, Input } from '../../components/organisms'
import {IoCall, IoMail, IoPerson} from 'react-icons/io5'
import {AiOutlineNumber} from 'react-icons/ai'
import {GiMoneyStack} from 'react-icons/gi'
import payClientSchema from '../../schema/payClientSchema'
import { useContext, useState } from 'react'
import transaction from '../../services/app/transaction'
import PhoneInput from '../../components/organisms/PhoneInput'
import {toast} from 'react-toastify'
import { AlertModalContext } from '../../contexts/AlertModalContext'
import { CurrentUserContext } from '../../contexts/UserContext'

export default function PayClients() {

    const [isLoading, setIsLoading] = useState(false)
    const {showModal} = useContext(AlertModalContext)
    const {setUserPropsState} = useContext(CurrentUserContext)

    const initialValues = {
        payee_name: "",
        payee_account_number: "",
        amount: "",
        payee_phone: "",
        payee_email: ""
    }

    const handleOnSubmit = async(values, resetForm)=>{

        try {

            console.log(values)

            setIsLoading(true)
            const res =await transaction.makePayment(values)
            setIsLoading(false)
            // toast("Payment made successfully", {
            //     position:"top-left",
            //     theme: "light",
            //     type: "success"
            // })
            if(res.message) console.log("hiie")
            if(res.message) throw new Error(res.message)

            showModal(res)
            const modified_user_state = localStorage.getItem("current_user")
            const _modified_user_state = JSON.parse(modified_user_state)
            setUserPropsState(_modified_user_state)

            
            
            

            resetForm()
            
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            toast(error.message, {
                position:"top-left",
                theme: "light",
                type: "warning"
            })
        }
        
    }
    
  return (
        <>

            <h2 className="text-3xl font-bold mb-8">
                Pay clients
            </h2>

            <div className="w-100 lg:w-1/3">
                <Formik
                    initialValues={initialValues}
                    validationSchema={payClientSchema}
                    onSubmit={(values, {resetForm})=>(handleOnSubmit(values, resetForm))}
                >
                    <Form>
                        <InputWrapper>
                            <Input 
                                Icon={<IoPerson />} 
                                label="Client name" 
                                placeholder="enter client name"
                                name="payee_name"
                            />
                        </InputWrapper>
                        <div className='mb-5' />
                        
                        <InputWrapper>
                            <Input 
                                Icon={<AiOutlineNumber className='text-xl' />} 
                                label="Client account number" 
                                placeholder="enter account number" 
                                name="payee_account_number"
                                type="number"
                            />
                        </InputWrapper>
                        <div className='mb-5' />

                        <InputWrapper>
                            <Input 
                                Icon={<GiMoneyStack className='text-xl' />} 
                                label="Amount" 
                                placeholder="amount to pay in cedis" 
                                name="amount"
                                type="number"
                            />
                        </InputWrapper>
                        <div className='mb-5'/>

                        <InputWrapper>
                            {/* <Input 
                                Icon={<IoCall className='text-xl' />} 
                                label="Phone" 
                                placeholder="payee's phone number" 
                                name="phone"
                                type="number"
                            /> */}
                            <PhoneInput 
                                placeholder="payee's phone number" 
                                Icon={<IoCall className='text-xl' />} 
                                label="Phone" 
                                name="payee_phone"
                            />
                        </InputWrapper>
                        <div className='mb-5'/>

                        <InputWrapper>
                            <Input 
                                Icon={<IoMail className='text-xl' />} 
                                label="Email" 
                                placeholder="payee's email" 
                                name="payee_email"
                                type="email"
                            />
                        </InputWrapper>
                        <div className='mb-5'/>

                        <FormButtonSm 
                            title='Pay'
                            loading={isLoading}
                        />

                    </Form>
                </Formik>
            </div>
            
        </>
  )
}

const InputWrapper = ({children})=>{

    return(
        <div className='w-full h-16'>
            {children}
        </div>
    )
    
}