import React from 'react'

import { PolicyList } from "../utils/policyData";
import { usePolicyContext } from '../Context/PolicyContext';

import { useNavigate } from 'react-router-dom'

import { MdAttachFile } from "react-icons/md";
import { FaArrowAltCircleRight } from "react-icons/fa";


const PrefabPage = () => {

  const navigate = useNavigate()
  const  {dispatch} = usePolicyContext();
  
  function addPolicy(policy){
    console.log('oooooooo')
    console.log(policy)
    /*dispatch({
      type: "ADD_POLICY",
      payload: { policy: policy } 
    });
    navigate('/editor')*/
    dispatch({
      type: "CREATE_POLICY",
      payload: { data: { data: policy }}
    });
    navigate('/editor')
  }
  
  return (
    <div className=" border-neutral-900 border-opacity-80 backdrop-filter backdrop-blur-sm w-[100`%] m-auto relative z-0 h-screen overflow-y-auto ...">
      <div className="mb-10">
        <div className="bg-gradient-to-r from-blue-800 rounded-xl ">
        <h2 className="text-center text-6xl font-bold pt-4border-opacity-50 w-[50%] border-neutral-600 m-auto pb-2  text-transparent bg-clip-text text-neutral-300 ">Prefabs:</h2>
        </div>
      </div>
      <div className="border-2 w-[70%] m-auto rounded-3xl bg-zinc-800 bg-opacity-35 border-opacity-10 border-neutral-600">
        <div className="rounded-3xl overflow-hidden">
        {
          PolicyList.map((data, index)=>(
            <>
            <div className={index%2==0 ? 'bg-slate-500 bg-opacity-10' : 'bg-slate-200 bg-opacity-10'}>
            <div className="text-slate-100 text-2xl text-center hover:underline pb-1" onClick={(e) => { e.stopPropagation(); addPolicy(data); }}>{data.title}</div>
            <div className="flex">
            <MdAttachFile className='text-neutral-50 mx-auto pb-4 size-[5%]'/>
            
            </div>
            <div className="border-b-2 w-[30%] mx-auto"></div>
            </div>
            </>
          ))
        }
        </div>
      </div>
      
    </div>
  )
}

export default PrefabPage