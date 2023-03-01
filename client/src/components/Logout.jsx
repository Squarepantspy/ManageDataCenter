import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const Logout = ({tipo}) => {
    const navigate = useNavigate();

    const handleClick = ()=>{

        axios.get(`http://localhost:8000/logout/${tipo}`,{withCredentials: true})
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }
  return (
    <button type="button" className='btnper' onClick={handleClick}>Logout</button>
  )
}

export default Logout