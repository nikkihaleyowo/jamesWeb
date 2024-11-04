import React, { useEffect, useState } from 'react'
import { useUserContext } from '../Context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';

import { useNotificationContext } from '../Context/NotificationContext';

import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const EditCompany = () => {
  const [name,setName] = useState();
  const [address,setAddress] = useState();
  const [city,setCity] = useState();
  const [zip,setZip] = useState();
  const [state,setState] = useState();

  const {dispatch,state:user} = useUserContext();

  const navigate = useNavigate()
  
  const {
    user:authUser
  } = useAuth0();

  useEffect(()=>{
    setName(user.companyData.name)
    setAddress(user.companyData.address)
    setCity(user.companyData.city)
    setZip(user.companyData.zip)
    setState(user.companyData.state)
  },[])

  const {dispatch: NotificationDispatch} = useNotificationContext();

  const save = async() => {
    console.log('wait')
    await axios.put("https://policy-backend-nafh.onrender.com/api/users/update/"+authUser.email, {name,address,city,zip,state}).then(result => {
      console.log(result)
      const data = result.data;
      dispatch({
        type: "SET_USER",
        payload: { ...data} 
      });
      console.log("sent dispatch")
      console.log(data)
      NotificationDispatch({
        type: "ADD_NOTIFICATION",
        payload: {message: "Saved Company"} 
      });
      navigate('/company')
    })
    .catch(err => console.log(err))
    
  }

  const exit = () => {
    navigate('/company')
  }

  return (
    <div className="border-neutral-900 border-opacity-80 backdrop-filter backdrop-blur-sm w-[50%] mt-52 mx-auto relative z-0 overflow-y-auto ... text-neutral-100 rounded-2xl">
      <div>
        <h2 className="text-center text-2xl underline">Edit Company Info</h2>
        <div className="mt-4 ml-4">
          <label className='text-xl' htmlFor="">Company Name:</label>
          <input type="text" className='bg-neutral-700 rounded-md ml-4 w-[60%] text-center' placeholder='enter name' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="mt-2 ml-4">
          <label className='text-xl' htmlFor="">Address:</label>
          <input type="text" className='bg-neutral-700 rounded-md ml-4 w-[75%] text-center' placeholder='address' value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <div className="mt-2 ml-4">
          <label className='text-xl' htmlFor="">city:</label>
          <input type="text" className='bg-neutral-700 rounded-md ml-4 w-[40%] text-center' placeholder='city' value={city} onChange={(e) => setCity(e.target.value)}/>
          <label className='text-xl ml-4' htmlFor="">zip code:</label>
          <input type="text" className='bg-neutral-700 rounded-md ml-4 w-[22%] text-center' placeholder='zip' value={zip} onChange={(e) => setZip(e.target.value)}/>
        </div>
        <div className="mt-2 ml-4">
          <label className='text-xl' htmlFor="">state:</label>
          <input type="text" className='bg-neutral-700 rounded-md ml-4 w-[30%] text-center' placeholder='state' value={state} onChange={(e) => setState(e.target.value)}/>
        </div>
        <div className="text-center mt-4">
          <button className='border-1 border-neutral-500 rounded-md bg-neutral-600 px-2.5 hover:bg-slate-500' onClick={save}>Save</button>
          <button className='border-1 border-neutral-500 rounded-md bg-neutral-600 px-3 ml-4 hover:bg-slate-500' onClick={exit}>Exit</button>
        </div>
      </div>
    </div>
  )
}

export default EditCompany