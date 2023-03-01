import React from 'react'

import serverimg from "../static/img/servers.jpg"
import Button from './Button'
const Sinpermiso = () => {
  return (<>
    <div className='navbar-home fourth-color'>
        <div className="d-flex flex-row">
        <img src={serverimg} className= "logo" alt="esta es la imagen" />
        <h2>Protect Data Center</h2>
        </div>
        <div className="navbar-navegation">
        <Button ruta="/" texto="Home" />
        </div>
        </div>
        <div className="container text-danger col-4 mt-4">
        <div className="card bg-dark">
                <div className="card-header text-center">ERROR : 401 </div>
                <div className="card-body">
                    <p className='text-center'>No tienes permiso para acceder aqui</p>
                </div>
        </div>
        </div>
        </>
  )
}

export default Sinpermiso