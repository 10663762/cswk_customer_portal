
import Logo from '../components/atoms/Logo';
import { Input } from '../components/organisms';
import {IoMail, IoKey} from 'react-icons/io5'
import {Formik, Form} from 'formik'
import { signInSchema } from '../schema';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../contexts/UserContext';
import FormButton from '../components/organisms/FormButton';
import auth from '../services/auth';



export default function SignIn() {

    const {setUserPropsState, toggleUserLoginState} = useContext(CurrentUserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    
    const initialValues= {
        email: "",
        password: ""
    }


    const handleOnSubmit = async (data)=>{

        try {

            setIsLoading(true)
            setErrorMessage("")
            const res = await auth.signIn(data)
            
            setIsLoading(false)
            setUserPropsState({
                token: res.token,
                ...res.user
            })

            toggleUserLoginState()
            
        } catch (error) {
            setIsLoading(false)
            setErrorMessage(error.message === "Failed to fetch" ? "Failed to reach server. Please check internet connectivity." : error.message)
            console.log(error)
        }
        
    }
    
  return (
        <div className="w-full h-full flex transition">
            <div className='w-full h-full lg:w-1/2 items-center justify-center flex flex-col'>

                <div className='w-4/5 flex flex-col'>
                    <div className="w-12 h-12 self-start">
                        <Logo />
                    </div>
                    <div className='my-4 mt-6'>
                        <h2 className='text-3xl text-center lg:text-left font-bold'>
                            Sign In
                        </h2>
                        <p className='text-zinc-600 text-center lg:text-left'>
                            Complete the form to access your account.
                        </p>
                    </div>
                </div>

               

                <Formik
                    initialValues={initialValues}
                    validationSchema={signInSchema}
                    onSubmit={handleOnSubmit}
                >
                    <Form className="m-8 w-full flex flex-col justify-center items-center">

                        <InputWrapper>
                            <Input 
                                Icon={<IoMail />}
                                label={"Email"}
                                placeholder="eg. someone@example.com"
                                type="email"
                                name="email"
                            />
                        </InputWrapper>
                        <div className='mb-8' />

                        <InputWrapper>
                            <Input 
                                Icon={<IoKey />}
                                label={"Password"}
                                placeholder="your password goes here"
                                type="password"
                                name="password"
                            />
                        </InputWrapper>
                        <div className='mb-8' />

                        <div 
                            className={errorMessage ? "text-red-500 text-left w-4/5 mb-1 transition-colors" : "text-transparent text-left w-4/5 mb-1 transition-colors"}
                        >
                            {errorMessage}
                        </div>
                        <FormButton loading={isLoading} />
                        <div className='mb-2' />

                        <div>
                            <p className='text-left'>
                                Have no account yet? <Link to="/register" className="text-yellow-500">Register</Link>
                            </p>
                        </div>
                        
                    </Form>
                </Formik>
            </div>

            <div
                className='hidden lg:block lg:w-1/2 h-full'
            >

                <img src="/assets/img/flyer.png" alt="" className="w-full h-full object-cover" />
                
            </div>
            
        </div>
  )
}


const InputWrapper = ({children})=>{

    return(
        <div className='w-4/5 h-16'>
            {children}
        </div>
    )
    
}