import React,{useEffect, useState} from 'react'
import serverimg from "../static/img/servers.jpg"
import { Link, useParams } from 'react-router-dom'
import {io} from 'socket.io-client';
import axios from 'axios';
import rack from '../static/img/rack-removebg-preview.png'
import Logout from './Logout';
import Sinpermiso from './Sinpermiso';
const socket = io(':8000')

const Monitor = () => {
  //set de socket desde el cliente
  //const [socket] = useState(()=>io(':8000'))
  const {id}= useParams();
  const [empleado, setEmpleado]=useState("")
  const [sensor1,setSensor1]=useState("")
  const [sensor2,setSensor2]=useState("")
  const [autorizacion,setAutorizacion]=useState(false)

  useEffect(()=>{
    //socket.disconnect()
    socket.on('connect', ()=>{
    console.log(' conexion establecida al servidor')
  })
    socket.on('sensor1',data=>{
    if(typeof(data)== "object"){//verificamos que se mande un objeto del arduino
    setSensor1(data)}
  })
  socket.on('sensor2',data=>{
    if(typeof(data)== "object"){//verificamos que se mande un objeto del arduino
    setSensor2(data)}
  })
    

},[])

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
    //return ()=> {socket.disconnect()
    //};
},[id,autorizacion])

  
/* socket.on('sensor2', (data2)=>{
    console.log("Los datos del sensor 2 son :", data2)
}) */

  return ( <>{(autorizacion)?
     <>{(empleado!=="")?
    <div>
      
      <div className='navbar-home fourth-color'>
        <div className="d-flex flex-row">
        <img src={serverimg} className= "logo" alt="esta es la imagen" />
        <h2>Protect Data Center</h2>
        </div>
        <nav className="navbar navbar-expand-lg w-100 navegacion mt-3">
         
          <div className="container-fluid">
            <h2 className='mx-3'>{empleado.createdBy.name}</h2>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to={`/empleado/${id}/main`} className={"nav-link navper"}  >Home</Link>
                <Link to={`/${empleado._id}/monitor`} className={"nav-link active navper"} >Monitoreo</Link>
                <Link to={`/${empleado._id}/empleados`} className={"nav-link navper"} >Empleados</Link>
              </div>
            </div>
          </div>
          <Logout tipo="empleado"/>
        </nav>
    </div>
      <div className="container mt-4">
      <div className="d-flex my-3 w-100 flex-row justify-content-between align-items-center">
        <div className=''>
        <img className="rack" src={rack} alt="imagen de rack" />
        </div>
        <div className='container row'>
          <div className="col-4 ">
        <label className='my-2'> Temperatura de sensor 1</label>
        <input type="string" className={"inputtmp"} readOnly={true} value={(sensor1==="")? "cargando...":sensor1.lectura[1].toString()} />
        </div>
        <div className="col-4">
        <label className='my-2'> Humedad de sensor 1</label>
        <input type="string" className={"inputtmp"} readOnly={true} value={(sensor1==="")? "cargando...":sensor1.lectura[0].toString()} />
        </div>
        </div>
      </div>
      <div className="d-flex my-3 w-100 flex-row justify-content-between align-items-center">
        <div className=''>
        <img className= "rack" src={rack} alt="imagen de rack" />
        </div>
        <div className='container row'>
          <div className="col-4">
        <label className='my-2'> Temperatura de sensor 2</label>
        <input type="string" className={"inputtmp"} readOnly={true} value={(sensor2==="")? "cargando...":sensor2.lectura[1].toString()} />
        </div>
        <div className="col-4">
        <label className='my-2'> Humedad de sensor 2</label>
        <input type="string" className={"inputtmp"}readOnly={true} value={(sensor2==="")? "cargando..." :sensor2.lectura[0].toString()} />
        </div>
        </div>
      </div></div>
    </div>:""}</> : <Sinpermiso/> }</>
  )
}

export default Monitor