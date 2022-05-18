import { useContext, useState } from 'react'
import {MdMenuOpen} from 'react-icons/md'
import Loading from 'react-loading'
import { Link, useLocation } from 'react-router-dom'
import { MobileSideNavigationContext } from '../../contexts/MobileSideNavigationContext'
import { CurrentUserContext } from '../../contexts/UserContext'
import auth from '../../services/auth'
import {Logo} from "../atoms"


export default function MobileSideNavigation() {

    const {pathname} = useLocation()
    const {isVisible, toggleNavigationVisibility: toggleMenuVisibility} = useContext(MobileSideNavigationContext)
    const {setUserPropsState, toggleUserLoginState} = useContext(CurrentUserContext)
    const [isLoading, setIsLoading] = useState(false)
    
    const menuOptions = [
        {
            title: "Payments",
            onClick: ()=>{},
            route: "/"
        },
        {
            title: "Refunds",
            onClick: ()=>{},
            route: "/refunds"
        },
        {
            title: "Make payments",
            onClick: ()=>{},
            route: "/pay-clients"
        },
    ]


    const handleOnSignOut = async()=>{

        try {

            setIsLoading(true)
            await auth.signOut()
            setIsLoading(false)
            
            toggleMenuVisibility()
            setUserPropsState({})
            toggleUserLoginState()
            
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
        
    }
    
  return (
    <>
        {
            isVisible===true && (

                <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-black/50">

                    <div className="h-full w-3/5 bg-white flex flex-col">
                        <div
                            className='w-full flex justify-between p-4 items-center border-b border-b-black/10'
                        >

                            <LogoWrapper>
                                <Logo />
                            </LogoWrapper>

                            <button onClick={toggleMenuVisibility} className="p-2 transition-colors hover:bg-black/10 rounded-full">
                                <MdMenuOpen className="text-2xl" />
                            </button>


                        </div>
                        <div className="w-full flex-1 flex flex-col relative">

                            <div className="w-full">

                                {
                                    menuOptions.map((option, index)=>(
                                        <Link 
                                            key={index}
                                            className={
                                                pathname === `${option.route}` ? "w-full block p-3 border-b border-r-4 border-b-black/10 last:border-b-0 border-r-yellow-500 bg-black/5 text-black cursor-pointer hover:bg-black/10": "w-full p-3 block border-b border-b-black/10 last:border-b-0 bg-black/5 text-black cursor-pointer hover:bg-black/10"
                                            }
                                            to={option.route}
                                            onClick={toggleMenuVisibility}
                                        >
                                            {option.title}
                                        </Link>
                                    ))
                                }
                                
                            </div>
                            <button 
                                onClick={handleOnSignOut} 
                                className="text-left w-full absolute bottom-0 left-0 bg-black/5 p-3 border-t border-b-black/10 flex items-center"
                            >
                                Sign out
                                {
                                    isLoading && (
                                        <Loading 
                                            type='spin' 
                                            width={"1rem"} 
                                            height={"1rem"} 
                                            className="ml-2" 
                                            color='#000'
                                        />
                                    )
                                }
                            </button>
                            
                        </div>
                    </div>

                </div>
                
            )
        }
    </>
  )
}

const LogoWrapper = ({children})=>{
    return(
        <div className="w-10 h-10">{children}</div>
    )
}