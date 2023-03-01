import React, {useState} from 'react'
import FormEmpresa from './FormEmpresa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CrearEmpresa = () => {
const navigate = useNavigate();
const [errors, setErrors]=useState({})
const [duperror,setduperror]=useState({
    name : false,
    email : false
})
const [regExito, setregExito]=useState(null);
const empty = {
    name : "",
    email : "",
    description : "",
    city : "",
    servertype : "",
    racks : "",
    location : {
        lat : 0,
        lng : 0
    },
    direction : "",
    password : "",
    acuerdo : false

}
const onNewEmpresa = (empresa)=>{
    console.log(empresa)
    axios.post("http://localhost:8000/api/newEmpresa",
        {name : empresa.name,
         email : empresa.email,
         description : empresa.description,
         city : empresa.city,
         servertype : empresa.servertype,
         racks : empresa.racks,
         location : empresa.location,
         direction : empresa.direction,
         password : empresa.password,
         acuerdo : empresa.acuerdo
        }
    ,{withCredentials: true})
    .then(res=>{
        setduperror({
            name : false,
            email: false
        })
        setregExito(true)
        console.log(res)
        //navegar a login empresa
        navigate(`/empresa/login`)
    })
    .catch(err=>{
        setregExito(false)
        if (err.response.data.errors.message === "Duplicado"){
            if (err.response.data.errors.PropDuplicada==="name"){
                setduperror({
                    name : true
                })
            }else if(err.response.data.errors.PropDuplicada==="email"){
                setduperror({
                    email : true
                })
            }
        }else{
        setErrors(err.response.data.errors)}
        console.log("Ocurrio un error axios al crear",err)
    })
}

  return (
    <div className="container  mt-4 py-4">
        <h3 className='text-center'>Registrar empresa</h3>
        <FormEmpresa regExito= {regExito}duperror={duperror} valerror={errors} empresaInicial={empty} onSubmitProp={onNewEmpresa}/>
    </div>
  )
}

export default CrearEmpresa