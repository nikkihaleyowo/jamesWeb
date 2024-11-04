import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "react-bootstrap"

import DropdownMenu from "./DropdownMenu"
import { convertToRoman } from "../utils/utils"
import { useState, useEffect} from "react"

import { usePolicyContext } from '../Context/PolicyContext'

const SortableItem = (props) => {
    const policyId = props.id;
    const  {dispatch} = usePolicyContext();

    const [showText, setShowText] = useState(false);
    const [subTitle,setSubTitle] = useState(props.sub.subTitle);
    const [editSubTitle,setEditSubTitle] = useState(false);

    useEffect(()=>{
      setSubTitle(props.sub.subTitle)
    },[props.sub.subTitle])

    const { 
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    function handleClick() {
      setShowText(!showText)
    }

    function handleAddSubText(){
      dispatch({
        type: "ADD_TEXT",
        payload: { index: props.index } 
      });
    }

    function handleEditSubTitle(event){
      console.log(event.target.value)
      setSubTitle(event.target.value)
    }

    function handleSaveSubTitle(){
      console.log("fugggse");
      console.log(subTitle);
      dispatch({
        type: "EDIT_SUBTITLE",
        payload: { index: props.index, subTitle} 
      });
      setEditSubTitle(false)
    }

  return (
    <>
    <div className="">
    <div className="inline-flex items-center justify-center w-[95%]" ref={setNodeRef} style={style} {...attributes} {...listeners}>
    
        <span body className=" border-4 p-3 flex-shrink-0 w-[100%] bg-neutral-100 rounded-lg
        inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="flex flex-row">
          <button className="border-2 px-1 w-6 rounded-md hover:underline " onMouseDown={handleClick}>{showText ? "^":"v"}</button>
          {editSubTitle ? 
            (<><textarea
                className="w-full border-b-2 border-neutral-700 mb-3 h-6 break-words bg-neutral-100 mt-2 ..."
                value={subTitle}
                onChange={(event) =>handleEditSubTitle(event)}
              />
            <button className="h-6 flex items-center justify-center pb-1 mt-3" onMouseDown={handleSaveSubTitle}>✔️</button>  
            </>
            ) :
            <h2 className="text-2ml text-left" onDoubleClick={() => setEditSubTitle(!editSubTitle)}>{convertToRoman(props.index+1) + ". "+subTitle}</h2>
          }
          {showText&&(
            <button className="border-2 rounded-md border-neutral-400 h-5 w-5 flex items-center justify-center pb-1 ml-auto mr-3 text-2xl hover:bg-neutral-200 focus:bg-neutral-100"
            onMouseDown={handleAddSubText}>+</button>
          )}
          </div>  
          {showText&&(
            props.sub.data.constructor === Array ?
            props.sub.data.map((subData,index) => <InsideElement data={subData} subIndex={props.index} highIndex = {index}/>):
            <InsideElement data={props.sub.data} highIndex={-1}/>
            )}
          
        </span>
        <DropdownMenu className="" policyid={policyId}/>
    </div>
    </div>
    
    </>
  )
}

const InsideElement = ({data, highIndex, subIndex}) => {

  const [editText, setEditText] = useState(false);
  const [text,setText] = useState(data.data)
  const [type,setType] = useState(data.type)

  const  {dispatch} = usePolicyContext();

  useEffect(()=>{
    setText(data.data);
    setType(data.type)
  },[data])

  const handleDoubleClick = () => { 
    setEditText(true)
  };

  const handleChange = (event,index) => {
    const tempArr = [...text];
    tempArr[index] = event.target.value;
    setText(tempArr);
  }

  function handleSave(){
    const tempArr = text.filter(item => item!== "");
    setText(tempArr)

    dispatch({
      type: "UPDATE_TEXT",
      payload: {subIndex, highIndex, text, type }
    });
    setEditText(false)
    //setType(data.type);
  }

  function handleExit(){
    setText(data.data)
    setEditText(false)
    setType(data.type);
  }

  function handleType(){
    if(type==="ul")
      setType("p")
    else
      setType("ul")
  }

  function handleDelete(index){
    let tempArr = [...text];
    tempArr.splice(index,1);
    setText(tempArr)
  }

  function handleAdd(){
    let tempArr = [...text];
    tempArr.push("")
    setText(tempArr)
  }
  return(
    <>
      {data.type === "p" &&
        (editText ? 
        (<>
        <div className="ml-auto">
          <span>Type:</span>
          <button className="border-2 py-.5 px-1 rounded-md mr-10 ml-1 hover:bg-neutral-200 focus:bg-neutral-100"
          onMouseDown={handleType}>{type}</button>
          <button className="border-2 py-.5 px-1 rounded-md mx-1 hover:bg-neutral-200 focus:bg-neutral-100"
          onMouseDown={handleSave}>Save</button>
          <button className="border-2 py-.5 px-1 rounded-md mx-1 hover:bg-neutral-200 focus:bg-neutral-100"
          onMouseDown={handleExit}>exit</button>
          
        </div>
        
        {text.map((subData,index) => {
          return(
            <div className="flex flex-row">
              <textarea
                className="w-full border-b-2 border-neutral-700 mb-3 h-20 break-words bg-neutral-100 ..."
                value={text[index]}
                onChange={(event) => handleChange(event,index)}
              />
              <button className="border-2 h-4 w-4 flex items-center justify-center text-2xl pb-1 mt-4 ml-1 rounded-md hover:bg-neutral-200 focus:bg-neutral-100"
              onMouseDown={(event) => handleDelete(index)}>-</button>
              <br/>
            </div>
          )
        })}
        <button className="border-2 h-4 w-4 flex items-center justify-center text-1xl pb-1 rounded-md ml-auto hover:bg-neutral-200 focus:bg-neutral-100"
        onMouseDown={handleAdd}>+</button>
        </>)
        :Array.isArray(text)&&text.map((subData, index) => (
        <>
        <h2 key={index} className="text-left" onDoubleClick={handleDoubleClick}>
          {subData==="" ? "[insert text]" : subData}
        </h2>
        <br/>
        </>
        )))
      }
      {data.type ==="ul" && (
      <>
      {editText ? 
        (<>
        <div className="ml-auto">
          <span>Type:</span>
          <button className="border-2 py-.5 px-1 rounded-md mr-10 ml-1 hover:bg-neutral-200 focus:bg-neutral-100"
          onMouseDown={handleType}>{type}</button>
          <button className="border-2 py-.5 px-1 rounded-md mx-1 hover:bg-neutral-200 focus:bg-neutral-100"
          onMouseDown={handleSave}>Save</button>
          <button className="border-2 py-.5 px-1 rounded-md mx-1 hover:bg-neutral-200 focus:bg-neutral-100"
          onMouseDown={handleExit}>exit</button>
        </div>
        
        {text.map((subData,index) => {
          return(
            <div className="flex flex-row">
              <textarea
                className="bg-neutral-100 w-full border-b-2 border-neutral-700 mb-3 h-20 break-words ..."
                value={text[index]}
                onChange={(event) => handleChange(event,index)}
              />
              <button className="border-2 h-4 w-4 flex items-center justify-center text-2xl pb-1 mt-4 ml-1 rounded-md hover:bg-neutral-200 focus:bg-neutral-100"
              onMouseDown={(event) => handleDelete(index)}>-</button>
              <br/>
            </div>
          )
        })}
        
        <button className="border-2 h-4 w-4 flex items-center justify-center text-1xl pb-1 rounded-md ml-auto hover:bg-neutral-200 focus:bg-neutral-100"
        onMouseDown={handleAdd}>+</button>

        </>)
        :Array.isArray(text)&&
        (<>
          <ul className="list-disc pl-5" onDoubleClick={handleDoubleClick}>
            {text.map((subData,index) => {
              if(subData.length>0)
                return (<li className="text-left" key={index}>{subData}</li>)
            })}
          </ul>
          <br/>
        </>)
      }
      </>
    )}
    </>
  )
}

export default SortableItem