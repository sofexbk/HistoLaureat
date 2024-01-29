import React, { useState } from "react";
import Logo from '../assets/Logo.png';
import Control from "../assets/control.png";
import Chart from '../assets/Chart.png';
import { useLogout } from "../hooks/useLogout";
import { SubmitButton } from './SubmitButton'
import * as Icons from '@heroicons/react/24/solid'

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const SideBar = ({ children }) => {
  const { logout } = useLogout();
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: Chart },
    {
      title: "Déconnexion",
      onClick: logout,
      icon: <LogoutIcon />,
      style: {
        color: '#e53e3e', 
        fontWeight: 'bold', 
      },
    },
  ];

  return (
    <div className="flex h-[2000px] ">
      <div
        className={`${
          open ? "w-[240px]" : "w-[67px]"
        } bg-dark-purple p-5 pt-8 relative duration-300 flex flex-col`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full mb-2  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center mt-8 ">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open ? "rotate-[360deg]" : ""
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open ? "scale-0" : ""
            }`}
          >
          </h1>
        </div>
        <ul className="pt-6 flex-1 overflow-y-auto">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex text-white rounded-md ${open ? "py-2" : "py-0"} cursor-pointer  hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${
                index === 0 && "bg-light-white"
              }`}
              onClick={Menu.onClick}
            >
              {Menu.icon || <img src={Menu.src} alt={Menu.title} />}
              <span
                style={Menu.style}
                className={`${!open ? "hidden" : ""} origin-left duration-200 `}
              >
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-7">
        {children}
      </div>
    </div>
  );
};

export default SideBar;