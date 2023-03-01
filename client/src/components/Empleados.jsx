import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import serverimg from '../static/img/servers.jpg'
import Logout from './Logout';
import Sinpermiso from './Sinpermiso';
const Empleados = () => {
const [empresaid,setempresaid]=useState("")
const [empresaname,setEmpresaname]=useState("")
const [empleados,setEmpleados]=useState([])
const [autorizacion, setAutorizacion]=useState(false)
const {id}=useParams();


useEffect(()=>{
    axios.get(`http://localhost:8000/api/empleado/${id}`,{withCredentials: true})
    .then(res=>{
        setempresaid(res.data.createdBy._id)
        setEmpresaname(res.data.createdBy.name)
        setAutorizacion(true)
    })
    .catch(err=>{
        console.log(err)
        setAutorizacion(false)
    })
    if(empresaid !== ""){
    axios.get(`http://localhost:8000/api/${empresaid}/allEmployess`,{withCredentials: true})
        .then(res=>{
            console.log(res)
            setEmpleados(res.data.filter((emp,index)=>emp._id!==id))
            setAutorizacion(true)
        })
        .catch(err=>{
            console.log(err)
            setAutorizacion(false)
        })}
},[id,empresaid])
const handleLike = (e,emp,indexx)=>{
    console.log(emp,indexx)
  let nuevoArray = [...empleados];
  let qui=nuevoArray.filter((e,index)=> index===indexx)
  qui[0].likes = qui[0].likes + 1;
  nuevoArray[indexx]=qui[0];
  setEmpleados(nuevoArray);
  axios.put(`http://localhost:8000/api/${qui[0]._id}/editEmployee`,qui[0],{withCredentials: true})
  .then(res=>{console.log(res)
    setAutorizacion(true)})
  .catch(err=>{console.log(err)
    setAutorizacion(false)
  })
}

  return (<>{(autorizacion)?<>
    <div><div className='navbar-home fourth-color'>
    <div className="d-flex flex-row">
    <img src={serverimg} className= "logo" alt="esta es la imagen" />
    <h2>Protect Data Center</h2>
    </div>
    <nav className="navbar navbar-expand-lg w-100 navegacion mt-3">
     
      <div className="container-fluid">
        <h2 className='mx-3'>{empresaname}</h2>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to={`/empleado/${id}/main`} className={"nav-link navper"} >Home</Link>
            <Link to={`/${id}/monitor`} className={"nav-link  navper"} >Monitoreo</Link>
            <Link to={`/${id}/empleados`} className={"nav-link active navper"} >Empleados</Link>
          </div>
        </div>
      </div>
      <Logout tipo="empleado"/>
    </nav>
</div>
</div>
<div className="container">
        <div className="d-flex flex-row justify-content-between my-3 align-items-center">
        <h2 className='text-center mt-3'>Co-evaluacion de Empleados</h2>
        </div>
    {empleados.map((emp,index)=>{
                return(<div key={index} className='card my-3'>
                        <div className='card-header d-flex flex-row justify-content-between align-items-center'>
                        <h5>{emp.firstName} {emp.lastName}</h5>
                        <div className='my-2 '>
                            <div className="d-flex flex-row justify-content-around align-items-center">
                            <button type="button" className={"like-btn"} onClick={(e)=>handleLike(e,emp,index)}>Like</button>
                            <h5>Likes : {emp.likes}</h5>
                            </div>
                        </div>
                        </div>
                </div>)
    })}
    </div>

</> : <Sinpermiso/> }</>
  )
}

export default Empleados