import React from 'react'

import { SlPlus } from "react-icons/sl";
import { FaFileAlt } from "react-icons/fa";
import { usePolicyContext } from '../Context/PolicyContext';

import { useNavigate } from 'react-router-dom'

const NewPolicy = () => {
  
  const navigate = useNavigate()
  const {dispatch:policyDispatch} = usePolicyContext();

  function createBlank(){
    policyDispatch({
      type: "CREATE_POLICY",
      payload: { data: { data: {"title":"Insert Title",
        "ids":[],
        "data":[]} } }
    });
    navigate('/editor')
  }

  return (
    <div className=" border-neutral-900 border-opacity-80 bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] w-[100%] m-auto relative z-0 h-screen overflow-y-auto ...">
      <div className="">
        <h2 className=" text-6xl font-bold pt-4 border-opacity-50 w-[80%]  m-auto pb-2 bg-gradient-to-r from-slate-200 to-slate-400  text-transparent bg-clip-text">New Policy:</h2>
      </div>
      <div className="flex h-[55%] justify-center items-center gap-4 md:mt-[15%] lg:mt-[5%]">
        <div className="rounded-3xl md:w-[40%] lg:w-[20%] h-[100%] shrink-0 overflow-hidden bg-gradient-to-r from-purple-900 text-white font-semibold p-1 drop-shadow-lg border-3 border-purple-950" onClick={createBlank}>
          <div class="relative h-full w-full p-2 "><div class="w-full h-full  ">
            <h2 className="opacity-100 brightness-200 text-center text-4xl font-bold border-b-2">Create Blank</h2>
            <p className="text-center w-[50%] mx-auto mt-10 text-slate-300">Create a new policy that is blank</p>
            <SlPlus className='size-[60%] m-auto pt-10 text-slate-400'/>
          </div></div>
        </div>
        <div className="rounded-3xl md:w-[40%] lg:w-[20%] h-[100%] shrink-0 overflow-hidden bg-gradient-to-r to-purple-900 text-white font-semibold p-1 drop-shadow-lg border-3 border-purple-950" onClick={()=>navigate('/prefab')}>
          <div class="relative h-full w-full p-2 "><div class="w-full h-full ">
            <h2 className="opacity-100 brightness-200 text-center text-4xl font-bold border-b-2">Use Prefab</h2>
            <p className="text-center w-[50%] mx-auto mt-10 text-slate-300">Create a new policy from provided prefabs</p>
            <FaFileAlt className='size-[40%] mx-auto md:mt-10  lg:mt-20 text-purple-300'/>
          </div></div>
        </div>
        
      </div>
    </div>
  )
}

export default NewPolicy