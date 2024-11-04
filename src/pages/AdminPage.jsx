import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNotificationContext } from '../Context/NotificationContext';

const AdminPage = () => {

  const [addUser,setAddUser] = useState("");
  const {dispatch: NotificationDispatch} = useNotificationContext();
  const [data,setData] = useState({verified: 0, userList: []})

  useEffect(()=>{
    axios.get(`/api/admin/getData`)
    .then((result)=>{
      console.log(result.data)
      setData(result.data);
    })
  },[])

  function addVerifiedUser(){
    console.log('adding new user')
    axios.post(`/api/admin/addVerified`, {email: addUser})
    .then(()=>{
      setAddUser("")
      NotificationDispatch({
        type: "ADD_NOTIFICATION",
        payload: {message: "User Added"} 
      });
    })
  }
  function removeVerifiedUser(){
    axios.post(`/api/admin/removeVerified`, {email: addUser})
    .then((result)=>{
      if(result.status==201){
        setAddUser("")
        NotificationDispatch({
          type: "ADD_NOTIFICATION",
          payload: {message: "User Removed"} 
        });
      }else{
        NotificationDispatch({
          type: "ADD_NOTIFICATION",
          payload: {message: "User Wasnt Found"} 
        });
      }
      
    })
  }

  return (
    <div className=" border-neutral-900 border-opacity-80 backdrop-filter backdrop-blur-sm w-[80%] m-auto relative z-0 h-screen overflow-y-auto text-neutral-50 ...">
      <h2 className="text-center text-neutral-50 text-4xl underline">Admin</h2>
      <div className="h-[60%] w-fit m-auto mt-4">
      <div className="">
        <h2 className="text-2xl pl-2">Total Users: {data.verified}</h2>
      </div>

      <div className="ml-2">
        <h2 className="text-xl">Modify User:</h2>
        <input type="email" className='text-black w-48' value={addUser} onChange={(e) => setAddUser(e.target.value)}/>
        <br/>
        <div className="m-auto pt-2">
          <button className="border-1 ml-2 rounded-lg px-2 hover:bg-slate-600" onClick={addVerifiedUser}>Add</button>
          <button className="border-1 ml-2 rounded-lg px-2 hover:bg-slate-600" onClick={removeVerifiedUser}>Remove</button>
        </div>
      </div>
      <div className="bg-slate-100 w-fit text-black mt-2 p-2 h-[70%] ml-2 overflow-y-scroll">
        <h1 className="pb-1 text-center underline font-bold">user list:</h1>
        {data.userList.map(u=>(
          <h1 className="pb-1">{u}</h1>
        ))}
      </div>
      </div>
    </div>
  )
}

export default AdminPage