const Rol = require('../models/roles.model')
//const Empresa = require('../models/empresa.model')
const Empleado = require('../models/empleado.model')

const newRol = (req,res)=>{
    const createdFor = req.params._id; //_id del empleado
    
    Empleado.findById({_id : createdFor}).then((doc)=>{
        
        Rol.create({...req.body,createdFor})
    .then(nuevoRol=> {
        res.json(nuevoRol)})
    .catch((err)=>{
        console.log(err)
        res.status(400).json(err) //para que pueda llegar el error a axios de frontend
    })
    }).catch(err=>{
        res.status(400).json({
            message : "No se encontro el Empleado"
        })
    })
    
}
    


const allRol= (req,res)=>{
    const Empleado_id = req.params._id;
    Rol.find({
        createdFor : {
            _id : Empleado_id
        } 
        }).populate({path: 'createdFor',
    select: '_id firstName lastName'})
    .then(allRoles=>res.json(allRoles))
    .catch(err=>res.json(err))
}
const borrarRol = (req,res)=>{
    const id = req.params._id;
    Rol.findByIdAndRemove({_id: id})
    .then(deleteado=>res.json(deleteado))
    .catch(err=>res.json(err))

}
const editarRol = (req,res)=>{
console.log("Entro a editar",req.body)
const id = req.params._id;
Rol.findOneAndUpdate({_id : id},req.body,{runValidators:true})
.then(roledi=>res.json(roledi))
.catch(err=>{
    console.log(err)
    res.status(400).json(err)})
}

const oneRol= (req,res)=>{
    const id = req.params._id;
    Rol.findOne({_id: id})
    .populate({path: 'createdFor',
    select: '_id firstName lastName'})
    .then((unrol)=>res.json(unrol))
    .catch(err=>res.json(err))

}
module.exports={
    newRol,
    allRol,
    borrarRol,
    editarRol,
    oneRol
}