import React, {useEffect, useState} from 'react'
import axios from 'axios'
import serverimg from "../static/img/servers.jpg"
import { useNavigate, useParams } from 'react-router-dom'
import Sinpermiso from './Sinpermiso'
const EditarRol = () => {
const navigate = useNavigate();
const [rol,setRol]=useState("")
const [autorizacion,setAutorizacion]=useState(false)

    const {id}=useParams();
useEffect(()=>{
    axios.get(`http://localhost:8000/api/rol/${id}/oneRole`,{withCredentials: true})
    .then(res=>{
        console.log(res.data)
        setRol(res.data)
        setAutorizacion(true)
    })
    .catch(err=>{
        console.log(err)
        if (err.response.status===401){
            setAutorizacion(false)
        }
    })
},[])
const handleChange =()=>{
    (rol.rolstatus) ? setRol({...rol,rolstatus:false}) : setRol({...rol,rolstatus: true})
}
const submitHandler=(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:8000/api/rol/${id}/edit`,{
        rol : rol.rol,
        rolstatus : rol.rolstatus
    },{withCredentials: true})
    .then(res=>{
        console.log(res)
        setAutorizacion(true)
        navigate(`/roles/${res.data.createdFor}`)
    })
    .catch(err=>{
        console.log(err)
        if (err.response.status===401){
            setAutorizacion(false)
        }
    })
}
  return ( <>{(autorizacion)?
    <div>
        <div className='navbar-home fourth-color'>
            <div className="d-flex flex-row">
            <img src={serverimg} className= "logo" alt="esta es la imagen" />
            <h2>Protect Data Center</h2>
            </div>
        </div>
        {(rol!=="")?
        <div className="container my-3 ">
            <h3 className='text-center mb-3'>Editar Rol de {rol.createdFor.firstName} {rol.createdFor.lastName}</h3>
        <form className='form row justify-content-center align-items-center' onSubmit={submitHandler}>
            <div className="col w-100">
            <input type="text" className='form-control edito' value={rol.rol} onChange={e=>setRol({...rol,rol: e.target.value})}/>
            </div>
            <div className="col-4">
            <input type="checkbox" checked={rol.rolstatus} onChange={handleChange}/>
            </div>
            <input type="submit" id="editbtn" className='btnper my-3' value="Actualizar Rol"/>
        </form>
        </div>: ""}
    </div> : <Sinpermiso/> }</>
  )
}

export default EditarRol