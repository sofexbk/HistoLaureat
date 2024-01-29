import { Button } from '../components/ButtonComponent'
import { SubmitButton } from '../components/SubmitButton'
import Logo from '../assets/Logo.png'
import * as Icons from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom';

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { Login, error, isLoading } = useLogin()

  const handleSubmit = async e => {
    e.preventDefault()
    await Login(email, password)
  }

  return (
    <>
      <div className='bg-aliceblue-100 relative h-[1078px] flex flex-col items-center justify-center bg-gray-100 '>
        <form onSubmit={handleSubmit} className='bg-white p-16 h-auto rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out w-[650px] '>
          <img src={Logo} alt='Logo' className='object-contain' />

          <h3 className='text-2xl font-bold mb-10 text-[#017CC6] font-poppins '>
            Connecter votre compte Histolauréat avec
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

          <div className='mb-6 flex flex-col'>
            <div className='mb-2'>
              <label htmlFor='password' className='text-gray-600 font-poppins'>
                Mot de passe:
              </label>
            </div>
            <div>
              <input
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='w-60 h-12 px-3 border rounded focus:outline-none focus:border-blue-500'
              />
            </div>
          </div>
          <div className='mb-4'>
            <Link to='/forgot-password' className='text-blue-500 hover:underline'>
              Mot de passe oublié ?
            </Link>
          </div>

          <SubmitButton // ajouter post
              property1='default'
              className='submit'
              buttonTxt='Connexion'
              icon={Icons.ArrowRightIcon}
              onclick={handleSubmit}
              disabled={isLoading}
            />

          {error && <div className="text-red-500 mt-4">{error}</div>}
        </form>
        
      </div>
    </>
  )

}

export default Login
