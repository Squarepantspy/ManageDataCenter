import React, {useState,useEffect} from 'react'
import serverimg from "../static/img/servers.jpg"
import FormEmpleado from './FormEmpleado'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Sinpermiso from './Sinpermiso'
import Button from './Button'
const EditarEmpleado = () => {
    const [empleado,setEmpleado]=useState("")
    const [empreid,setEmpreid]=useState("");
    const {id}= useParams();
    const [errors, setErrors]=useState({})
    const navigate = useNavigate();
    const [duperror,setduperror]=useState({
    firstName : false,
    lastName : false
})
const [autorizacion,setAutorizacion]=useState(false)
useEffect(()=>{
    axios.get(`http://localhost:8000/api/empleado/${id}`,{withCredentials: true})
    .then(res=>{
        console.log(res)
        setEmpleado(res.data)
        setEmpreid(res.data.createdBy._id)
        setAutorizacion(true)
    })
    .catch(err=>{
        console.log(err)
        if (err.response.status===401){
            setAutorizacion(false)
        }
    })
},[])
const [regExito, setregExito]=useState(null);
const onNewEmpleado = (empleado)=>{
    console.log(empleado)
    axios.put(`http://localhost:8000/api/${id}/editEmployee`,
        {firstName : empleado.firstName,
         lastName : empleado.lastName,
         accesscode : empleado.accesscode,
         username : empleado.username,
         cargo : empleado.cargo,
         likes : empleado.likes,
        }
    ,{withCredentials: true})
    .then(res=>{
        setduperror({
            username : false
        })
        setregExito(true)
        console.log(res)
        setAutorizacion(true)
        //navegar a empresa main
        navigate(`/empresa/${res.data.createdBy}/main`)
    })
    .catch(err=>{
        setregExito(false)
        if (err.response.data.errors.message === "Duplicado"){
            if (err.response.data.errors.PropDuplicada==="username"){
                setduperror({
                    username : true
                })
            }}else{
        setErrors(err.response.data.errors)}
        console.log("Ocurrio un error axios al crear",err)
        if (err.response.status===401){
            setAutorizacion(false)
        }
    })
}
  return (<>{(autorizacion)?
    <>
    <div className='navbar-home fourth-color'>
        <div className="d-flex flex-row">
        <img src={serverimg} className= "logo" alt="esta es la imagen" />
        <h2>Protect Data Center</h2>
        </div>
        <Button ruta={`/empresa/${empreid}/main`} texto="Home"/>
    </div>
    <div className="container  mt-4 py-4">
        <h3 className='text-center mb-4'>Editar empleado</h3>
        <div className="">
        {(empleado !== "")?
        <FormEmpleado regExito= {regExito}duperror={duperror} valerror={errors} empleadoInicial={empleado} onSubmitProp={onNewEmpleado}/> : ""
        }
        </div>
        </div>
    </> : <Sinpermiso/> }</>
  )
}

export default EditarEmpleado