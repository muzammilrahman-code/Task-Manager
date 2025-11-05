import React from 'react'
import Home from './pages/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AllTask from './pages/AllTask'
import ImportantTask from './pages/ImportantTask'
import CompleteTask from './pages/CompleteTask'
import InCompleteTask from './pages/InCompleteTask'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useSelector } from 'react-redux'
import { authAction } from './store/auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() =>{
    if(localStorage.getItem("token") && localStorage.getItem("id")){
        dispatch(authAction.login());
      }

    else if(isLoggedIn === false){
      navigate("/signup")
    }
  }, [])
 

  return (
    <div className='bg-gray-900 text-white p-2 relative '>
      
        <Routes>
          <Route exact path='/' element={<Home/>}>
          <Route index element={<AllTask/>}/>
          <Route path='/importanttask' element={<ImportantTask/>}/>
          <Route path='/completetask' element={<CompleteTask/>}/>
          <Route path='/incompletetask' element={<InCompleteTask/>}/>
          </Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    
    </div>
  )
}

export default App