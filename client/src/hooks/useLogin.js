import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Importer useNavigate depuis react-router-dom

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate(); // Initialiser useNavigate

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
    try {
      const response = await axios.post("/api/user/login", { email, password });
      const { data } = response;
      console.log(data);

      dispatch({ type: "LOGIN", payload: data });

      const profileResponse = await checkProfile(data);
      const hasProfile = profileResponse.data.hasProfile;

      dispatch({ type: "PROFILE_STATUS", payload: hasProfile });
      localStorage.setItem("user", JSON.stringify({ ...data, hasProfile }));

      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in!",
      });

      // Rediriger en fonction du rôle de l'utilisateur
      if (data.role === "admin") {
        navigate("/admin-panel");
      
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.error || "An error occurred during login.",
      });
    }
  };

  return { Login, isLoading };
};
