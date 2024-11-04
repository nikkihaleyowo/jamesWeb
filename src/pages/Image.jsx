import axios from 'axios'
import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../Context/UserContext';

import { IoChevronBackCircleOutline } from "react-icons/io5";

import { useNavigate } from 'react-router-dom'


const Image = () => {

  const navigate = useNavigate()

  const {dispatch,state} = useUserContext();

  const [userImage,setUserImage] = useState( {myFile: ""} ) 

  const [loadedImage,setLoadedImage] = useState(null);
  const [loaded,setLoaded] = useState(false);

  const {
    user:authUser
  } = useAuth0();

  const createPost = async (newImage) => {
    if(!state.hasImage){
      try{
        await axios.post("/api/users/imageUpload/"+authUser.email, newImage)
      }catch(error){
        console.log(error)
      }
    }else{
      try{
        await axios.post("/api/users/imageUpdate/"+authUser.email, newImage)
      }catch(error){
        console.log(error)
      }
    }

    dispatch({
      type: "SET_IMAGE",
      payload: {userImage: newImage.myFile} 
    });

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    createPost(userImage)
    console.log("post image")
  }

  const handleFileUpload = async(e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file)
    setUserImage({...userImage, myFile: base64})
  }

  const getImage = async() =>{
    await axios.get("/api/users/imageFind/"+authUser.email).then(res =>{
      console.log(res.data)
      setLoadedImage(res.data.myFile);
      setLoaded(true)
    })
  }
  
  return (
    <div className="border-neutral-900 border-opacity-80 backdrop-filter backdrop-blur-sm w-[80%] h-fit mt-52 mx-auto relative z-0 overflow-y-auto ... text-neutral-100 rounded-2xl">
      <div className="flex justify-between">
        <IoChevronBackCircleOutline className='size-14 pl-2 pt-2 hover:text-neutral-400' onClick={() => {navigate('/company')}}/>  
        <h1 className="text-center text-3xl font-bold mr-[50%]">Logo</h1>
        
      </div>
      {state.hasImage && <img className='bg-neutral-200 m-auto mt-4' src={state.userImage} alt=''/>}
      <div className=" w-fit mx-auto mt-6">
        <form className="" onSubmit={handleSubmit}>
          <input 
          type="File" 
          lable="Image"
          name='myFile'
          accept='.jpeg, .png, jpg'
          onChange={(e) => handleFileUpload(e)}
          />
          <br/>
          <button type='submit' className="border-1 border-neutral-400 px-4 rounded-lg bg-neutral-300 text-neutral-950 hover:bg-slate-300 mt-2 mb-4">Submit</button>
        </form>
      </div>

      
    </div>
  )
}

export default Image

function convertToBase64(file){
  return new Promise((resolve, reject)=>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () =>{
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}