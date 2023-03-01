import React from 'react'
import Button from './Button'
import serverimg from "../static/img/servers.jpg"
const Header = () => {
  return (
    <div className='navbar-home fourth-color'>
        <div className="d-flex flex-row">
        <img src={serverimg} className= "logo" alt="esta es la imagen" />
        <h2>Protect Data Center</h2>
        </div>
        <div className="navbar-navegation">
        <Button ruta="/empresa/login" texto="Login Empresa"/>
        <Button ruta="/empleado/login" texto="Login Empleado"/>
        </div>
    </div>
  )
}

export default Header