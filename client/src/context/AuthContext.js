import React, { createContext, useEffect, useReducer } from "react";

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state,user: action.payload };
    case 'LOGOUT':
      return { ...state,user: null };
      case 'PROFILE_STATUS':
        return { ...state , hasProfile: action.payload };
    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    hasProfile:false
  });

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:'LOGIN',payload:user})
    }
  },[])

  console.log("AuthContext state", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
