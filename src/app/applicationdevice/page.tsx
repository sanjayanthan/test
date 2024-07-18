"use client"
import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import {data} from '../../helpers/application'
import Table from '../../components/Table'
import Header from '../../components/Header'

const Application = () => {
    useEffect(()=>{
        console.log(data);
      })
      return (
        <div className='flex'>
          {" "}
            <Sidebar />{" "}
            <div className='p-2 w-full h-full overflow-x-auto'>   
            <Header/>
            <label className=" text-xl font-semibold text-gray-700 dark:text-gray-200 text-center flex justify-center items-center">Application Device Configuration</label>
            <p className='left-10 h-72 flex justify-center items-center flex-grow'> Under construction</p>
               
            </div>
        </div>
      )
}

export default Application

