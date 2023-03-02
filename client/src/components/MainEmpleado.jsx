import React,{useEffect, useState} from 'react'
import serverimg from "../static/img/servers.jpg"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Logout from './Logout';
import Sinpermiso from './Sinpermiso';
//import Noexiste from './Noexiste';
const MainEmpleado = () => {
const {id}= useParams();
const [roles,setRoles]=useState([]);
const [empleado, setEmpleado]=useState("")
const [autorizacion,setAutorizacion]=useState(false)
useEffect(()=>{
  if(empleado===""){
  axios.get(`http://localhost:8000/api/empleado/${id}`,{withCredentials: true})
  .then((res)=>{
      console.log(res)
      
      setEmpleado(res.data)
      setAutorizacion(true)
    
    
  }).catch((err)=>{
     if (err.response.status===401){
      setAutorizacion(false)
  } 
      console.log(err)
  })}
  axios.get(`http://localhost:8000/api/roles/${id}/allRoles`,{withCredentials: true})
  .then((res)=>{
      setRoles(res.data)
      setAutorizacion(true)
  }).catch((err)=>{
    if (err.response.status===401){
      setAutorizacion(false)
  }
      console.log(err)
  })
},[id,empleado,autorizacion])
const handleCheck = (e,rol,indexx)=>{
  console.log(rol,indexx)
  let nuevoArray = [...roles];
  let qui=nuevoArray.filter((e,index)=> index===indexx)
  qui[0].rolstatus ? qui[0].rolstatus = false : qui[0].rolstatus =true; 
  nuevoArray[indexx]=qui[0];
  setRoles(nuevoArray);
  axios.put(`http://localhost:8000/api/rol/${qui[0]._id}/edit`,qui[0],{withCredentials: true})
  .then(res=>{console.log(res)})
  .catch(err=>{console.log(err)})
}

  return ( 
  <>
  {(autorizacion)?<>
    {(empleado!=="")?<>
    <div className='navbar-home fourth-color'>
        <div className="d-flex flex-row">
        <img src={serverimg} className= "logo" alt="esta es la imagen" />
        <h2>Protect Data Center</h2>
        </div>
        <nav className="navbar navbar-expand-lg w-100 navegacion mt-3">
         
          <div className="container-fluid">
            <h2 className='mx-3'>{(empleado==="")?"": empleado.createdBy.name}</h2>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to={`/empleado/${id}/main`} className={"nav-link active navper"}  >Home</Link>
                <Link to={`/${id}/monitor`} className={"nav-link  navper"} >Monitoreo</Link>
                <Link to={`/${id}/empleados`} className={"nav-link navper"} >Empleados</Link>
              </div>
            </div>
          </div>
          <Logout tipo="empleado"/>
        </nav>
    </div>

    <div className="container">
    <h3 className='text-center mt-3'>Bienvenido/a {empleado.firstName} {empleado.lastName}</h3>
        <div className="d-flex flex-column justify-content-between my-3 align-items-start">
        <h3 className='text-center mt-3'>Tus roles son los siguientes :</h3>
        </div>
    {roles.map((rol,index)=>{
                return(<div key={index} className={(rol.rolstatus)?'completado card my-3' :'card my-3'}>
                        <div className='card-header d-flex flex-row justify-content-between align-items-center'>
                        <h4>{rol.rol}</h4>
                        <div className='my-2 '>
                            <div className="d-flex flex-row justify-content-around align-items-center">
                            <label className="checkbox-btn">
                            <label htmlFor="checkbox"></label>
                            <input type="checkbox" onChange={(e)=>handleCheck(e,rol,index)} checked={rol.rolstatus}/>
                            <span className="checkmark"></span>
                            </label>
                            </div>
                        </div>
                        </div>
                </div>)
    })}
    </div>
    </>
    
    
    : ""}</> : <Sinpermiso/> }</>
  )
}

export default MainEmpleado