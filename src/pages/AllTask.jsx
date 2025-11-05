import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from '../components/Home/InputData';
import axios from 'axios';
import { BASE_URL } from '../../utils/api';

const AllTAsk = () => {
  const [InputDiv, setInputDiv] = useState("hidden")
  const [updatedData, setUpdatedData] = useState({id:"", title:"", desc:""});
    const [Data, setData] = useState()
  const headers = {
      id: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("token")}`
    };
  
    useEffect(() =>{
      const fetch = async() =>{
      const response = await axios.get(`${BASE_URL}/api/v2/get-all-task`, 
        { headers }
    );
      setData(response.data.data);
    }
    if(localStorage.getItem("id") && localStorage.getItem("token")){
    fetch();
    }
    },[])
  return (
    <>
    <div>
      <div className='w-full flex justify-end px-4 py-1 '>
        <h3 className='flex items-center text-lg bg-gray-700 px-2 text-gray-400 hover:text-gray-100 transition-all duration-300 py-1 gap-2 cursor-pointer rounded-md' onClick={()=>setInputDiv("fixed")}>Add Task
        <button> <IoAddCircleSharp className='text-3xl  cursor-pointer'/></button>
        </h3>
      </div>
      {Data && (<Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData} />)}
    </div>
    <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setUpdatedData={setUpdatedData} />
    </>
  )
}

export default AllTAsk