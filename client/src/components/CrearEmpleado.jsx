import React,{useState} from 'react'
import serverimg from "../static/img/servers.jpg"
import FormEmpleado from './FormEmpleado'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const CrearEmpleado = () => {
const navigate = useNavigate();
const {id}= useParams();
const [errors, setErrors]=useState({})
const [duperror,setduperror]=useState({
    firstName : false,
    lastName : false
})
const [regExito, setregExito]=useState(null);
const empty= {
    firstName : "",
    lastName : "",
    accesscode: "",
    username : "",
    cargo : "",
    likes : 0
}
const onNewEmpleado = (empleado)=>{
    console.log(empleado)
    axios.post(`http://localhost:8000/api/${id}/newEmployee`,
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
        //navegar a empresa main
        navigate(`/empresa/${id}/main`)
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
    })
}

  return (
    <div>
        <div className='navbar-home fourth-color'>
        <div className="d-flex flex-row">
        <img src={serverimg} className= "logo" alt="esta es la imagen" />
        <h2>Protect Data Center</h2>
        </div>
        </div>
        <div className="container  mt-4 py-4">
        <h3 className='text-center mb-4'>Registrar empleado</h3>
        <div className="">
        <FormEmpleado regExito= {regExito}duperror={duperror} valerror={errors} empleadoInicial={empty} onSubmitProp={onNewEmpleado}/>
        </div>
        </div>
    </div>
  )
}

export default CrearEmpleado