import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const Login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const requestData = { email, password };

    try {
      const response = await axios.post('/api/user/login',requestData);
      const { data } = response;
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      setIsLoading(false);
    } catch (error) {
      console.log('Signup error:', error);
      setIsLoading(false);
      setError('Failed to login');
    }
};

return { Login, isLoading, error };
};
