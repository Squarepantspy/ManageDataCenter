import React from 'react'
import axios from 'axios'
const BorrarRol = (props) => {
    const {iden, successCallback}= props;

    const handleDelete=()=>{
        axios.delete(`http://localhost:8000/api/rol/${iden}/delete`,{withCredentials: true})
        .then(res=>{
            console.log(res.data);
            successCallback()})
        .catch(err=>{console.log(err)})
    }
     
  return (
    <button className='btnper' onClick={handleDelete} type="button">Borrar Rol</button>
  )
}

export default BorrarRol