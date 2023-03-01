import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import serverimg from '../static/img/servers.jpg'
import Button from './Button'
import BorrarEmpleado from './BorrarEmpleado';
import Logout from './Logout';
import Sinpermiso from './Sinpermiso';
const MainEmpresa = () => {
    const [empresa,setEmpresa]=useState("")
    const [empleados,setEmpleados]=useState([])
    const {id}= useParams();
    const [autorizacion,setAutorizacion]=useState(true)

    const removefromDom =(iden)=>{
        setEmpleados(empleados.filter((emp,index)=>emp._id!==iden))
    }

    
useEffect(()=>{
    if(empresa===""){//solo se ejecuta al iniciar ya que el estado inicial de empresa antes que se cargue es vacio
        axios.get(`http://localhost:8000/api/empresa/${id}`,{withCredentials: true})
        .then((res)=>{
            setEmpresa(res.data)
            setAutorizacion(true)
        }).catch((err)=>{
            if (err.response.status===401){
                setAutorizacion(false)
            }
            console.log(err)
        })
    }
        axios.get(`http://localhost:8000/api/${id}/allEmployess`,{withCredentials: true})
        .then(res=>{
            setEmpleados(res.data)
            setAutorizacion(true)
        })
        .catch(err=>{
            if (err.response.status===401){
                setAutorizacion(false)
            }
            console.log(err)
        })
    
},[id])
  return ( <>{(autorizacion)?
    <>
    <div className='navbar-home fourth-color'>
        <div className="d-flex flex-row">
        <img src={serverimg} className= "logo" alt="esta es la imagen" />
        <h2>Protect Data Center</h2>
        </div>
        <div className="navbar-navegation">
        <h2>{empresa.name}</h2>
        <Logout tipo="empresa"/>
        </div>
    </div>
    <div className="container">
        <div className="d-flex flex-row justify-content-between my-3 align-items-center">
        <h2 className='text-center mt-3'>Lista de Empleados registrados</h2>
        <Button ruta={`/crear/${id}/empleado`} texto="Crear Empleado"/>
        </div>
    {empleados.map((emp,index)=>{
                return(<div key={index} className='card my-3'>
                        <div className='card-header d-flex flex-row justify-content-between align-items-center'>
                        <h2>{emp.firstName} {emp.lastName}</h2>
                        <div className='my-2 '>
                            <div className="d-flex flex-row justify-content-around align-items-center">
                            <h5>Likes : {emp.likes}</h5>
                            <Button ruta={`/roles/${emp._id}`} texto="Roles"/>
                            <Button ruta={`/editar/empleado/${emp._id}`} texto="Editar Empleado"/>
                            <BorrarEmpleado iden={emp._id} successCallback={()=>{removefromDom(emp._id)}}/>
                            </div>
                        </div>
                        </div>
                </div>)
    })}
    </div>
    </> : <Sinpermiso/> }</>
  )
}

export default MainEmpresa