"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Menu {
  title: string;
  src: string;
  path: string;
  gap?: boolean;
}

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<string>('/application'); 

  // // eslint-disable-next-line react-hooks/exhaustive-deps
// useEffect(()=>{
//   console.log(window.location.pathname );
//   setSelectedMenu(window.location.pathname);
// },[window.location.pathname ])

useEffect(()=>{
  console.log(window.location.pathname );
  setSelectedMenu(window.location.pathname);
},[])
  const Menus: Menu[] = [
    { title: 'Application', src: 'Chart_fill', path: '/application' },
    { title: 'District', src: 'Chat', path: '/district' },
    { title: 'Region', src: 'folder', path: '/region' },
    { title: 'Store ', src: 'Calendar',  path: '/store' },
    { title: 'Application Role ', src: 'Calendar',  path: '/applicationrole' },
    { title: 'Application Device ', src: 'Calendar',  path: '/applicationdevice' },
  ];

  return (
    <>
    <div
      className={` ${
        open ? 'w-72' : 'w-20'
      } bg-blue-700 h-screen p-5  pt-8 relative duration-300 mr-3`}
    >
      <img alt="control"
        src="/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full  ${!open && 'rotate-180'}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center ">
        <img alt="DG_Logo"
          src="/assets/DG_Logo.png"
          className={` w-10 cursor-pointer duration-500 `}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200  ${
            !open && 'scale-0'
          }`}
        >
          Config
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li key={index}>
            <Link
              href={Menu.path}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'}                             
              ${selectedMenu === Menu.path ? 'bg-white' : 'bg-transparent'}`}
              onClick={() => setSelectedMenu(Menu.path)}
              
            >

              <img alt={Menu.src} src={`/assets/${Menu.src}.png`} />
              <span className={`${!open && 'hidden'} origin-left duration-200  ${selectedMenu == Menu.path ? 'text-blue-700 font-bold' : ''}`}>
                {Menu.title}
              </span>
            </Link>
          {/* 
            <Link
              href={Menu.path}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'}               
              ${window.location.pathname == Menu.path ? 'bg-white' : 'bg-transparent'}` }                           
            >
              <img src={`/assets/${Menu.src}.png`} />
              <span className={`${!open && 'hidden'} origin-left duration-200  ${window.location.pathname == Menu.path ? 'text-blue-700 font-bold' : ''}`}>
                {Menu.title}
              </span>
            </Link>
             */}
           
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Sidebar;

