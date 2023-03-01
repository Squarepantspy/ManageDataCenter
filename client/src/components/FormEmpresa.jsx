import React, {useEffect,useState} from 'react'
import Mimapa from './Mimapa'

const FormEmpresa = (props) => {
    const {empresaInicial,regExito,onSubmitProp,valerror,duperror}=props;
    const[name, setName]=useState(empresaInicial.name)
    const[email,setEmail]=useState(empresaInicial.email)
    const[password,setPassword]=useState(empresaInicial.password)
    const[city,setCiudad]=useState(empresaInicial.city)
    const[description,setDescription]=useState(empresaInicial.description)
    const[servertype,setServertype]=useState(empresaInicial.servertype)
    const[direction, setDirection]=useState(empresaInicial.direction)
    const[location,setLocation]=useState(empresaInicial.location)
    const[racks,setRacks]=useState(empresaInicial.racks)
    const[acuerdo,setAcuerdo]=useState(empresaInicial.acuerdo)

    useEffect(()=>{
        if (regExito){
            Cancelhandler();
        }
    },[regExito])
    
    const empresa = {
        name,
        email,
        password,
        city,
        description,
        servertype,
        direction,
        location,
        racks,
        acuerdo
    }
    const levantarLocation = (newLoc)=>{
        setLocation(newLoc)
    }
    const handleCheck=(e)=>{
        (acuerdo)? setAcuerdo(false) : setAcuerdo(true)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        onSubmitProp(empresa)
    }
    
    const Cancelhandler = ()=>{
        setName("")
        setEmail("")
        setPassword("")
        setCiudad("")
        setDescription("")
        setServertype("")
        setDirection("")
        setLocation({lat: 0, lng: 0})
        setRacks("")
        setAcuerdo(false)
    }
  return (
    <div className='container'>
         <form onSubmit={handleSubmit} className="form row justify-content-around">
            <div className="col-4">
                <div className="mb-3">
                <label htmlFor="nempresa" className="form-label">Nombre de Empresa :</label>
                <input type="text" id='nempresa' className="form-control" onChange={e=>setName(e.target.value)} value={name}/>
                {valerror.name ? <span className='text-danger'> {valerror.name.message}</span> : null }<br></br>
                {duperror.name ? <span className='text-danger'> {"Este nombre ya Existe"}</span> : null }
                </div>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email :</label>
                <input type="email" id='email' className="form-control" onChange={e=>setEmail(e.target.value)} value={email}/>
                {valerror.email ? <span className='text-danger'> {valerror.email.message}</span> : null }<br></br>
                {duperror.email ? <span className='text-danger'> {"Este email ya Existe"}</span> : null }
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña :</label>
                <input type="password" id='password' className="form-control" onChange={e=>setPassword(e.target.value)} value={password}/>
                {valerror.password ? <span className='text-danger'> {valerror.password.message}</span> : null }<br></br>
                </div>
                <div className="mb-3">
                <label htmlFor="ciudad" className="form-label">Ciudad :</label>
                <input type="text" id='ciudad' className="form-control" onChange={e=>setCiudad(e.target.value)} value={city}/>
                {valerror.city ? <span className='text-danger'> {valerror.city.message}</span> : null }<br></br>
                </div>
                <div className="mb-3">
                <label htmlFor="describir" className="form-label">Descripcion :</label>
                <textarea className="form-control" id="describir" rows="4" onChange={e=>setDescription(e.target.value)} value={description}></textarea>
                {valerror.description ? <span className='text-danger'> {valerror.description.message}</span> : null }<br></br>
                </div>
                <div className="mb-3">
                <label htmlFor="servertipo" className='form-label'>Tipo de servidor : </label>
                <select className='form-select' id='servertipo' onChange={e=>setServertype(e.target.value)}>
                    <option>Seleccionar tipo de servidor</option>
                    <option value="Impresiones">Impresiones</option>
                    <option value="Correo">Correo</option>
                    <option value="Fax">Fax</option>
                    <option value="Telefonia">Telefonia</option>
                    <option value="Proxy">Proxy</option>
                    <option value="RAS">RAS</option>
                    <option value="Web">Web</option>
                    <option value="Base de datos">Base de datos</option>
                    <option value="Seguridad">Seguridad</option>
                    <option value="Otros">Otros</option>
                </select>
                {valerror.servertype ? <span className='text-danger'> {valerror.servertype.message}</span> : null }<br></br>
                </div>

            </div>
            <div className='col-4'>
            <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Direccion :</label>
                <input type="text" id='direccion' className="form-control" onChange={e=>setDirection(e.target.value)} value={direction}/>
                {valerror.direction ? <span className='text-danger'> {valerror.direction.message}</span> : null }<br></br>
            </div>
            <div className="mb-3">
                <label htmlFor="localizacion" className="form-label">Ubique el pin en la ubicacion de su Empresa :</label>
                <Mimapa onNewLocation={levantarLocation}/>
                {valerror.location ? <span className='text-danger'> {valerror.location.message}</span> : null }<br></br>
            </div>
            <div className="mb-3">
                <label htmlFor="racks" className="form-label">Nro de Racks :</label>
                <input type="number" id='racks' className="form-control" onChange={e=>setRacks(e.target.value)} value={racks}/>
                {valerror.racks ? <span className='text-danger'> {valerror.racks.message}</span> : null }<br></br>
            </div>
            </div>
            <div className='mb-3'>
                <input type="checkbox" onChange={handleCheck} checked={acuerdo}/>
                <label className='form-label mx-2' >Estoy de acuerdo con la creacion de la Empresa y Acepto los terminos y condiciones. He contactado previamente para la instalacion de 1 sensor por Rack</label>
                {valerror.acuerdo ? <span className='text-danger'> {valerror.acuerdo.message}</span> : null }<br></br>
            </div>
            <div className="row justify-content-evenly">
                <div className="col-4 d-flex justify-content-center text-center">
                    <button type="button" className='btnper ' onClick={Cancelhandler} >Cancelar</button>
                </div>
                <div className="col-4 d-flex justify-content-center text-center">
                    <input type="submit" className='btnper' value="Registrar Empresa"/>
                </div>
            </div>
            {(regExito) ? <p className='text-success'>Registro Exitoso</p> : ""}
         </form>

    </div>
  )
}

export default FormEmpresa
