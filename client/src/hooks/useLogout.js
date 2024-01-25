// useLogout.js
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/'); // Redirect to the home page or any other page after logout
  }

  return { logout };
}
