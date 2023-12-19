import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { images } from '../constants';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { Login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Login(email, password);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-16 rounded-lg shadow-md w-[650px] relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="absolute top-4 left-4 text-purple-500"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.03261 13.5016C6.66666 14.2972 6.66666 15.2024 6.66666 17.0127V22.6666C6.66666 25.1807 6.66666 26.4378 7.44771 27.2189C8.19345 27.9646 9.37316 27.9983 11.6667 27.9998V21.3333C11.6667 20.0447 12.7113 19 14 19H18C19.2887 19 20.3333 20.0447 20.3333 21.3333V27.9998C22.6268 27.9983 23.8065 27.9646 24.5523 27.2189C25.3333 26.4378 25.3333 25.1807 25.3333 22.6666V17.0127C25.3333 15.2024 25.3333 14.2972 24.9674 13.5016C24.6014 12.7059 23.9142 12.1168 22.5397 10.9387L21.2063 9.79582C18.7219 7.66631 17.4797 6.60156 16 6.60156C14.5203 6.60156 13.2781 7.66632 10.7937 9.79582L9.46033 10.9387C8.08582 12.1168 7.39856 12.7059 7.03261 13.5016ZM18.3333 27.9999V21.3333C18.3333 21.1492 18.1841 21 18 21H14C13.8159 21 13.6667 21.1492 13.6667 21.3333V27.9999H18.3333Z"
            fill="#8248F5"
          />
        </svg>

        <img src={images.Logo} alt="Logo" className="mb-6 mx-auto" />

        <h3
          className="text-2xl font-bold mb-6"
          style={{
            color: '#017CC6',
            textAlign: 'center',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
          }}
        >
          Connecter votre compte Histolauréat avec
        </h3>

        <div className="mb-4 flex flex-col">
          <div>
            <label htmlFor="email" className="text-gray-600">
              Email:
            </label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-60 h-12 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-col">
          <div>
            <label htmlFor="password" className="text-gray-600">
              Mot de passe:
            </label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-60 h-12 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="text-blue-500 border border-solid border-blue-500 bg-white text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:border-blue-700"
        >
          Connexion
        </button>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>

      <div className="mt-8 text-gray-500 flex justify-center">
        <span className="mx-4">À propos</span>
        <span className="mx-4">Page d’accueil</span>
        <span className="mx-4">Créer un compte</span>
      </div>
    </div>
  );
}

export default Login;
