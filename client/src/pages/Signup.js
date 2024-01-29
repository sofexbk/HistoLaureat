import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { SubmitButton } from '../components/SubmitButton'
import * as Icons from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo1.png'
import { Button } from '../components/ButtonComponent'
import Swal from 'sweetalert2';

function Signup () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { Signup: handleSignup, isLoading } = useSignup()

  const Navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Les mots de passe ne correspondent pas',
      });
      return;
    }
    try {
      await handleSignup(email, password, confirmPassword, role);
      Swal.fire({
        icon: 'success',
        title: 'Signup Successful',
        text: 'You have successfully signed up!',
      });
      //console.log('fdf',role)
      if (role === 'etudiant') {
        Navigate('/check');
      } else {
        Navigate('/create-profile');
      }
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className='bg-aliceblue-100 relative  bg-aliceblue w-full h-[1117px] overflow-hidden flex flex-col items-center justify-center  px-[20%] box-border min-w-[1080px] text-center text-[32px] text-white font-poppins'>
      <div className='self-stretch flex flex-col items-center justify-center'>
        <div className='self-stretch rounded-t-3xl rounded-b-none [background:linear-gradient(91.7deg,_#017cc5,_#8248f5)] shadow-[4px_4px_27.8px_rgba(102,_102,_102,_0.47)] flex flex-row flex-wrap items-center justify-center py-[9px] px-0 gap-[46px]'>
          <img
            className='relative w-[175px] h-[114px] object-cover'
            alt=''
            src={Logo}
          />
          <div className='relative font-extrabold flex items-center justify-center w-[215px] h-12 shrink-0'>
            HistoLauréat
          </div>
        </div>
        <div className='self-stretch rounded-t-none rounded-b-3xl bg-white shadow-[2px_4px_39.5px_rgba(1,_124,_197,_0.1)] flex flex-col items-center justify-start py-[34px] px-[51px] gap-[19px] text-5xl text-steelblue'>
          <div className='relative font-extrabold flex items-center justify-center w-[658px]'>
            Créer votre compte HistoLauréat
          </div>
          <div className='self-stretch flex flex-col items-center justify-center text-left text-base text-dimgray-100'>
            <div className='mt-[-68px] self-stretch rounded-3xl bg-white h-[683px] flex flex-col items-start justify-start p-6 box-border gap-[30px]'>
              <div className='self-stretch flex flex-row items-start justify-center gap-[6px] text-center text-xs text-white font-avenir'>
                <div className='shrink-0 flex flex-col items-center justify-center gap-[8px]'>
                  <div className='relative w-5 h-5'>
                    <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5' />
                    <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                      1
                    </div>
                  </div>
                  <i className='relative text-base font-light font-poppins text-darkslategray'>
                    L’essentiel
                  </i>
                </div>
                <div className='relative bg-darkslategray w-[232px] h-px opacity-[0.35]' />
                <div className='shrink-0 flex flex-col items-center justify-center gap-[8px] opacity-[0.35]'>
                  <div className='relative w-5 h-5'>
                    <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5' />
                    <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                      2
                    </div>
                  </div>
                  <i className='relative text-base font-light font-poppins text-darkslategray'>
                    Profil
                  </i>
                </div>
                <div className='relative bg-darkslategray w-[232px] h-px opacity-[0.35]' />
                <div className='shrink-0 flex flex-col items-center justify-center gap-[8px] opacity-[0.35]'>
                  <div className='relative w-5 h-5'>
                    <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5' />
                    <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                      3
                    </div>
                  </div>
                  <i className='relative text-base font-light font-poppins text-darkslategray'>
                    Prêt
                  </i>
                </div>
              </div>
              <div className='self-stretch flex flex-col items-start justify-center gap-[8px] text-white'>
                <div className='flex flex-row items-center justify-start gap-[12px] text-center text-xs font-avenir'>
                  <div className='relative w-6 h-6'>
                    <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-6 h-6' />
                    <div className='absolute top-[4.2px] left-[8.4px] flex items-center justify-center w-[6.67px] h-[14.67px]'>
                      1
                    </div>
                  </div>
                  <i className='relative text-5xl font-poppins text-darkslategray'>
                    L’essentiel
                  </i>
                </div>
                <i className='self-stretch relative font-light text-dimgray-100'>
                  Veuillez renseigner les informations de base de votre compte.
                  Des champs supplémentaires seront requis après votre
                  connexion.
                </i>
                <i className='self-stretch relative text-gray'>
                  *Tous les champs sont obligatoires sauf indication contraire.
                </i>
              </div>
              <div className='self-stretch flex flex-col items-start justify-start gap-[4px]'>
                <div className='self-stretch relative h-[27px]'>
                  <label htmlFor='prenom' className='top-0 left-0'>
                    Email
                  </label>
                </div>
                <div className='self-stretch relative rounded-xl box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
                  <input
                    required={true}
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className='w-full h-full px-6 appearance-none text-base bg-transparent border-none'
                  />
                </div>
              </div>
              <div className='flex flex-col items-start justify-start gap-[6px] text-sm'>
                <i className='relative'>Sélectionner votre rôle</i>
                <div className='shrink-0 flex flex-row items-start justify-start gap-[32px] text-base text-gray'>
                  <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
                    <input
                      type='radio'
                      id='Etudiant'
                      name='options'
                      onChange={(e) => setRole(e.target.value)}
                      value='etudiant'
                      className='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
                    />
                    <label htmlFor='Etudiant' className='relative cursor-pointer'>
                      Étudiant
                    </label>
                  </div>
                  <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
                    <input
                      type='radio'
                      id='laureat'
                      name='options'
                      onChange={(e) => setRole(e.target.value)}
                      value='laureat'
                      className='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
                    />
                    <label htmlFor='Etudiant' className='relative cursor-pointer'>
                      Laureat
                    </label>
                  </div>
                </div>
              </div>
              <div className='self-stretch flex flex-col items-start justify-start gap-[8px]'>
                <div className='self-stretch flex flex-row items-start justify-start gap-[16px]'>
                  <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
                    <div className='self-stretch relative h-[27px]'>
                      <i className='absolute top-[0px] left-[0px]'>
                        Mot de passe
                      </i>
                      <div className='absolute top-[0px] right-[8.36px] w-[73px] h-[27px] hidden text-right text-lg text-dimgray-200'>
                        <img
                          className='absolute top-[3px] right-[49px] w-6 h-6 overflow-hidden object-cover'
                          alt=''
                          //src='/icon@2x.png'
                        />
                        <i className='absolute top-[0px] right-[0px]'>Hide</i>
                      </div>
                    </div>
                    <div className='self-stretch relative rounded-xl box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
                      <div className='absolute top-[15px] left-[24px] hidden flex-row items-center justify-start'>
                        <div className='relative bg-gray w-px h-6 hidden' />
                      </div>
                      <input
                        type='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        name='password'
                        className='w-full h-full px-6 appearance-none text-base bg-transparent border-none'
                      />
                    </div>
                  </div>
                  <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
                    <div className='self-stretch relative h-[27px]'>
                      <i className='absolute top-[0px] left-[0px]'>
                        <p className='m-0'>Confirmation</p>
                      </i>
                      <div className='absolute top-[0px] right-[8.36px] w-[73px] h-[27px] hidden text-right text-lg text-dimgray-200'></div>
                    </div>
                    <div className='self-stretch relative rounded-xl box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
                      <div className='absolute top-[15px] left-[24px] hidden flex-row items-center justify-start'>
                        <div className='relative bg-gray w-px h-6 hidden' />
                      </div>
                      <input
                        required={true}
                        type="password"
                        id="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='w-full h-full px-6 appearance-none text-base bg-transparent border-none'
                      />
                    </div>
                  </div>
                </div>
                <i className='self-stretch relative'>
                  Utilisez 8 caractères ou plus avec un mélange de lettres, de
                  chiffres et de symboles.
                </i>
              </div>
            </div>
            <SubmitButton 
              property1='default'
              className='submit'
              buttonTxt='Valider'
              icon={Icons.ArrowRightIcon}
              onclick={handleSubmit}
              disabled={isLoading}
            />
            {error && (
          <div className="text-red-500 mt-4">
           {error ? error : "An error occurred"}
         </div>
      )}          </div>
        </div>
      </div>
    </form>
    </>
  )
}

export default Signup
