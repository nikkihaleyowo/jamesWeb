import React, { useEffect } from 'react'


import { IoArrowUndoCircle } from "react-icons/io5";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { usePolicyHistoryContext } from '../Context/PolicyHistoryContext';
import { usePolicyContext } from '../Context/PolicyContext';

const UndoRedo = () => {

  const {state:historyState, dispatch:historyDispatch} = usePolicyHistoryContext();
  const  {state, dispatch} = usePolicyContext();

  useEffect(()=>{
    console.log("history state changed")
    console.log(historyState)
  },[historyState])

  function undo(){
    console.log(historyState.on)
    if(historyState.changes.length>0 && historyState.on!==0){
      let n = historyState.changes[historyState.on-1];
      console.log("show")
      let num = historyState.on-1;
      console.log(num)
      console.log(historyState.changes)
      dispatch({
        type: 'SET_POLICY',
        payload: {data: {data: n}}
      })
      historyDispatch({
        type: "SET_ON",
        payload: historyState.on-1
      })
    }
  }

  function redo(){
    if(historyState.changes.length-1>historyState.on){
      let n = historyState.changes[historyState.on+1];
      dispatch({
        type: 'SET_POLICY',
        payload: {data: {data: n}}
      })
      historyDispatch({
        type: "SET_ON",
        payload: historyState.on+1
      })
    }
  }

  return (
    <div className="top-[10%] flex md:left-[6.8%] lg:left-[8%] fixed text-white z-2 ">
      <IoArrowUndoCircle onClick={undo} className='size-8 opacity-60 hover:opacity-80' />
      <IoArrowRedoCircleOutline onClick={redo} className='size-8 opacity-60 hover:opacity-80' />
    </div>
  )
}

export default UndoRedo