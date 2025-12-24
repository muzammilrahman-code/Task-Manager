import { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';
import { BASE_URL } from '../utils/api';

const InCompleteTask = () => {
  const [Data, setData] = useState()
      
        const fetchData = async() =>{
          const headers = {
            id: localStorage.getItem("id"),
            Authorization: `Bearer ${localStorage.getItem("token")}`
          };
          const response = await axios.get(`${BASE_URL}/get-incomp-task/`, { headers });
          setData(response.data.data);
        }

        useEffect(() =>{
          fetchData();
        },[])
  return (
    <div><Cards home={"false"} data={Data} refreshData={fetchData} /></div>
  )
}

export default InCompleteTask