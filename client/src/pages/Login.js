import { Button } from '../components/ButtonComponent'
import Logo from '../assets/Logo.png'
import * as Icons from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

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
        <form className='bg-white p-16 h-auto rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out w-[650px] '>
          <img src={Logo} alt='Logo' class='object-contain' />

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
                className='w-60 h-12 px-3 border rounded focus:outline-none focus:border-blue-500'
              />
            </div>
          </div>
          <Button
            property1='default'
            className='submit mt-4'
            buttonTxt='Se connecter'
            icon={Icons.ChevronRightIcon}
            src='/'
          />
        </form>
      </div>
    </>
  )
}

export default Login
