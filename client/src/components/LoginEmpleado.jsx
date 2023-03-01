import React, {useState} from 'react'
import serverimg from '../static/img/servers.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const LoginEmpleado = () => {

  const [username,setUsername]=useState("")
  const [accesscode,setAcesscode]=useState("")
  const [status,setStatus]=useState(null)
  const navigate = useNavigate();
  const loginHandler=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8000/api/empleado/login",{
        username,accesscode
    },{withCredentials: true, credentials:'include'})
    .then(res=>{
        console.log(res)
        setStatus(false)
        navigate(`/empleado/${res.data.empleado._id}/main`)
    }).catch(error=>{
        setStatus(true)
        console.log("Ocurrio un error al logearse",error)
    })

}

  return (
    <>
    <div className='navbar-home fourth-color'>
        <div className="d-flex flex-row">
        <img src={serverimg} className= "logo" alt="esta es la imagen" />
        <h2>Protect Data Center</h2>
        </div>
    </div> 
    <div className='row justify-content-center'>
        <div className="container m-4 col-4 ">
            <div className="card ">
                <div className="card-header">
                    <h2 className="card-title">Ingresar como Empleado</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={loginHandler}>
                        <div className="mb-3">
                            <label className='form-label'>usuario:</label>
                            <input type="text" className='form-control'onChange={e=>setUsername(e.target.value)} value={username}/>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>codigo de acceso:</label>
                            <input type="password" className='form-control' onChange={e=>setAcesscode(e.target.value)} value={accesscode}/>
                        </div>
                        <input type="submit" className='btnper mt-4 mx-2' value="Ingresar"/>
                        {(status)? <p className='text-danger'>usuario o codigo de acceso incorrecto </p> : null}
                    </form>
                </div>

            </div>
        </div>
    </div>
        </>
  )
}

export default LoginEmpleado