import React,{useEffect,useState} from 'react'
import serverimg from "../static/img/servers.jpg"
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios'
import BorrarRol from './BorrarRol';
import Button from './Button';
import Sinpermiso from './Sinpermiso';
const Roles = () => {
    const [roles, setRoles]=useState([])
    const [rol,setRol]=useState("")
    const [empleado, setEmpleado]=useState("")
    const {id}= useParams();
    const [autorizacion,setAutorizacion]=useState(false)
useEffect(()=>{
    axios.get(`http://localhost:8000/api/empleado/${id}`,{withCredentials: true})
    .then(res=>{
        console.log(res)
        setEmpleado(res.data)
        setAutorizacion(true)
    })
    .catch(err=>{
        console.log(err)
        if (err.response.status===401){
            setAutorizacion(false)
        }
    })
    axios.get(`http://localhost:8000/api/roles/${id}/allRoles`,{withCredentials: true})
    .then(res=>{
        setRoles(res.data)
        setAutorizacion(true)
        
    })
    .catch(err=>{
        console.log(err)
        if (err.response.status===401){
            setAutorizacion(false)
        }
    })
},[])

const removefromDom =(iden)=>{
    setRoles(roles.filter((rol,index)=>rol._id!==iden))
}
const submitHandler =(e)=>{
    e.preventDefault()
    axios.post(`http://localhost:8000/api/roles/${id}/newRol`,{
        rol : rol,
        rolstatus : false
    },{withCredentials: true})
    .then(res=>{
        console.log(res.data)
        setRoles(oldarray=>[...oldarray,{_id: res.data._id,rol : res.data.rol, rolstatus : res.data.rolstatus }])
        setRol("")
    })
    .catch(err=>{
        console.log(err)
    })
}


  return ( <>{(autorizacion)?
    <div>
        <div className='navbar-home fourth-color'>
            <div className="d-flex flex-row">
                <img src={serverimg} className= "logo" alt="esta es la imagen" />
                <h2>Protect Data Center</h2>
            </div>
            <Button ruta={`/empresa/${(empleado==="")? "" : empleado.createdBy._id}/main`} texto="Home"/>
        </div>
        <div className='container my-3'>
            <h3 className='text-center mb-3'>Lista de Roles de {empleado.firstName} {empleado.lastName} </h3>
            <div className="container">
                <form onSubmit={submitHandler} className='form row justify-content-center align-items-center'>
                    <div className='col-4 mb-3'>
                        <input type="text" className="form-control" value={rol} onChange={e=>{setRol(e.target.value)}}/>
                    </div>
                    <div className="col-4 mb-3">
                        <input type="submit" className='btnper' value= "Agregar Rol"/>
                    </div>
                </form>
            </div>
            {
            roles.map((rol,index)=>{
                return (
                    
                    <div key={index} className="container">
                        <div className="card mb-3 py-3">
                            <div className="d-flex w-100 flex-row align-items-center justify-content-around">
                                <div className="d-flex gap-3 flex-row ">
                                <h5>{rol.rol}</h5>
                                </div>
                                <Button ruta={`/rol/${rol._id}/editar`} texto="Editar Rol"/>
                                <BorrarRol iden={rol._id} successCallback={()=>{removefromDom(rol._id)}}/>
                            </div>
                    </div>
                    </div>
                )
            })
            }
        </div>
    </div> : <Sinpermiso/> }</>
  )
}

export default Roles