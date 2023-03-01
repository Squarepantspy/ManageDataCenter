import serverimg from "../static/img/servers.jpg"
import Button from './Button'

import React from 'react'

const Noexiste = () => {
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
                <div className="card-header text-center">ERROR :  </div>
                <div className="card-body">
                    <p className='text-center'>No existe en nuestra base de datos</p>
                </div>
        </div>
        </div>
        </>
  )
}

export default Noexiste