import { useFormikContext } from 'formik'
import React from 'react'
import { IoSend } from 'react-icons/io5'
import Loading from 'react-loading'

export default function FormButton({loading, title="Submit"}) {

    const {submitForm} = useFormikContext()
    
    return (
            <button 
                className='w-4/5 h-12 flex justify-center items-center bg-black rounded text-yellow-400'
                type='submit'
                onClick={submitForm}
            >
                {title} 
                {
                    loading && (
                        <Loading 
                            type='spin'
                            width={"1rem"}
                            height={"1rem"}
                            color="#eab308"
                            className='ml-2'
                        />
                    )
                }
                {
                    !loading && (
                        <IoSend className='ml-2' />
                    )
                }
            </button>
    )
}
