import React, {useState, useEffect} from 'react'

const FormEmpleado = (props) => {

    const {empleadoInicial, regExito, onSubmitProp,valerror,duperror}=props;
    const [firstName, setFirstName]=useState(empleadoInicial.firstName)
    const [lastName, setLastName]=useState(empleadoInicial.lastName)
    const [accesscode,setAccesscode]=useState(empleadoInicial.accesscode)
    const [username, setUsername]=useState(empleadoInicial.username)
    const [cargo, setCargo]=useState(empleadoInicial.cargo)
    const [likes,setLikes]=useState(empleadoInicial.likes)

useEffect(()=>{
    if (regExito){
        Cancelhandler();
    }
},[regExito])

const empleado ={
    firstName,
    lastName,
    accesscode,
    username,
    cargo,
    likes
}
const Cancelhandler = ()=>{
    setFirstName("")
    setLastName("")
    setUsername("")
    setAccesscode("")
    setCargo("")
    setLikes("")

}
const handleSubmit = (e)=>{
    e.preventDefault();
    onSubmitProp(empleado)
}
    return (
        <div className='container'>
        <form onSubmit={handleSubmit} className="form row justify-content-around">
           <div className="col-4">
               <div className="mb-3">
               <label htmlFor="nempleado" className="form-label">Nombre del Empleado :</label>
               <input type="text" id='nempleado' className="form-control" onChange={e=>setFirstName(e.target.value)} value={firstName}/>
               {valerror.firstname ? <span className='text-danger'> {valerror.firstname.message}</span> : null }<br></br>
               </div>
               <div className="mb-3">
               <label htmlFor="aempleado" className="form-label">Apellido del Empleado :</label>
               <input type="text" id='aempleado' className="form-control" onChange={e=>setLastName(e.target.value)} value={lastName}/>
               {valerror.lastName ? <span className='text-danger'> {valerror.lastName.message}</span> : null }<br></br>
               </div>
               <div className="mb-3">
               <label htmlFor="username" className="form-label">Username :</label>
               <input type="text" id='username' className="form-control" onChange={e=>setUsername(e.target.value)} value={username}/>
               {valerror.username ? <span className='text-danger'> {valerror.username.message}</span> : null }<br></br>
               {duperror.username ? <span className='text-danger'> {"Este email ya Existe"}</span> : null }
               </div>
               <div className="mb-3">
               <label htmlFor="accesscode" className="form-label">Codigo de acceso :</label>
               <input type="password" id='accesscode' className="form-control" onChange={e=>setAccesscode(e.target.value)} value={accesscode}/>
               {valerror.accesscode ? <span className='text-danger'> {valerror.accesscode.message}</span> : null }<br></br>
               </div>
               <div className="mb-3">
               <label htmlFor="cargo" className="form-label">Cargo :</label>
               <input type="text" id='cargo' className="form-control" onChange={e=>setCargo(e.target.value)} value={cargo}/>
               {valerror.cargo ? <span className='text-danger'> {valerror.cargo.message}</span> : null }<br></br>
               </div>
            </div>
            <div className="row justify-content-evenly">
                <div className="col-4 d-flex justify-content-center text-center">
                    <button type="button" className='btnper ' onClick={Cancelhandler} >Cancelar</button>
                </div>
                <div className="col-4 d-flex justify-content-center text-center">
                    <input type="submit" className='btnper ' value="Registrar Empleado"/>
                </div>
            </div>
        </form>
        </div>
  )
}

export default FormEmpleado