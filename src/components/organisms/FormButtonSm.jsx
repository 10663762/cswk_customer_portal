import { useFormikContext } from 'formik'
import React from 'react'
import Loading from 'react-loading'

export default function FormButtonSm({loading, title="Submit"}) {

    const {submitForm} = useFormikContext()
    
    return (
            <button 
                className='px-8 py-2 flex justify-center items-center bg-black rounded text-yellow-400'
                type='button'
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
            </button>
    )
}
