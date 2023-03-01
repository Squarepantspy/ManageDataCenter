import React, {useState} from 'react'
import serverimg from '../static/img/servers.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const LoginEmpresa = () => {

const [email, setEmail]=useState("")
const [password, setPassword]=useState("")
const [status, setStatus]=useState(null)
const navigate = useNavigate();
const loginHandler=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8000/api/empresa/login",{
        email,password
    },{withCredentials: true, credentials:'include'})
    .then(res=>{
        console.log(res)
        setStatus(false)
        navigate(`/empresa/${res.data.empresa._id}/main`)
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
                    <h2 className="card-title">Ingrese a su Empresa</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={loginHandler}>
                        <div className="mb-3">
                            <label className='form-label'>Email:</label>
                            <input type="email" className='form-control'onChange={e=>setEmail(e.target.value)} value={email}/>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Password:</label>
                            <input type="password" className='form-control' onChange={e=>setPassword(e.target.value)} value={password}/>
                        </div>
                        <input type="submit" className='btnper mt-4 mx-2' value="Ingresar"/>
                        {(status)? <p className='text-danger'>Email o contraseña Incorrecta</p> : null}
                    </form>
                </div>

            </div>
        </div>
    </div>
        </>
  )
}

export default LoginEmpresa