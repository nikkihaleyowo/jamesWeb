import React, {createContext, useContext, useReducer, useEffect} from "react";

import { PolicyList } from "../utils/policyData";

const PolicyContext = createContext();


const intialState = {data:{...PolicyList[2], rev: 1, approved: false, approvalDate: null, toc: true, showLogo: true, modified: false}, userPol: false};

function moveElement(array, fromIndex, toIndex) {
  const element = array.splice(fromIndex, 1)[0]; // Remove the element from the original position
  array.splice(toIndex, 0, element); // Insert the element at the new position
  return array;
}

function policyReducer(state, action) {
  state.data.modified = true;
  switch (action.type) {
    case 'UPDATE_POLICY':
      let newArr = [...state.data.data]; // Create a copy of the array

      /*const activeIndex = newArr.indexOf(action.payload.active);
      const overIndex = newArr.indexOf(action.payload.over);*/
      const activeIndex = newArr.findIndex(obj => obj.subTitle === action.payload.active)
      const overIndex = newArr.findIndex(obj => obj.subTitle ===action.payload.over)

      newArr = moveElement(newArr,activeIndex,overIndex)

      let idArr = [...state.data.ids];

      idArr = moveElement(idArr,activeIndex,overIndex);

      const newData = {...state.data, data: newArr, ids: idArr}

      console.log("mod: "+newData.modified)

      return { ...state, data:newData}; // Correct syntax for updating nested property
    
    case 'UPDATE_TEXT':{
      if(action.payload.highIndex!==-1){
        let newArr = [...state.data.data];
        let newText = action.payload.text
        newArr[action.payload.subIndex].data[action.payload.highIndex].data=newText;
        newArr[action.payload.subIndex].data[action.payload.highIndex].type=action.payload.type;
        const newData = {...state.data, data:newArr}
        return{...state, data: newData}
      }else{
        //let newText = state.data[action.payload.subIndex].data[action.payload.highIndex].
        console.log("fucl")
      }
      
    }
    case 'ADD_TEXT':{
      let newArr = [...state.data.data];
      newArr[action.payload.index].data.push({
        type:"p", data:[""]
      })
      const newData = {...state.data, data: newArr}
      return{...state, data: newData}
    }
    case 'ADD_POLICY':
      const hasIndex = PolicyList.findIndex(pol => pol.title === action.payload.policy)
      if(hasIndex>-1){
        console.log("add pol")
        const newArr = PolicyList[hasIndex]
        return{data:{...newArr, rev: 1, approved: false, approvalDate: null, toc: true, showLogo: true, modified: false}, userPol:false}
      }
      
      return{...state}
    case 'SET_POLICY':
      console.log("set pol: ")
      console.log(action.payload.data.data.modified)
      console.log(action.payload.data)
      action.payload.data.data.modified = false;
      return{...action.payload.data, userPol:true}
    case 'CREATE_POLICY':
      console.log("set pol: "+action.payload)
      const dd = action.payload.data;
      dd.data.rev = 1 
      dd.data.approved = false, 
      dd.data.approvalDate = null, 
      dd.data.toc = true, 
      dd.data.showLogo = true
      dd.data.modified = false
      return{...dd, userPol:false}
    case 'REMOVE_POLICY':
      const removeIndex = state.data.data.findIndex(pol => pol.subTitle === action.payload.policy)
      console.log(removeIndex)
      state.data.data.splice(removeIndex,1);
      state.data.ids.splice(removeIndex,1);
      return{...state}
    case 'MERGE_UP':
      const mergeIndex = state.data.ids.findIndex(pol => pol === action.payload.policy)
      if(mergeIndex>0){
        const mergeTo = state.data.ids[mergeIndex-1];

        const mergeIndexData = state.data.data.findIndex(pol => pol.subTitle === action.payload.policy)
        const mergeToIndex = state.data.data.findIndex(pol => pol.subTitle === mergeTo)

        const d = state.data.data[mergeIndexData].data;
        const td = state.data.data[mergeToIndex].data;
        state.data.data[mergeToIndex].subTitle+="-"+state.data.data[mergeIndexData].subTitle;
        state.data.data[mergeToIndex].data=[...td, ...d];

        state.data.ids.splice(mergeIndex,1)
        state.data.data.splice(mergeIndexData,1)
        console.log("merged sections")

        return{...state}

      }else{
        console.log("cant merge up")
      }
      return{...state}
    case 'EDIT_SUBTITLE':
      state.data.data[action.payload.index].subTitle = action.payload.subTitle;
      console.log(action.payload.subTitle)
      state.data.ids[action.payload.index]=action.payload.subTitle;
      return{...state}  
    case 'ADD_SUB':
      let num = -1;
      let str = "[category]";
      let index = state.data.data.findIndex(pol => pol.subTitle === str)
      while(index!==-1){
        num++;
        index = state.data.data.findIndex(pol => pol.subTitle === `[category${num}]`)
      }
      if(num!==-1)
        str = `[category${num}]`

      state.data.data.push({
        subTitle: str,
        data:[]
      })
      state.data.ids.push(str)
      return{...state}
    case 'ADD_SECTION':
      let newDataArr = state.data;
      action.payload.pols.map(pol=>{
        const { title } = pol;
        const existingIndex = newDataArr.ids.findIndex(existingTitle => existingTitle === title);
        console.log("id: "+existingIndex)
        if(existingIndex===-1){
          //pol.section.subTitle = pol.title
          newDataArr.ids.push(pol.title);
          newDataArr.data.push({...pol.section, subTitle : pol.title});
        }
      })
      return{...state, data:newDataArr}
    case "EDIT_TITLE":
      const nData = state.data;
      nData.title = action.payload;
      return {...state, data: nData }
    case "SET_META":
      let td = state.data;
      td.rev = action.payload.rev;
      td.approvalDate = action.payload.approvalDate;
      if(td.approvalDate!==null)
        td.approved = true;
      td.toc = action.payload.toc;
      td.showLogo = action.payload.showLogo;
      td.modified = true;
      return{...state, data: td}
    default:
      return state;
  }
}

const PolicyContextProvider = (props) => {
    const [state, dispatch] = useReducer(policyReducer, intialState);

    useEffect(() => {
      console.log('Context state updated:', state);
    }, [state]);

    return (
        <PolicyContext.Provider value={{state, dispatch}}>
            {props.children}
        </PolicyContext.Provider>
    )
}

export const usePolicyContext = () => {
    const context = useContext(PolicyContext);
    if (context === undefined) {
      throw new Error('usePolicyContext must be used within a PolicyContextProvider');
    }
    return context;
};

export { PolicyContext, PolicyContextProvider }; 