import React, { useEffect } from 'react'
import axios from 'axios'
import { useUserContext } from '../Context/UserContext'

import { useNavigate } from 'react-router-dom'

const LoadUser = (props) => {

  const {dispatch} = useUserContext();

  const navigate = useNavigate()

  useEffect( async ()=>{
    console.log("sss: "+props.user.email)
    let exists = false;
    await axios.get(`/api/users/find/${props.user.email}`)
    .then(async(result) => {
      console.log('----------')
      console.log(result.data)
      if(result.status === 200){
        exists = true;
        console.log('user Exists')
        const data = result.data;
        console.log(data)
        data.userImage = null;
        if(data.hasImage){
          console.log("load image")
          await axios.get("/api/users/imageFind/"+props.user.email).then(res =>{
            data.userImage = res.data.myFile;
            console.log("got image")
          })
        }
        dispatch({
          type: "SET_USER",
          payload: { ...data} 
        });
      }
    })
    .catch(err=>console.log(err))
    if(!exists){
      console.log(props.user.email)
      axios.post(`/api/users/create`, {email: props.user.email})
        .then(result => {
          console.log('making a new user')
          const data = result.data;
          console.log(data)
          dispatch({
            type: "SET_USER",
            payload: { ...data } 
          });
          
          navigate('/editCompany')
        })
        .catch(err=>console.log(err))
    }
    console.log("loadin user ")
  }, [])

  return (
    <>
    </>
  )
}

export default LoadUser