import React from 'react'
import { NavLink} from 'react-router-dom';
const Button = ({ruta,texto}) => {
  return (
        <NavLink to={ruta} className='btnper' >{texto}</NavLink>
    
  )
}

export default Button