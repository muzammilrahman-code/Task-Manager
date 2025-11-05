import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {authAction} from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/api';

const Login = () => {
   const [data, setData] = useState({ username: "", password: "" });
    const history = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if(isLoggedIn === true){
         history("/");
    }
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // always prevent default form reload first

      if (data.username === "" || data.password === "") {
        alert("Please fill all the fields");
        return;
      }
  
      try {
        const response = await axios.post(`${BASE_URL}/api/v1/login`, data);
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authAction.login());
        history("/");        
       // alert("login successful!");
      } catch (error) {
        alert(error.response.data.message);
      }
    };
  
  return (
    <div className='h-[98vh] flex items-center justify-center'> 
    <div className='p-4 w-2/6 rounded bg-gray-800'>
    <div className='text-xl font-semibold'>LogIn</div>
    <input type="username" name='username' placeholder='username' value={data.username} onChange={handleChange} className='bg-gray-700 px-3 py-2 my-3 w-full rounded' />
    <input type="password" name='password' placeholder='password' value={data.password} onChange={handleChange} className='bg-gray-700 px-3 py-2 my-3 w-full rounded' />

    <div className='w-full flex items-center justify-between'>
    <button className='bg-blue-700 px-4 py-2 rounded font-semibold mt-2' onClick={handleSubmit}>LogIn</button>
    <Link to={"/signup"} className="text-gray-400 hover:text-gray-200">Don't have an account? Signup here</Link>
    </div>
    </div>
    </div>
  )
}

export default Login