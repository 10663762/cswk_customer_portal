import { useContext, useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import Loading from 'react-loading'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import { Logo } from '../../components/atoms'
import MobileSideNavigation from '../../components/organisms/MobileSideNavigation'
import Modal from '../../components/organisms/Modal'
import AlertsModal from '../../components/organisms/modals/AlertsModal'
import ConfirmModal from '../../components/organisms/modals/ConfirmRefundModal'
import { MobileSideNavigationContext } from '../../contexts/MobileSideNavigationContext'
import { CurrentUserContext } from '../../contexts/UserContext'
import auth from '../../services/auth'
import PayClients from './PayClients'
import Payments from './Payments'
import Refunds from './Refunds'


const menuOptions = [
    {
        title: "Payments",
        onClick: ()=>{},
        path: "/"
    },
    {
        title: "Refunds",
        onClick: ()=>{},
        path: "/refunds"
    },
    {
        title: "Make payments",
        onClick: ()=>{},

    },
]

export default function Dashboard() {

    const [currentPage, setCurrentPage] = useState("")
    const {toggleNavigationVisibility} = useContext(MobileSideNavigationContext)
    const {userProps: current_user} = useContext(CurrentUserContext)
    const {logUserOut} = useContext(CurrentUserContext)
    const [isLoading, setIsLoading] = useState(false)


    const handleOnSignOut = async()=>{

        try {

            setIsLoading(true)
            await auth.signOut()
            setIsLoading(false)
            
            logUserOut()
            
        } catch (error) {
            setIsLoading(false)
        }
        
    }

    
  return (
    <div
        className='w-full h-full flex'
    >

        <div className='hidden relative lg:block lg:w-2/12 h-full border-r border-black/20' >

            <div
                className='w-full flex justify-center p-4 items-center border-b border-b-black/10'
            >

                <LogoWrapper>
                    <Logo />
                </LogoWrapper>

            </div>
            <div className="w-full">

                {
                    menuOptions.map((option, index)=>(
                        <Link 
                            key={index}
                            className={
                                currentPage === option.path ? "w-full block p-3 border-b border-r-4 border-b-black/10 last:border-b-0 border-r-yellow-500 bg-black/5 text-black cursor-pointer hover:bg-black/10": "w-full p-3 block border-b border-b-black/10 last:border-b-0 bg-black/5 text-black cursor-pointer hover:bg-black/10"
                            }
                            onClick={()=>setCurrentPage(option.path)}
                            to={option.path}
                        >
                            {option.title}
                        </Link>
                    ))
                }
                
            </div>

            <button onClick={handleOnSignOut} className="flex justify-start items-center text-left w-full absolute bottom-0 left-0 bg-black/5 p-3 border-t border-b-black/10">
                Sign out 
                {
                    isLoading && (
                        <Loading 
                            className='ml-4' 
                            type='spin' 
                            height={"1rem"} 
                            width={"1rem"} 
                            color="#000" 
                        />
                    )
                }
            </button>

        </div>
        <div className='w-full lg:w-10/12 h-full border-r' >

            <div
                className='w-full flex justify-between p-4 items-center border-b border-b-black/10'
            >

                <button onClick={toggleNavigationVisibility} className="p-2 transition-colors hover:bg-black/10 rounded-full" >
                    <IoMenu className='text-xl' />
                </button>
                
                <div className="lg:hidden">
                    <LogoWrapper>
                        <Logo />
                    </LogoWrapper>
                </div>

                <button 
                    className="bg-gray-300 flex items-center justify-center h-10 rounded-full w-10"
                    title={current_user.full_name}
                >
                    <span className="font-bold text-white select-none text-xl">
                        {current_user.full_name.split(" ")[0].split("")[0]}
                    </span>
                </button>
                
            </div>
            
            <div className='w-full p-4 relative'>
                <Switch>
                    <Route exact path="/" component={Payments} />
                    <Route exact path="/refunds" component={Refunds} />
                    <Route exact path="/pay-clients" component={PayClients} />
                    <Route exact render={()=><Redirect to={"/"} />} />
                </Switch>
            </div>
                <Modal />
                <AlertsModal />
                <ConfirmModal />

        </div>

        <MobileSideNavigation />

    </div>
  )
}

const LogoWrapper = ({children})=>{
    return(
        <div className="w-10 h-10">{children}</div>
    )
}

