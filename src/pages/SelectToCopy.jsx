import React, { createContext, useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion';

import { PolicyList } from "../utils/policyData";
import { useUserContext } from '../Context/UserContext';

const PolContext = createContext();

import axios from 'axios';
import { usePolicyContext } from '../Context/PolicyContext';
import { useNavigate } from 'react-router-dom';

const SelectToCopy = () => {
  const [isScreenTwoVisible, setIsScreenTwoVisible] = useState(false);

  const [openPol,setOpenPol] = useState({})
  const [selPol,setSelPol] = useState([])

  

  const [hidden,setHidden] = useState(false)

  const toggleScreens = () => {
    setHidden(false)
    setTimeout(()=>{
      setIsScreenTwoVisible(false);
    },100)
    
    
  };

  const openPrefDoc = (index) =>{
    setIsScreenTwoVisible(true)
    setOpenPol(PolicyList[index])
    setTimeout(()=>{
      setHidden(true)
    },500)
  }
  const openUserDoc = (id) =>{
    console.log('tried to fetch')
    axios.get(`/api/policy/getPolicy/${id}`)
    .then(result => {
      console.log(result.data.data)
      setOpenPol(result.data.data)
      setIsScreenTwoVisible(true)
      setTimeout(()=>{
        setHidden(true)
      },500)
    }).catch(err=>console.log(err))
  }

  const UserContent = () => {
    const {dispatch,state} = useUserContext();
    const [policy,setPolicy] = useState([]);

    useEffect(()=>{
      const uniqueIds = new Set();
  
      const filteredHistoryData = state.historyData.filter(item => {
        if (!uniqueIds.has(item.id)) {
          uniqueIds.add(item.id);
          return true;
        }
        return false;
      });
      setPolicy(filteredHistoryData)
    },[state])

    return(
      <div className="">
        <h1 className="text-center text-2xl font-bold underline pb-2">Users:</h1>
        <div className="rounded-3xl overflow-y-scroll">
          {
            policy.map((data, index)=>(
              <>
              <div className={index%2==0 ? 'bg-slate-500 bg-opacity-10' : 'bg-slate-200 bg-opacity-10'}>
              <div className="text-black text-2xl hover:underline pb-1 pl-2" onClick={(e) => {openUserDoc(data.id)}}>{data.title}</div>
              <div className="flex">
              
              </div>
              
              </div>
              </>
            ))
          }
          </div>
      </div>
    )
  }

  const PrefabContent = () => {
    return(
      <div className="bg-gray-200 overflow-scroll">
        <h1 className="text-center text-2xl font-bold underline pb-2">Prefabs:</h1>
        
          <div className="rounded-3xl overflow-y-scroll">
          {
            PolicyList.map((data, index)=>(
              <>
              <div className={index%2==0 ? 'bg-slate-500 bg-opacity-10' : 'bg-slate-200 bg-opacity-10'}>
              <div className="text-black text-2xl hover:underline pb-1" onClick={(e) => {openPrefDoc(index)}}>{data.title}</div>
              <div className="flex">
              
              </div>
              <div className="border-b-2 w-[30%] mx-auto"></div>
              </div>
              </>
            ))
          }
          </div>
      </div>
    )
  }

  const Section = (props) =>{

    const section = props.section;
    const [saved,setSave] = useState(false)

    const { selPol, setSelPol } = useContext(PolContext)

    function copySelection(){
      if(selPol.find(obj => obj.title === section.subTitle + " (" + props.title + ")" )){
        setSelPol(selPol.filter(obj => obj.title !== section.subTitle + " (" + props.title + ")" ))
      }else{
        setSelPol([...selPol, { title: (section.subTitle + " (" + props.title + ")"), section }]);
        console.log('fuu');
      }
    }

    useEffect(()=>{
      console.log("state saved: " +saved)
    },[saved])

    return(
          <>
            <div className="flex flex-row justify-between">
            <h1 className="text-black text-xl font-semibold ">
              {section.subTitle}:
            </h1>
            <div className="flex flex-row">
              <p className="mr-2 font-bold">copy:</p>
              <button className="text-black border-2 border-neutral-950 w-6 h-6 rounded-lg mr-8 pb-4 bg-slate-300 hover:bg-slate-500" onClick={copySelection}>
              <span className="flex items-center justify-center">{selPol.find(obj => obj.title === section.subTitle + " (" + props.title + ")" ) ? "✔️" : ""}</span>
              </button>
              </div>
            </div>
            {section.data && section.data.length > 0 ? ( // Check for data & length
              
              section.data.map((subData) => {
                if (subData.type === 'p') { // Use if statement for clarity
                  return <p className="text-black">{subData.data}</p>;
                } else {
                  return(<ul className='list-outside list-disc ml-6'>
                  {subData.data.map(u => {
                    if(u.length>0)
                      return(<li>{u}</li>)
                  })}
                  </ul>)
                }
              })
            
            
            
            ) : (
              <div>No data to display</div> // Handle empty data gracefully
            )}
          </>
    )
  }

  const Selector = () => {
    return (
      <div className="">
        <h1 className="text-center text-2xl font-bold underline">{openPol.title}:</h1>
        {openPol.data.map((section) => (
          <Section section={section} title={openPol.title}/>
        ))}
      </div>
    );
  };

  const Selected = () => {

    const { selPol, setSelPol } = useContext(PolContext)

    function removeSel(section){
      setSelPol(selPol.filter(obj => obj.title !== section.title))
    }

    return (
      <>
      <h2 className="text-4xl underline text-white ml-[10%] pb-4 translate-y-[1300%]">Policy To Copy:</h2>
      <div className="w-[80%] h-[80%] translate-y-[115%] mx-auto rounded-2xl bg-slate-400 p-2 overflow-y-auto pt-2">
        
        {selPol.map(section => (
          <>
          <div className="flex flex-row justify-between">
          <h1 className="text-neutral-950 font-semibold underline">{section.title}:</h1>
          <button className="border-2 border-neutral-900 pb-2 text-center font-bold w-6 h-6 mr-4 rounded-lg hover:bg-slate-500" onClick={()=>removeSel(section)}>X</button>
          </div>
          {section.section.data && section.section.data.length > 0 ? ( // Check for data & length
              
            section.section.data.map((subData) => {
              if (subData.type === 'p') { // Use if statement for clarity
                return <p className="text-black">{subData.data}</p>;
              } else {
                return(<ul className='list-outside list-disc ml-6'>
                {subData.data.map(u => {
                  if(u.length>0)
                    return(<li>{u}</li>)
                })}
                </ul>)
              }
            })
          
          
          
          ) : (
            <div>No data to display</div> // Handle empty data gracefully
          )}
          <br/>
          </>
        ))}
        
      </div>
      </>
    )
  }

  const {state, dispatch} = usePolicyContext();
  const navigate = useNavigate()

  function save(){
    dispatch({
      type: "ADD_SECTION",
      payload: {pols:selPol}
    });
    navigate('/editor')
  }

  function exit(){
    navigate('/editor')
  }

  return (
    <PolContext.Provider value={{ selPol, setSelPol }}>
    <>
    <div className=" border-neutral-900 border-opacity-80 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] w-[100%] m-auto relative z-0 h-screen overflow-y-auto ...">
      <h1 class="bg-gradient-to-r from-slate-200 to-zinc-400 inline-block text-transparent bg-clip-text text-4xl font-bold pb-4 pl-[10%]">Copy From: </h1>

      <div className="w-[79.5%] h-[90%] p-2 bg-gray-400 z-0 absolute translate-x-[12.8%] rounded-2xl overflow-scroll">
        {isScreenTwoVisible && (
          <>
          {<Selector />}
          
          </>
          )}
      </div>
      {hidden && <Selected />}
      {!hidden && <div className="w-[80%] h-[90%]  border-neutral-900 flex m-auto overflow-auto rounded-2xl relative">
        <motion.div
          className="w-full h-[150%] bg-gray-200 flex-1 z-10"
          initial={{x: '-102%'}}
          animate={{ x: isScreenTwoVisible ? '-102%' : '0%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <PrefabContent />
        </motion.div>
        <motion.div
          className="w-full h-[150%] bg-gray-300 flex-1 z-20"
          initial={{x: '102%'}}
          animate={{ x: isScreenTwoVisible ? '102%' : '0%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <UserContent />
        </motion.div>
      </div>}
      {isScreenTwoVisible &&
      <>
      <button
        className="absolute top-5 right-[10%] bg-gradient-to-r from-slate-900 to-zinc-700 border-2 border-gray-800 text-white px-4 py-2 rounded-md"
        onClick={toggleScreens}
      >
        Policy Selection
      </button>
      <button
        className="absolute top-5 right-[35%] bg-gradient-to-r from-slate-900 to-zinc-700 border-2 border-gray-800 text-white px-4 py-2 rounded-md"
        onClick={save}
      >
        save
      </button>
      
      </>}
      <button
        className="absolute top-5 right-[48%] bg-gradient-to-r from-slate-900 to-zinc-700 border-2 border-gray-800 text-white px-4 py-2 rounded-md"
        onClick={exit}
      >
        exit
      </button>
    </div>
    </>
    </PolContext.Provider>
  );
}

export default SelectToCopy

