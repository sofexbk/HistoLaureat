import React, { createContext, useEffect, useReducer } from "react";

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state,user: action.payload };
    case 'LOGOUT':
      return { user: null ,hasProfile:false};
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: { email: user.email, role: user.role, token: user.token }
      });
      dispatch({ type: 'PROFILE_STATUS', payload: user.hasProfile });
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
