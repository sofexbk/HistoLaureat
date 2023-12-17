import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const checkProfile = async (data) => {
    try {
      const id = jwtDecode(data.token)._id;
      const response = await axios.get(`/api/profile/${id}/profile`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      return response;
    } catch (error) {
      console.log(error.data);
    }
  };

  const Login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const requestData = { email, password };

    try {
      const response = await axios.post("/api/user/login", requestData);
      const { data } = response;
      console.log(data);
      dispatch({ type: "LOGIN", payload: data });
      
      // Check profile status after a successful login
      const profileResponse = await checkProfile(data);
      const hasProfile = profileResponse.data.hasProfile;
      
      // Update the context with the profile status
      dispatch({ type: "PROFILE_STATUS", payload: hasProfile });
      localStorage.setItem("user", JSON.stringify({...data,hasProfile}));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return { Login, isLoading, error };
};
