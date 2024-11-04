import React from 'react'

import { FaFileAlt } from "react-icons/fa";

import {formatDate} from '../utils/utils'
import axios from 'axios';

import { usePolicyContext } from '../Context/PolicyContext';

import { useNavigate } from 'react-router-dom'

const FileCard = (props) => {

  const navigate = useNavigate()
  const {dispatch:policyDispatch} = usePolicyContext();
  
  function handleClick(id){
    axios.get(`/api/policy/getPolicy/${id}`)
    .then(result => {
      console.log(result.data)
      policyDispatch({
        type: "SET_POLICY",
        payload: { data: result.data } 
      });
      navigate('/editor')
    }).catch(err=>console.log(err))
  }

  return (
    <div className='bg-white rounded-md text-center md:w-1/6 ml-[4%] flex-shrink-0 flex flex-col justify-between items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]' onClick={()=>handleClick(props.file.id)}>
      {console.log(props.file)}
      <h2 className="font-bold text-xl mb-auto text-slate-400">{props.file.title}:</h2>
      <FaFileAlt className='size-[40%] mx-auto mb-[10%] text-purple-300'/>
      <h1 className="text-center underline font-bold text-slate-400">Last Edit:</h1>
      <h1 className="text-center text-slate-400">{formatDate(props.file.date)}</h1>
    </div>
  )
}

export default FileCard