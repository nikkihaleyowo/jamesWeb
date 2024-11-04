import LayerDropDown from "./components/LayerDropDown";
import backgroundImage from './assets/img/background.jpg';

import SideBar from "./components/SideBar";
import Notification from "./components/Notification";

import { useAuth0 } from '@auth0/auth0-react';
import LoadUser from "./components/LoadUser";
import EditorPage from "./pages/EditorPage";

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import CompanyPage from "./pages/CompanyPage";
import EditCompany from "./pages/EditCompany";
import PolicyPage from "./pages/PolicyPage";
import HomePage from "./pages/HomePage";
import NewPolicy from "./pages/NewPolicy";
import PrefabPage from "./pages/PrefabPage";
import SelectToCopy from "./pages/SelectToCopy";
import Image from "./pages/Image";
import PolicyData from "./pages/PolicyData";
import AdminPage from "./pages/AdminPage";
import { useUserContext } from "./Context/UserContext";
import NotVerified from "./pages/NotVerified";

import { ImPower } from "react-icons/im";



function App() {

  const {
    isLoading,
    error,
    isAuthenticated,
    user
  } = useAuth0();

  const {state:userState} = useUserContext();

  

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <>
    
    <div 
      className="fixed top-0 left-0 w-full h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      
      {isLoading ?
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-neutral-100 pb-2 text-center">Loading...</h1>
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-neutral-50"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>
       </div>
      :
      <BrowserRouter>
        {isAuthenticated && <LoadUser user={user}/>}
        <Notification />
        <SideBar />
        {(isAuthenticated && userState.loggedIn && !userState.verified) ? <NotVerified /> : 
        <Routes>
          
          <Route path='/' element={<HomePage />}/>
          <Route path='/editor' element={<EditorPage />}/>
          <Route path='/company' element={<CompanyPage />}/>
          <Route path='/editCompany' element={<EditCompany />}/>
          <Route path='/policy' element={<PolicyPage />}/>
          <Route path='/newPolicy' element={<NewPolicy />}/>
          <Route path='/prefab' element={<PrefabPage />}/>
          <Route path='/selectToCopy' element={<SelectToCopy />}/>
          <Route path='/logo' element={<Image />}/>
          <Route path='/policyData' element={<PolicyData />}/>
          <Route path='/admin' element={<AdminPage />}/>
        </Routes>
        }
      </BrowserRouter>
      }
    
    <footer className=" text-white z-20 text-xs opacity-100 fixed bottom-0 right-0 bg-slate-600 bg-opacity-20">
      <div className="flex justify-between">
      <ImPower className="ml-10 size-3 mt-1"/>
      <p className="text-right pr-2">Powered by: </p>
      </div>
      <p className="pr-2">Open Web Opportunities</p>
    </footer>

    </div>
    </>
  )
}

export default App
