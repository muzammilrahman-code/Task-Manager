import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { BASE_URL } from '../../utils/api';


const InputData = ({InputDiv, setInputDiv, updatedData, setUpdatedData}) => {
  const [Data, setData] = useState({ title: '', desc: '' })
  const headers = {
      id: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("token")}`
    };
  const change = (e) =>{
    const {name, value} = e.target;
    setData({...Data, [name]: value});
  }

  useEffect(() =>{
      setData({ title: updatedData.title, desc: updatedData.desc });
    
  },[updatedData]);

  const handleSubmit = async() =>{
    if(Data.title === "" || Data.desc === ""){
      alert("Please fill all the fields");
      return;
    }else{
      await axios.post(`${BASE_URL}/api/v2/create-task`, Data,{
        headers
      });
      setData({ title: '', desc: '' });
      setInputDiv("hidden");
      alert("Task added successfully");
  }
}
  const UpdateTask = async() =>{
    if(Data.title === "" || Data.desc === ""){
      alert("Please fill all the fields");
      return;
    }else{
      await axios.put(`${BASE_URL}/api/v2/update-task/${updatedData.id}`, Data,{
        headers
      });
      setData({ title: '', desc: '' });
      setUpdatedData({ id: "", title: "", desc: "" });
      setInputDiv("hidden");
      alert("Task updated successfully");
  }
  }
  return (
    <>
    <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-60 h-screen w-full`}></div>
    <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className='w-3/6 bg-gray-900 p-4 rounded'>
        <div className='flex justify-end'>
          <button
            className='text-2xl mb-2 cursor-pointer'
            onClick={() => {
              setInputDiv("hidden");
              setData({ title: "", desc: "" });
              setUpdatedData({ id: "", title: "", desc: "" });
            }}
          >
            <RxCross2 />
          </button>
        </div>
        <input type="text" placeholder='Title' name='title' value={Data.title} onChange={change} className='px-3 py-2 rounded w-full bg-gray-700' />
        <textarea name="desc" placeholder='Description Details' value={Data.desc} onChange={change} className='px-3 py-2 rounded bg-gray-700 my-3 w-full' cols="30" rows="10"></textarea>
        {updatedData.id === "" ? (
          <button className='px-3 py-2 bg-blue-700 rounded text-white text-lg font-semibold cursor-pointer' onClick={handleSubmit}>Submit</button>) 
          : (<button className='px-3 py-2 bg-blue-700 rounded text-white text-lg font-semibold cursor-pointer' onClick={UpdateTask}>Update</button>
        )}
        </div>
    </div>
    </>
  );
};

export default InputData