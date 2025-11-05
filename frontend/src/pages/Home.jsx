import React from 'react'
import Sidebar from '../components/Home/sidebar'
import Navbar from '../components/Home/Navbar'
import { Outlet } from 'react-router-dom';
const Home = () => {
  return (
    <>
    <div><Navbar /></div>
    <div className='flex gap-4 pt-15  px-4 pb-4 min-h-screen text-white'>
        <div className='w-1/6 border border-gray-500 flex flex-col justify-between rounded-xl p-4'><Sidebar /></div>
        <div className='w-5/6 border border-gray-500 rounded-xl p-4'><Outlet /></div>
    </div>
    </>
  )
}

export default Home