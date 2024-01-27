import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(`/api/user/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });

      if (response.status === 200) {
        const data = response.data;
        setSuccessMessage(data.message);
        setErrorMessage('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const data = response.data;
        setErrorMessage(data.error);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setErrorMessage('Failed to reset password. Please try again.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className='bg-aliceblue-100 relative h-screen flex flex-col items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 h-auto rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out max-w-md'
      >
        <h3 className='text-2xl font-bold mb-6 text-[#017CC6] font-poppins'>
          Réinitialisation du Mot de Passe
        </h3>

        <div className='mb-4 flex flex-col'>
          <label htmlFor='newPassword' className='text-gray-600 font-poppins mb-2'>
            Nouveau Mot de Passe:
          </label>
          <input
            type='password'
            id='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='w-full h-12 px-3 border rounded focus:outline-none focus:border-blue-500'
            required
          />
        </div>

        <div className='mb-4 flex flex-col'>
          <label htmlFor='confirmPassword' className='text-gray-600 font-poppins mb-2'>
            Confirmer le Nouveau Mot de Passe:
          </label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full h-12 px-3 border rounded focus:outline-none focus:border-blue-500'
            required
          />
        </div>

        <button
          type='submit'
          className='text-white bg-blue-500 border border-solid border-blue-500 px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700'
        >
          {isLoading ? 'Réinitialisation en cours...' : 'Réinitialiser le Mot de Passe'}
        </button>

        {successMessage && <div className='text-green-500 mt-4'>{successMessage}</div>}
        {errorMessage && <div className='text-red-500 mt-4'>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default ResetPasswordForm;
