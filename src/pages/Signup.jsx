import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/api';

const Signup = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const history = useNavigate();
    if(isLoggedIn === true){
         history("/");
    }
  const [data, setData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));  
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // always prevent default form reload first

    if (data.username === "" || data.email === "" || data.password === "") {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/signup`, data);
      console.log(response);
      alert("Signup successful!");
      setData({ username: "", email: "", password: "" });
    } catch (error) {
     alert(error.response.data.message);
     history("/login");
    }
  };

  return (
    <div className='h-[98vh] flex items-center justify-center'> 
      <div className='p-4 w-2/6 rounded bg-gray-800'>
        <div className='text-xl font-semibold text-white mb-3'>Signup</div>

        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="Username"
          className="bg-gray-700 text-white px-3 py-2 my-2 w-full rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="bg-gray-700 text-white px-3 py-2 my-2 w-full rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="bg-gray-700 text-white px-3 py-2 my-2 w-full rounded"
        />

        <div className='w-full flex flex-col items-center justify-between gap-2 mt-3'>
          <button
            className='bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded font-semibold w-full'
            onClick={handleSubmit}
          >
            Signup
          </button>

          <Link to="/login" className="text-gray-400 hover:text-gray-200 text-sm">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
