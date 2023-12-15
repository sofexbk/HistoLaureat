import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const Signup = async (email, password, confirmPassword, role) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/user/signup',{ email, password, confirmPassword, role });
      const { data } = response;
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      setIsLoading(false);
    } catch (error) {
      console.log('Signup error:', error.response.data);
      setIsLoading(false);
      setError('Failed to sign up');
    }
};

return { Signup, isLoading, error };
};
