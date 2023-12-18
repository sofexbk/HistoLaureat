import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { Login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Login(email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h3 className="text-2xl font-bold mb-6">Connexion</h3>
        
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-600">Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full h-12 px-3 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="text-gray-600">Mot de passe:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full h-12 px-3 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Valider
        </button>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
