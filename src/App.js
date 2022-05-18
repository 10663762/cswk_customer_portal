import { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import { MobileSideNavigationProvider } from './contexts/MobileSideNavigationContext';
import { ModalProvider } from './contexts/ModalContext';
import { CurrentUserContext } from './contexts/UserContext';
import { Register } from './pages';
import Dashboard from './pages/dashboard';
import SignIn from './pages/SignIn';
import auth from './services/auth';
import { AlertModalProvider } from './contexts/AlertModalContext';
import { ConfirmModalProvider } from './contexts/ConfrimRefundModalContext';


function App() {

  const {isUserLoggedIn, logUserOut, logUserIn, setUserPropsState} = useContext(CurrentUserContext)

  useEffect(()=>{
    checkUserSession()
    
    //eslint-disable-next-line
  }, [])

  const checkUserSession = async ()=>{
      try {
        const token_expiration_time = JSON.parse(localStorage.getItem("access_token")).expires_at
        const today = new Date()
    
        if(!token_expiration_time || today > token_expiration_time){
            await auth.signOut()
            logUserOut()
            setUserPropsState({})
        }else{
            logUserIn()
            const current_user = JSON.parse(localStorage.getItem("current_user"))
            setUserPropsState(current_user)
        }
      } catch (error) {
        throw error
      }
  }
  
  return (
    <div className="App">

        <MobileSideNavigationProvider>
            <AlertModalProvider>
                <ModalProvider>

                    {
                      !isUserLoggedIn ? (

                        <Router>

                          <Switch>

                              <Route path="/" exact component={SignIn} />
                              <Route path="/register" exact component={Register} />
                              <Route exact render={()=><Redirect to="/" />} />
                            
                          </Switch>

                        </Router>
                        
                      ):(
                        <Router>
                            <ConfirmModalProvider>
                                <Dashboard />
                            </ConfirmModalProvider>
                        </Router>
                      )
                    }

                </ModalProvider>
            </AlertModalProvider>
        </MobileSideNavigationProvider>

    </div>
  );
}

export default App;
