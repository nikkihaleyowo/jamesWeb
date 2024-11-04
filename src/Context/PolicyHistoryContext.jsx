import { createContext, useContext, useReducer } from "react";


const PolicyHistoryContext = createContext();

const initialState = {
  changes : [],
  on: 0,
  sendBack: false,
}

function PolicyHistoryReducer(state,action){
  switch(action.type){
    case 'ADD_HISTORY':
      console.log("ll")
      console.log(state.changes.length)
      console.log(state.on)
      if(state.on===state.changes.length-1||state.changes.length===0){
        state.on = state.changes.length;
        state.changes.push(action.payload)
        state.sendBack = false;
        return{...state}
      }else{
        console.log('awww')
        let newArr = [...state.changes]
        newArr.splice(state.on+1);
        newArr.push(action.payload)
        console.log("new arr")
        console.log(newArr)
        
        state.on=newArr.length-1;
        state.sendBack = false;
        return{...state, changes: newArr}
      }
      
    case 'SET_ON':
      console.log('faaaaaa')
      state.on = action.payload;
      state.sendBack = true;
      return{...state}
    case 'USE_SENDBACK':
      state.sendBack=false;
      return{...state}
    default:
      return state;
  }
}

const PolicyHistoryContextProvider = (props) => {
  const [state,dispatch] = useReducer(PolicyHistoryReducer, initialState);

  return(
    <PolicyHistoryContext.Provider value={{state,dispatch}}>
      {props.children}
    </PolicyHistoryContext.Provider>
  )
}

export const usePolicyHistoryContext = () =>{
  const context = useContext(PolicyHistoryContext);
  if(context === undefined){
    throw new Error('usePolicyHistoryContext must be used within a PolicyHistoryContextProvider')
  }
  return context;
}

export {PolicyHistoryContext, PolicyHistoryContextProvider};