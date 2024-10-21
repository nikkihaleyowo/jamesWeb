import React, { useEffect, useState } from 'react'
import { useUserContext } from '../Context/UserContext';
import { usePolicyContext } from '../Context/PolicyContext';

import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import {formatDate} from '../utils/utils'

const PolicyPage = () => {
  const {dispatch,state} = useUserContext();
  const {dispatch:policyDispatch} = usePolicyContext();

  const [policy,setPolicy] = useState([]);

  const navigate = useNavigate()

  const openPolicy = (id) =>{
    console.log('tried to fetch')
    axios.get(`https://policy-backend-nafh.onrender.com/api/policy/getPolicy/${id}`)
    .then(result => {
      console.log(result.data)
      policyDispatch({
        type: "SET_POLICY",
        payload: { data: result.data } 
      });
      navigate('/editor')
    }).catch(err=>console.log(err))
  }

  useEffect(()=>{
    const uniqueIds = new Set();

    const filteredHistoryData = state.historyData.filter(item => {
      if (!uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        return true;
      }
      return false;
    });
    setPolicy(filteredHistoryData)
  },[state])

  return (
    <div className=" border-neutral-900 border-opacity-80 backdrop-filter backdrop-blur-sm w-[80%] m-auto relative z-0 h-screen overflow-y-auto ...">
      <div className="w-[95%] h-screen m-auto justify-center">
        <h2 className="bg-gradient-to-r from-blue-500 to-slate-200  inline-block text-transparent bg-clip-text text-4xl font-bold pb-4 text-center" >User Policies:</h2>
        <div className="w-[80%] h-[85%] border-2 bg-slate-500 bg-opacity-40 rounded-3xl border-neutral-950 m-auto overflow-scroll overflow-y-scroll text-neutral-200">
          {
            policy.map(pol => {
              return (<div className="">
                <div className="flex flex-row justify-between items-center mb-2 border-b-2 border-neutral-200 w-[95%] m-auto border-opacity-30 border-dashed">
                <div className="">
                  <h2 className="text-2xl ml-2">{pol.title}</h2>
                  <h1 className="pl-2">last edit: {formatDate(pol.date)}</h1>
                </div>
                
                <button className='border-1 border-neutral-900 rounded-md px-2 font-bold bg-neutral-200 hover:bg-slate-300 mr-2 my-auto text-neutral-800' onClick={()=>openPolicy(pol.id)}>Open</button>
                </div>
              </div>)
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PolicyPage