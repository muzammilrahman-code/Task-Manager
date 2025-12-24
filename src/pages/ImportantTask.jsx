import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';
import { BASE_URL } from '../../utils/api';

const ImportantTask = () => {
  const [Data, setData] = useState()
  const headers = {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`
      };
    
      useEffect(() =>{

        const fetch = async() =>{
        const response = await axios.get(`${BASE_URL}/api/v2/get-imp-task/`, 
          { headers }
      );
        setData(response.data.data);
      }
      fetch();
      },[])
  return (
    <div><Cards home={"false"} data={Data}/></div>
  )
}

export default ImportantTask