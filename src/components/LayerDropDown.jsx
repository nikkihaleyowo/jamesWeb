import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import { CSSTransition } from 'react-transition-group';

import BellIcon from '../icons/bell.svg?react';
import MessengerIcon from '../icons/messenger.svg?react';
import CaretIcon from '../icons/caret.svg?react';
import PlusIcon from '../icons/plus.svg?react';
import CogIcon from '../icons/cog.svg?react';
import ChevronIcon from '../icons/chevron.svg?react';
import ArrowIcon from '../icons/arrow.svg?react';
import BoltIcon from '../icons/bolt.svg?react';

import { DiCodeBadge } from "react-icons/di";
import { FaRegSave } from "react-icons/fa";

import { PolicyList } from "../utils/policyData";

import { usePolicyContext } from '../Context/PolicyContext'
import { usePDFContext } from '../Context/PDFContext';

import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useUserContext } from '../Context/UserContext';
import { useNotificationContext } from '../Context/NotificationContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";

import { FaCopy } from "react-icons/fa";

const OpenContext = createContext();

function LayerDropDown() {

  const [open,setOpen] = useState(false);
  const location = useLocation();
  const [loc,setLoc] = useState("")

  useEffect(()=>{
    setLoc(window.location.pathname)
    //console.log("path: " + window.location.pathname)
  },[window.location.pathname])

  return (
    <OpenContext.Provider value={{open, setOpen}}>
    <NavBar>

      <NavItem icon={<CaretIcon />} >
        
        <DropDownMenu />

      </NavItem>
    </NavBar>
    </OpenContext.Provider>
  );
}

function DropDownMenu(){

  const navigate = useNavigate()

  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null);

  const  {state: PolicyState,dispatch} = usePolicyContext();
  const {state, dispatch: PDFDispatch} = usePDFContext();
  const {dispatch:userDispatch} = useUserContext();

  const {dispatch: NotificationDispatch} = useNotificationContext();

  const dropdownRef = useRef(null);

  const { open, setOpen } = useContext(OpenContext);

  const {
    user:authUser
  } = useAuth0();

  function addPolicy(policy){
    switch(policy){
      case "SHOW_PREVIEW":
        //console.log("show preview")
        PDFDispatch({
          type: "UPDATE_PREVIEW",
          payload: { preview: true } 
        });
        setOpen(false)
        break;
      case "SAVE_POLICY":
        setOpen(false)
        if(PolicyState.userPol){
          const newPol = PolicyState;
          newPol.lastEdit = Date.now()
          console.log("updating pol")
          console.log(PolicyState._id)
          axios.put("/api/policy/updatePolicy",
          {
            pol: newPol,
            id: PolicyState._id
          })
          .then(res => {
            console.log("new pol: ")
            console.log(res.data)
            dispatch({
              type: "SET_POLICY",
              payload: { data: res.data.policy } 
            });
            userDispatch({
              type: "SET_USER",
              payload: { ...res.data.user} 
            });
            NotificationDispatch({
              type: "ADD_NOTIFICATION",
              payload: {message: "Saved Policy"} 
            });
          })
          .catch(err=>console.log(console.log(err)))
        }else{
          axios.put("/api/policy/savePolicy", 
          {
            email:authUser.email,
            title:PolicyState.data.title,
            rev: 1.0,
            approvalData: "NA",
            lastEdit: Date.now(),
            data: PolicyState.data,
          }).then(result => {
            console.log("pol: ")
            console.log(result)
            dispatch({
              type: "SET_POLICY",
              payload: { data: result.data.policy} 
            });
            userDispatch({
              type: "SET_USER",
              payload: { ...result.data.user} 
            });
            NotificationDispatch({
              type: "ADD_NOTIFICATION",
              payload: {message: "Saved New Policy"} 
            });
          })
          .catch(err => console.log(err))
        }
        break;
      case 'COPY_FROM':
        setOpen(false)
        navigate('/selectToCopy')
        break;
      case 'META':
        navigate('/policyData')
        break;
      default:
      console.log("TTTT")
      dispatch({
        type: "ADD_POLICY",
        payload: { policy: policy } 
      });
      break;
    }
  }

  useEffect(() => {
    if (dropdownRef.current) {
      calcHeight(dropdownRef.current);
    }
  }, [PolicyState]);

  function calcHeight(el){
    const height = el.offsetHeight+20;
    setMenuHeight(height);
  }

  function DropDownItem(props){
    return(
      <a href="#" className="menu-item" onClick={() => props.goToMenu ? setActiveMenu(props.goToMenu) :addPolicy(props.policy)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}

        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }

  return(
    <>
    
    <div className="dropdown" ref={dropdownRef} style={{height: menuHeight}}>
      <CSSTransition in={activeMenu === 'main'} 
      unmountOnExit 
      timeout={500}
      classNames="menu-primary"
      onEnter={calcHeight}
      >
        <div className="menu">

        <DropDownItem 
        leftIcon={<CogIcon/>}
        rightIcon={<ChevronIcon />}
        goToMenu="settings">
          Policy
        </DropDownItem>
        <DropDownItem 
        leftIcon={<DiCodeBadge />}
        policy="SHOW_PREVIEW"
        >
          Show Preview
        </DropDownItem>
        <DropDownItem 
        leftIcon={<FaRegSave />}
        policy="SAVE_POLICY"
        >
          Save
        </DropDownItem>

        <DropDownItem 
        leftIcon={<FaCopy />}
        policy="COPY_FROM"
        >
          Copy From Doc
        </DropDownItem>

        <DropDownItem 
        leftIcon={<FaRegEdit />}
        policy="META"
        >
          Edit Policy Data
        </DropDownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'settings'} 
      unmountOnExit 
      timeout={500}
      classNames="menu-secondary"
      onEnter={calcHeight}
      >
        <div className="menu">
        <DropDownItem 
        leftIcon={<ArrowIcon/>}
        rightIcon={<ChevronIcon />}
        goToMenu="main">
        </DropDownItem>
        {
          PolicyList.map((data)=>{
            return(<DropDownItem key={data.title}
              policy={data.title}>{data.title}</DropDownItem>)
          })
        }

        {/*<DropDownItem leftIcon={<ArrowIcon />} goToMenu="main"/>
        <DropDownItem
        policy="Purpose">Purpose</DropDownItem>
        <DropDownItem
        policy="Scope">Scope</DropDownItem>*/}
        </div>
    </CSSTransition>
    </div>
    </>
  );

}

function NavBar(props){
  return(
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  )
}

function  NavItem(props){
  const { open, setOpen } = useContext(OpenContext);

  return(
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

export default LayerDropDown
