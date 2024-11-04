import React, { useEffect, useState } from 'react'

import { FaPlus } from "react-icons/fa6";
import { SlPlus } from "react-icons/sl";

import { useUserContext } from '../Context/UserContext'
import FileCard from '../components/FileCard';
import { useAuth0 } from '@auth0/auth0-react';

import { useNavigate } from 'react-router-dom'

import WebbSecuredImg from "../images/WebbSecured.png"

const HomePage = () => {
  const {dispatch,state} = useUserContext()
  const [cards,setCards] = useState([]);

  const navigate = useNavigate()

  const {
    isAuthenticated,
    user,
    isLoading,
    loginWithRedirect,
  } = useAuth0();

  useEffect(()=>{
    const uniqueIds = new Set();

    const filteredHistoryData = state.historyData.filter(item => {
      if (!uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        return true;
      }
      return false;
    });
    setCards(filteredHistoryData)
  },[state])

  return (
    <div class="relative h-full w-full bg-slate-950"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
    <div className="border-neutral-900 border-opacity-80  w-[80%] m-auto relative z-0 h-screen overflow-y-auto ...">
      
      <div className="border-2 border-opacity-10 rounded-3xl border-neutral-800 w-[90%] m-auto h-[50%] mt-[10%] overflow-hidden" >
        <div className="backdrop-filter backdrop-blur-sm w-[100%] h-[100%]">
          <div className="ml-4">
            {<h1 class="bg-gradient-to-r opacity-0 from-slate-400 to-cyan-100  inline-block text-transparent bg-clip-text text-4xl font-bold pb-4">Whats New: </h1>}
          </div>
          <div className="md:w-[80%] lg:w-[60%] h-[80%] bg-slate-400 m-auto bg-opacity-40 rounded-3xl overflow-hidden">
            <h2 className="text-3xl pl-10 bg-gradient-to-r from-gray-900 text-neutral-200 font-semibold bg-opacity-45 pb-2">Welcome:</h2>
            <p className="text-xl text-black pl-4 pt-2 bg-gradient-to-r from-stone-300 to-zinc-400 bg-opacity-65 pb-2">Our web security policy generator and editor simplifies the process of creating and managing policies. Easily draft custom policies and edit existing templates. We track all changes and revisions for complete transparency.</p>
            <div className="w-full h-full  pt-2 bg-gradient-to-r from-stone-300 to-zinc-400" >
              <div className="w-fit m-auto">
                <h1 className="text-2xl pl-8 text-green-900 font-bold">Features:</h1>
                <ul className='pl-8 text-xl text-black list-disc'>
                  <li>PDF Generator</li>
                  <li>Policy Prefabs</li>
                  <li>PDF Preview</li>
                  <li>Database saving and access</li>
                  <li>Editor History</li>
                </ul>
              </div>
              <div className="bg-green-95 bg-opacity-100">
              <img src={WebbSecuredImg} alt="Image description" className="w-[30%] m-auto" />
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 rounded-3xl border-opacity-10 border-neutral-800 md:w-[98%] lg:w-[70%] m-auto h-[50%] mt-[20%] overflow-hidden">
        <div className="backdrop-filter backdrop-blur-sm h-[70%]">
          <h2 className="bg-gradient-to-r from-gray-900 to-purple-950 text-white px-4 py-2 text-4xl mb-[3%]">Recent:</h2>
          {isAuthenticated ?
            <div className="flex overflow-x-auto space-x-8 h-[100%]  ">
            
            {<div className="bg-white rounded-md text-center w-1/5 flex-shrink-0 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" onClick={()=>navigate('/newPolicy')}>
              <h1 className="pt-1 font-bold text-xl text-slate-400">Create Policy</h1>
              <SlPlus className='size-[60%] m-auto pt-20 text-slate-400'/>
            </div>}
            {cards.map(item => (
              <>
              
              <FileCard file={item}/>
              </>
            ))}
            
          </div>
          :
            <div className="bg-opacity-45 w-fit h-fit px-2 py-2 mx-auto md:mt-[15%] lg:mt-[5%] rounded-full" onClick={()=>loginWithRedirect()}>
              <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-2 rounded-3xl text-neutral-100 text-2xl font-bold">Login For Recent</h1>
            </div>
            
          }
          
        </div>
      </div>
    </div>
    </div></div>
  );
};

export default HomePage