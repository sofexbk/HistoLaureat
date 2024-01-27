import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from '../hooks/useAuthContext'

const UpdateProfile = () => {
  const {user}=useAuthContext();
  const navigate = useNavigate();  // Initialize useNavigate
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log("fdd",formData)
        console.log("mee",user)
      const response = await axios.patch('/api/profile/updateProfile', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Make sure to define user or get it from somewhere
        },
      });

      // Handle success, e.g., show a success message
      console.log('Profile updated successfully:', response.data);

      // Navigate to the landing page after successful update
      navigate('/landing');
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error updating profile:', error.message);
    }
  };
  return (
    <div className="relative bg-aliceblue-100 w-full h-[1000px] min-w-[400px] flex flex-col items-center justify-start py-[60px] px-10 box-border gap-[40px] text-left text-black font-poppins">
      <div className="self-stretch relative text-[40px] font-extrabold text-steelblue-200">
        Update Profile
      </div>
      <form onSubmit={handleFormSubmit} className="w-full rounded-3xl bg-white flex flex-col items-start justify-center py-[30px] px-10 box-border gap-[20px] max-w-[400px] text-base">
      <label htmlFor="lastName" className="self-stretch relative h-[27px] text-black">
          Profile Picture:
        </label>
        <div className="self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400">
        <input
       type='file'
        id='image'
        name='image'
        accept='image/*'
        className='w-full h-full px-6 appearance-none bg-transparent border-none'
          />
        </div>
        <label htmlFor="firstName" className="self-stretch relative h-[27px] text-black">
          First Name:
        </label>
        <div className="self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full h-full px-6 appearance-none bg-transparent border-none"
          />
        </div>
        <label htmlFor="lastName" className="self-stretch relative h-[27px] text-black">
          Last Name:
        </label>
        <div className="self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400">
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full h-full px-6 appearance-none bg-transparent border-none"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
  
};
export default UpdateProfile;