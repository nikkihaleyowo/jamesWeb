import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  loggedIn: false,
  userPolicyList: [],
  companyData: {},
  historyData: [],
  hasImage: false,
  userImage: null,
  verified: false,
  admin: false,
}

function UserReducer(state,action){
  switch(action.type){
    case 'SET_USER':
      console.log('updated user')
      let company = {};
      let policyList = [];
      let history=[];

      console.log('geennnnn')  
      console.log(action.payload)
      
      company = action.payload.company;

      policyList = action.payload.policy;

      history = action.payload.history.reverse();

      let hasImage = action.payload.hasImage;

      let img = action.payload.userImage

      return {...state, loggedIn: true, companyData: company, userPolicyList: policyList, historyData: history, hasImage: hasImage, userImage: img, verified: action.payload.verified, admin: action.payload.admin}
    case 'SET_IMAGE':
      console.log("oow")
      console.log(action.payload.userImage)
      return{...state, hasImage: true, userImage: action.payload.userImage}
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

