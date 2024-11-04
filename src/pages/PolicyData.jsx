import React, { useState } from 'react'

import { usePolicyContext } from '../Context/PolicyContext'

import { useNavigate } from 'react-router-dom'


const PolicyData = () => {
  const navigate = useNavigate()

  const  {state, dispatch} = usePolicyContext();
  const [rev,setRev] = useState(state.data.rev)
  const [approvalDate,setApprovalDate] = useState(state.data.approvalDate)
  const [toc,setToc] = useState(state.data.toc)
  const [showLogo,setShowLogo] = useState(state.data.showLogo)

  function save(){
    dispatch({
      type: "SET_META",
      payload: {rev, approvalDate, toc, showLogo} 
    });
    navigate('/editor')
  }

  return (
    <div className="border-neutral-900 border-opacity-80 backdrop-filter backdrop-blur-sm w-[80%] h-fit mx-auto relative z-0 overflow-y-auto ... text-black rounded-br-full rounded-tl-3xl mt-20">
      <div className="w-[95%] bg-neutral-300 h-full rounded-lg m-auto">
        <h2 className="text-black text-4xl text-center underline font-bold">Policy Data:</h2>
        
        <div className="w-fit mx-auto">
          <div className="flex w-fit mx-auto mt-6">
            <button className="border-1 border-neutral-950 rounded-lg px-2 hover:bg-slate-300 font-bold mr-4" onClick={save}>Save</button>
            <button className="border-1 border-neutral-950 rounded-lg px-2 hover:bg-slate-300 font-bold " onClick={() => {navigate('/editor')}}>Exit</button>
          </div>
          <div className="flex mb-2">
            <p className="text-2xl">Rev: </p>
            <input className='w-10 bg-neutral-300 border-1 border-neutral-950 rounded-lg text-center hover:bg-slate-300' type="text" value={rev} onChange={(e) => {setRev(e.target.value)}}/>
          </div>
          <div className="flex mb-2">
            <p className="text-2xl">Board Approval Date: </p>
            <input className='w-30 bg-neutral-300 border-1 border-neutral-950 rounded-lg text-center hover:bg-slate-300' type="date" value={approvalDate} onChange={(e) => {setApprovalDate(e.target.value)}}/>
          </div>
          <div className="flex mb-2">
            <p className="text-2xl">Table Of Contents: </p>
            <button className="border-1 border-neutral-950 rounded-lg px-4 hover:bg-slate-300" onClick={()=>setToc(!toc)}>{toc ? "true" : "false"}</button>
          </div>
          <div className="flex">
            <p className="text-2xl">Use Logo: </p>
            <button className="border-1 border-neutral-950 rounded-lg px-4 hover:bg-slate-300 mb-10 mt-1" onClick={()=>setShowLogo(!showLogo)}>{showLogo ? "true" : "false"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicyData