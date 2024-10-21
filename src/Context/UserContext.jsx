import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  loggedIn: false,
  userPolicyList: [],
  companyData: {},
  historyData: [],
}

function UserReducer(state,action){
  switch(action.type){
    case 'SET_USER':
      console.log('updated user')
      let company = {};
      let policyList = [];
      let history=[];

      //console.log(action.payload.history)
      
      company = action.payload.company;

      policyList = action.payload.policy;

      history = action.payload.history;

      return {...state, loggedIn: true, companyData: company, userPolicyList: policyList, historyData: history}
    default: 
      return state;
  }
}

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  
  return(
    <UserContext.Provider value={{state,dispatch}}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if(context === undefined){
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context;
}

export {UserContext, UserContextProvider};

