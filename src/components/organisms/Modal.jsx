
import { useContext } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { ModalContext } from '../../contexts/ModalContext'

export default function Modal() {

    const {isModalShown, modalData,toggleModalVisibility} = useContext(ModalContext)
    
  return (
    <>
        {
            isModalShown && (

                <div className="w-full h-full bg-black/50 absolute top-0 left-0 flex justify-center items-center">

                    <div
                        className="w-11/12 h-5/6 bg-white rounded lg:w-1/3 lg:h-3/5"
                    >
                        <header className="w-full h-1/6 p-3 border-b border-black/20 flex justify-between items-center">
                            <h5 className="text-2xl font-semibold">
                                {modalData?.title}
                            </h5>
                            <AiOutlineClose onClick={toggleModalVisibility}/>
                        </header>

                        <div className="w-full p-2 h-4/6 overflow-y-auto">

                            {
                                modalData?.children
                            }
                            
                        </div>
                        <div className='h-1/6 w-full flex justify-end'>
                            <button 
                                className='py-2 px-8 bg-red-500 text-white'
                            >
                                Refund
                            </button>
                        </div>

                    </div>

                </div>
                
            )
        }
    </>
  )
}
