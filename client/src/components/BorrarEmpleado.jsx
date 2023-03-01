import React from 'react'
import axios from 'axios'
const BorrarEmpleado = (props) => {
    const {iden, successCallback}= props;

    const handleDelete= ()=>{
        axios.delete(`http://localhost:8000/api/empleado/${iden}/delete`,{withCredentials: true})
        .then(res=>{
            console.log(res.data);
            successCallback()})
        .catch(err=>{console.log(err)})
    }

  return (
    <button className='btnper bg-danger' onClick={handleDelete} type="button">Borrar Empleado</button>
  )
}

export default BorrarEmpleado