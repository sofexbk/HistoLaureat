import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setMessage('')
      const response = await axios.post('api/user/forgot-password', { email });
  
      if (response.status === 200) {
        setMessage('Reset email sent successfully. Check your email for instructions.');
        setError('')
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send reset email. Please try again.');
    }finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className='bg-aliceblue-100 relative h-[1078px] flex flex-col items-center justify-center bg-gray-100 '>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-16 h-auto rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out w-[650px] '
      >
        <h3 className='text-2xl font-bold mb-10 text-[#017CC6] font-poppins '>
          Mot de passe oublié ?
        </h3>

        <div className='mb-4 flex flex-col'>
          <div className='mb-2'>
            <label htmlFor='email' className='text-gray-600 font-poppins'>
              Email:
            </label>
          </div>
          <div>
            <input
              type='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='w-60 h-12 px-3 border rounded focus:outline-none focus:border-blue-500'
            />
          </div>
        </div>

        <button
          type='submit'
          className='text-blue-500 border border-solid border-blue-500 bg-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:border-blue-700'
        >
          {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
          
        </button>

        {message && <div className='text-green-500 mt-4'>{message}</div>}
        {error && <div className='text-red-500 mt-4'>{error}</div>}
      </form>
    </div>
  );
}

export default ForgotPassword;