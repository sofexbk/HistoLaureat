import React, { useState, useEffect } from 'react';
import profilePic from '../assets/profilepic.png'
import Logo from '../assets/Logo.png'
import { useLogout } from '../hooks/useLogout'
import { ButtonIcon } from './ButtonIcon'
import { DeconnexionBtn } from './DeconnexionBtn'
import { Button } from './ButtonComponent'
import * as Icons from '@heroicons/react/24/solid'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'


export const Navbar = () => {
  const { user,dispatch,hasProfile } = useAuthContext();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [photo, setPhoto] = useState(null);
  const { logout } = useLogout();
  const [searchInput, setSearchInput] = useState('');
  const fetchUserProfile = async () => {
    try {
      if (user && user.token) {
        const id = jwtDecode(user.token)._id;
        const response = await axios.get(`/api/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(response.data.profile);

        dispatch({
          type: 'PROFILE_STATUS',
          payload: response.data.profile ? true : false,
        });
        if (response.data.profile) {
          setUserName(response.data.profile.firstName);
          setPhoto(response.data.profile.image);
          setUserRole(user.role);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  const handleLogoutClick = () => {
    logout();
  };
  useEffect(() => {
    fetchUserProfile();
  }, [user?.token]);
  
  


  return (
    <>
      <div className='relative w-full flex bg-aliceblue-100 flex-row flex-wrap items-center justify-between py-[12px] px-[60px] box-border gap-[40px] text-left text-[20px] text-black font-poppins'>
        <img src={Logo} alt='Logo' className='object-contain h-28 w-24' />
        {user && hasProfile  ? (
          <>
            <ButtonIcon //home
              property1='default'
              className='submit'
              icon={Icons.HomeIcon}
              src='/landing'
            />
            <Button // ajouter post
              property1='default'
              className='submit'
              buttonTxt='Post'
              icon={Icons.PlusIcon}
              src='/create-post'
            />
           {userRole === 'laureat' && (
              <Button // proposer stage
                property1='default'
                className='submit'
                buttonTxt='Stage'
                icon={Icons.PlusIcon}
                src='/create-stage'
              />
            )}

            <div className='relative rounded-xl box-border border-[#017cc5] w-[485.14px] h-[60px] overflow-hidden shrink-0 min-w-[300px] max-w-[700px] border-[1px]  border-solid border-dimgray'>
              <input
                type='text'
                id='recherche'
                name='recherche'
                placeholder='Search a post'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='w-full h-full px-2 appearance-none bg-transparent border-none text-lg'
              />
            </div>

            <div className=' shrink-0 flex flex-row items-center justify-center gap-[11px]'>
              <div className='relative w-[75.05px] h-[65px]'>
                {photo &&
                  <img
                    className='absolute top-[0px] left-[0px] rounded-[10px] w-[65.86px] h-[65px] object-cover'
                    alt='userPic'
                    src={photo}  
                  />
                }
                <span className='relative flex h-3 w-3 top-[0px] left-[59.86px]'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-mediumseagreen opacity-100'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-mediumseagreen'></span>
                </span>
              </div>
              <div className='shrink-0 flex flex-col items-start justify-start gap-[8px]'>
                <b className='relative'>{userName}</b>
                <div className='relative text-[17px] font-light text-darkgray'>
                  {userRole}
                </div>
              </div>
              <DeconnexionBtn 
              onClick={handleLogoutClick}
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
/*
          <ButtonIcon //mon profile
              property1='default'
              className='submit'
              icon={Icons.UserCircleIcon}
              src='/mon-profile'
            />*/