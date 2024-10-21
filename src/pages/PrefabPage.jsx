import React from 'react'

import { PolicyList } from "../utils/policyData";
import { usePolicyContext } from '../Context/PolicyContext';

import { useNavigate } from 'react-router-dom'

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
    policyDispatch({
      type: "CREATE_POLICY",
      payload: { data: { data: policy }}
    });
    navigate('/editor')
  }
  
  return (
    <div className=" border-neutral-900 border-opacity-80 backdrop-filter backdrop-blur-sm w-[80%] m-auto relative z-0 h-screen overflow-y-auto ...">
      <div className="mb-10">
        <h2 className="text-center text-6xl font-bold pt-4 border-b-4 border-opacity-50 w-[50%] border-neutral-600 m-auto pb-2 bg-gradient-to-r from-blue-500 to-neutral-200  text-transparent bg-clip-text ">Prefabs:</h2>
      </div>
      <div className="border-2 w-[70%] m-auto rounded-3xl bg-zinc-800 bg-opacity-35 border-opacity-10 border-neutral-600">
        {
          PolicyList.map((data)=>(
            
            <div className="text-slate-100 text-2xl text-center hover:underline" onClick={(e) => { e.stopPropagation(); addPolicy(data); }}>{data.title}</div>
            
          ))
        }
      </div>
      
    </div>
  )
}

export default PrefabPage