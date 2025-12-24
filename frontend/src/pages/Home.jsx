import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import Navbar from '../components/Home/Navbar'
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* NAVBAR ALWAYS FIXED */}
      <Navbar />

      {/* Add top padding to avoid overlap */}
      <div className="flex min-h-screen pt-16">

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <div className="flex-1 border border-gray-500 rounded-xl p-4 m-4 ml-0 md:ml-4">
          <Outlet />
        </div>

      </div>
    </>
  )
}

export default Home












