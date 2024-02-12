import React, { useState, useEffect  } from 'react'
import Logo from '../assets/LogoWhite.png'
import Control from '../assets/control.png'
import Chart from '../assets/Chart.png'
import { useLogout } from '../hooks/useLogout'
import { SubmitButton } from './SubmitButton'
import * as Icons from '@heroicons/react/24/solid'

const LogoutIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15 19l-7-7 7-7'
    />
  </svg>
)
const CommentIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    className='w-6 h-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
    />
  </svg>
)
const PostsIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    className='w-6 h-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
    />
  </svg>
)
const ProfileIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    className='w-6 h-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
    />
  </svg>
)
const LaureatIcon = () => (
    <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6 text-white'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    ></path>
  </svg>
)
const BanIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 64 64"
  >
    <path
      fill="#ffff"
      d="M40 32l20-20c1.332-1.332 1.332-3.488 0-4.82-1.332-1.332-3.488-1.332-4.82 0L35.18 27.18 14.362 6.362c-1.332-1.332-3.488-1.332-4.82 0-1.332 1.332-1.332 3.488 0 4.82l20 20-20 20c-1.332 1.332-1.332 3.488 0 4.82.66.664 1.524.996 2.39.996s1.73-.332 2.39-.996l20-20 20 20c.66.664 1.524.996 2.39.996s1.73-.332 2.39-.996c1.332-1.332 1.332-3.488 0-4.82L40 32z"
    />
  </svg>
);


const SideBar = ({ children, onStateBtnChange }) => {
  const { logout } = useLogout();

  const [stateBtn, setStateBtn] = useState('');

  const handleItemClick = itemName => {
    setStateBtn(itemName);
  };

  useEffect(() => {
    onStateBtnChange(stateBtn);
  }, [stateBtn, onStateBtnChange]);

  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: 'Dashboard',
      src: Chart,
      onClick: () => handleItemClick('Dashboard'),
    },
    {
      title: 'Profiles',
      icon: <ProfileIcon />,
      onClick: () => handleItemClick('Profiles'),
    },
    {
      title: 'Postes',
      icon: <PostsIcon />,
      onClick: () => handleItemClick('Postes'),
    },
    {
      title: 'Stages',
      icon: <CommentIcon />,
      onClick: () => handleItemClick('Stages'),
    },
    {
      title: 'Suivi des lauréats', 
      icon: <LaureatIcon />, 
      onClick: () => handleItemClick('Laureat'), 
    },
    {
      title: 'Bloquer les utilisateurs', 
      icon: <BanIcon />, 
      onClick: () => handleItemClick('Utilisateurs'), 
    },
    {
      title: 'Déconnexion',
      onClick: logout,
      icon: <LogoutIcon />,
      style: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
    },
  ];

  return (
    <div className='flex h-[2000px] font-poppins '>
      <div
        className={`${
          open ? 'w-[240px]' : 'w-[67px]'
        } bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-800 p-5 pt-8 relative duration-300 flex flex-col`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full mb-2  ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
        <div className='flex gap-x-4 items-center mt-8 '>
          <img
            src={Logo}
            className={`h-16 cursor-pointer duration-500  ${
              open ? 'rotate-[360deg]' : ''
            }`}
          />

          <span
            className={`${
              !open ? 'hidden' : 'font-poppins text-white text-2xl font-bold'
            } `}
          >
            HisoLauréat
          </span>

          <h1
            className={`text-white origin-left font-medium text-xl duration-200  ${
              !open ? 'scale-0' : ''
            }`}
          ></h1>
        </div>
        <ul className='pt-6 flex-1  pl-0 '>
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`  cursor-pointer bg-slate-100 bg-opacity-20 font-bold flex pl-5 text-white rounded-lg ${
                open ? 'py-3 px-0' : 'py-3'
              }   hover:bg-stone-700  text-sm items-center gap-2  ${
                Menu.gap ? 'mt-9' : 'mt-2'
              } ${index === 0 && 'bg-slate-500 '}`}
              onClick={Menu.onClick}
            >
              {Menu.icon || <img src={Menu.src} alt={Menu.title} />}
              <span
                style={Menu.style}
                className={`${!open ? 'hidden' : ''} origin-left duration-200 `}
              >
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex-1 p-7'>{children}</div>
    </div>
  );
};

export default SideBar;
