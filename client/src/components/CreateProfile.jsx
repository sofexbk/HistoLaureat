import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateProfile() {
  const handleLocalStorage=()=>{
    localStorage.removeItem('signupSuccess');
  }

  const {navigate}=useNavigate();

useEffect(() => {
  const signupSuccess = localStorage.getItem('signupSuccess');

  if (signupSuccess !== 'true') {
    navigate('/home');
  }
}, [navigate]);

  return (
    <button onClick={handleLocalStorage}>remove LocalStorage</button>
  )
}

export default CreateProfile