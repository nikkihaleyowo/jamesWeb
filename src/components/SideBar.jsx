import { useState } from "react";

import { HiMenu } from "react-icons/hi";
import { HiArrowSmLeft } from "react-icons/hi";

import { HiArrowCircleUp } from "react-icons/hi";

import { CgProfile } from "react-icons/cg";

import { PolicyList } from "../utils/policyData";

import { motion, AnimatePresence } from 'framer-motion'

import { useAuth0 } from '@auth0/auth0-react';

import { useNavigate } from 'react-router-dom'

import WebbSecuredImg from "../images/WebbSecured.png"
import { useUserContext } from "../Context/UserContext";
import { usePolicyContext } from "../Context/PolicyContext";

const sidebarVariants = {
  small: {
    width: "64px" // Or any desired small width
  },
  large: {
    width: "256px" // Or any desired large width
  }
}

const sidebarItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const dropDownItemVariants = {
  hidden: { opacity: 0,
    scale:0,
    rotate: 180
  },
  visible: { opacity: 1,
    scale:1,
    rotate: 0
  }
};

function SideBar() {

  const [open,setOpen] = useState(false);

  const {state:userState} = useUserContext();
  const {state:polState} = usePolicyContext();

  const {
    isAuthenticated,
    user,
    isLoading
  } = useAuth0();

  return (
    <>
    <AnimatePresence>
      {!open ? (
        <motion.div className="h-screen w-14 backdrop-filter backdrop-blur-xl justify-center items-center border-neutral-900 border-r-2 border-opacity-40 brightness-150
        transition duration-300 ease-in-out fixed top-0 left-0 z-10"
        variants={sidebarVariants}
        initial="small"
        animate="small"
        exit="large"
        >
          <motion.div className="pt-8 transition-all duration-300 ease-in-out"
          variants={sidebarItemVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          >
            <HiMenu className="border-2 border-neutral-800 rounded-full size-10 m-auto text-neutral-700 hover:border-neutral-300 hover:text-neutral-300 active:border-neutral-700 active:text-neutral-700 brightness-200" onClick={() => setOpen(!open)}/>
          </motion.div>
        </motion.div>
      ):
      (
        <motion.div
        className="h-screen w-14 backdrop-filter backdrop-blur-xl bg-neutral-950 bg-opacity-95 justify-center items-center border-neutral-900 border-r-2 border-opacity-40 brightness-200
        transition duration-300 ease-in-out fixed top-0 left-0 z-10"
        variants={sidebarVariants}
        initial="small"
        animate="large"
        exit="small">
          <div className="pt-4">
            <div className="size-[100%] flex justify-between items-center pr-5">
              <div className="pl-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              {isAuthenticated ?<div><img src={user.picture} alt={user.name} className="brightness-50 rounded-full m-auto size-[80%] "/></div> :
              <CgProfile className="size-20 "/>}
              </div>
              </div>
              
              <HiArrowSmLeft className="pt-2 size-[20%] text-neutral-600 hover:text-neutral-300 active:text-neutral-600 hover:scale-110 duration-300 ease-in-out " onClick={() => {setOpen(!open)}}/>
              
            </div>
            {isAuthenticated && console.log(user)}
            {isAuthenticated ? 
              <Dropdown name="Profile">
                {isAuthenticated ? <DropdownItem name="Logout"/>
                : <DropdownItem name="Login"/> }
              </Dropdown>:
              <Dropdown name="Login">

              </Dropdown>
            }
            <Dropdown name="Home">

            </Dropdown>
            {polState.data.modified && 
              <Dropdown name="Editor">

              </Dropdown>
            }
            <Dropdown name="Company">
            <DropdownItem name="Company Info"/>
            <DropdownItem name="Policy List"/>
            </Dropdown>

            {userState.admin &&
            <Dropdown name="Admin">

            </Dropdown>
            }
          </div>
          <img src={WebbSecuredImg} alt="Image description" className="w-[90%] pl-[5%] absolute bottom-4" />
        </motion.div>
      )
      }
      </AnimatePresence>
    </>
  )
}

function Dropdown(props){

  const navigate = useNavigate()

  const {
    isAuthenticated,
    loginWithRedirect,
    logout
  } = useAuth0();

  const [open,setOpen] = useState(false)

  function handleClick(){
    switch(props.name){
      case 'Login':
        loginWithRedirect();
        break;
      case 'Home':
        navigate('/')
        break;
      case 'Admin':
        navigate('/admin')
        break;
        case 'Editor':
          navigate('/editor')
          break;
      default:
        setOpen(!open);
        break;
    }
  }

  return (
    <>
      
        <motion.div 
          className="pt-10 text-neutral-200 flex hover:text-neutral-600 active:text-neutral-800 hover:scale-105"
          onClick={handleClick}
          whileHover={{ scale: 1.05 }} // Apply hover scale directly to the motion.div
          transition={{ duration: 0.3 }} // Control all transitions from here
        >
          <a className="pl-4 text-3xl tracking-wider font-semibold"> 
            {props.name}
          </a>
          {open && (
            <motion.div 
              variants={dropDownItemVariants} 
              initial="hidden" 
              animate={open ? "visible" : "hidden"}
            >
              <HiArrowCircleUp className="size-8 mt-1 pl-2"/>
            </motion.div>
          )}
        </motion.div>
        <AnimatePresence>
        {open&&(
          <motion.div 
            layout // Enable layout animations for smooth transitions
            initial={{ opacity: 0, height: 0 }} // Initially hidden
            animate={{ opacity: 1, height: "auto" }} // Animate to full height when open
            exit={{ opacity: 0, height: 0 }} // Collapse when closed
            transition={{ duration: 0.3 }}
          >
            {props.children}
          </motion.div>
        )}
        
      </AnimatePresence>
    </>
  );

}

function DropdownItem(props){

  const navigate = useNavigate()

  const {
    isAuthenticated,
    loginWithRedirect,
    logout
  } = useAuth0();

  function handleClick() {
    switch(props.name){
      case 'Logout':
        logout({ 
          logoutParams: {
            returnTo: window.location.origin
          }
        });
        break;
      case 'Login':
        loginWithRedirect();
        break;
      case 'Company Info':
        navigate('/company')
        break;
      case 'Policy List':
        navigate('/policy')
        break;
      case 'Home':
        navigate('/')
        break;
    }
  }

  return(
    <div className="text-2xl font-semibold pl-8 text-neutral-500 pt-2 hover:text-neutral-700 hover:scale-105 duration-300 ease-in-out" onClick={handleClick}>
      {props.name}
    </div>
  )
}

export default SideBar
