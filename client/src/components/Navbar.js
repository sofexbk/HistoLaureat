import React from 'react'
import profilePic from '../assets/profilepic.png'
import Logo from '../assets/Logo.png'
import { useLogout } from '../hooks/useLogout'
import { ButtonIcon } from '../components/ButtonIcon'
import { DeconnexionBtn } from '../components/DeconnexionBtn'
import { Button } from '../components/ButtonComponent'
import * as Icons from '@heroicons/react/24/solid'

export const Navbar = ({
  // valeurs par default si il ya pas de valeurs
  userName = "Nom d'utilisateur",
  userRole = 'Étudiant',
  connexion = false, // true connected // false not connected
  className
}) => {
  return (
    <>
      <div className='relative w-full flex bg-aliceblue-100 flex-row flex-wrap items-center justify-between pt-[12px] px-[60px] box-border gap-[40px] text-left text-[20px] text-black font-poppins'>
      <a href="/" target="_self" rel="noopener noreferrer">
      <img src={Logo} alt='Logo' className='object-contain h-28 w-24' />
    </a>
        {connexion ? (
          <>
            <ButtonIcon //home
              property1='default'
              className='submit'
              icon={Icons.HomeIcon}
              src='/landing'
            />

            <ButtonIcon //mon profile
              property1='default'
              className='submit'
              icon={Icons.UserCircleIcon}
              src='/mon-profile'
            />
            <Button // ajouter post
              property1='default'
              className='submit'
              buttonTxt='Post'
              icon={Icons.PlusIcon}
              src='/new-post'
            />
            <Button // proposer stage
              property1='default'
              className='submit'
              buttonTxt='Stage'
              icon={Icons.PlusIcon}
              src='/new-stage'
            />

            <div className='relative rounded-xl box-border border-[#017cc5] w-[485.14px] h-[60px] overflow-hidden shrink-0 min-w-[300px] max-w-[700px] border-[1px]  border-solid border-dimgray'>
              <input
                type='text'
                id='recherche'
                name='recherche'
                class='w-full h-full px-2 appearance-none bg-transparent border-none text-lg'
              />
            </div>

            <div className=' shrink-0 flex flex-row items-center justify-center gap-[11px]'>
              <div className='relative w-[75.05px] h-[65px]'>
                <img
                  className='absolute top-[0px] left-[0px] rounded-[10px] w-[65.86px] h-[65px] object-cover'
                  alt='userPic'
                  src={profilePic}
                />
                <span class='relative flex h-3 w-3 top-[0px] left-[59.86px]'>
                  <span class='animate-ping absolute inline-flex h-full w-full rounded-full bg-mediumseagreen opacity-100'></span>
                  <span class='relative inline-flex rounded-full h-3 w-3 bg-mediumseagreen'></span>
                </span>
              </div>
              <div className='shrink-0 flex flex-col items-start justify-start gap-[8px]'>
                <b className='relative'>{userName}</b>
                <div className='relative text-[17px] font-light text-darkgray'>
                  {userRole}
                </div>
              </div>
              <DeconnexionBtn //deconnexion
                property1='default'
                className='ml-3'
                icon={Icons.ArrowRightStartOnRectangleIcon}
                src='/'
              />
            </div>
          </>
        ) : (
          // if not connected
          <>
            <div className='space-x-10'>
              <Button // connexion
                property1='default'
                className='submit'
                buttonTxt='Connexion'
                icon={Icons.ChevronDoubleRightIcon}
                src='/login'
              />
              <Button // inscription
                property1='default'
                className='submit'
                buttonTxt='Inscription'
                icon={Icons.UserPlusIcon}
                src='/signup'
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Navbar
