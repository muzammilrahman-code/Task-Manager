import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { BASE_URL } from '../../utils/api';

const Cards = ({home, setInputDiv, data, setUpdatedData}) => {
    const headers = {
      id: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("token")}`
    };
    const handleCompleteTask = async(id) => {
        try {
            await axios.put(`${BASE_URL}/api/v2/update-complete-task/${id}`,
                {},
                {headers}
            )
            alert("task status updated successfully"); 
        } catch (error) {
            console.log(error);   
        }
    }
    const handleImportant = async(id) => {
        try {
            const response = await axios.put(`${BASE_URL}/api/v2/update-imp-task/${id}`,
                {},
                {headers}
            )
            alert("task importance mark successfully"); 
        } catch (error) {
            console.log(error);   
        }
    }
    const handleDeleteTask = async(id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/v2/delete-task/${id}`,
                {headers}
            )
            alert("task deleted successfully"); 
        } catch (error) {
            console.log(error);   
        }
    }
    const handleUpdate = (id, title, desc) => {
        setInputDiv("fixed");
        setUpdatedData({id:id, title:title, desc:desc});
    }
    
  return (
    <div className='grid grid-cols-3 p-4 gap-4'>
        {data && data.map((item, i) =>(
            <div key={i} className='flex flex-col justify-between bg-gray-800 rounded-md p-4'>
            <div >
                <h3 className='text-xl font-semibold'>{item.title}</h3>
                <p className='text-gray-300 my-3'>{item.desc}</p>
            </div>
            <div className='mt-4 w-full flex items-center'>
                    <button className={`${item.complete === false ? "bg-red-500" : "bg-green-700"} cursor-pointer p-2 rounded w-3/6`} onClick={() => handleCompleteTask(item._id)} >{item.complete === true ? "Complete" : "Incomplete"}</button>
                    <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around '>
                        <button onClick={() => handleImportant(item._id)} className='cursor-pointer'>
                            {item.important === false ? (<CiHeart /> ):(<FaHeart className='text-red-600' />)}
                        </button>
                        {home !== "false" && (<button className='cursor-pointer'>
                            <FaEdit onClick={() => handleUpdate(item._id, item.title, item.desc)}  />
                        </button>)}
                        <button className='cursor-pointer'>
                            <MdDelete onClick={() => handleDeleteTask(item._id)} />
                        </button>
                    </div>
            </div>
            </div>
        ))}
        {home === "true" &&
            <div className='flex flex-col justify-center items-center bg-gray-800 rounded-md p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transform-all duration-300' onClick={()=> setInputDiv("fixed")}>
                <IoAddCircleSharp className='text-4xl'/>
                <h2 className='text-2xl  mt-4'>Add Task</h2>
            </div>
        }
    </div>
  )
}

export default Cards