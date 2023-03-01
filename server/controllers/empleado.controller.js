const Empleado = require('../models/empleado.model')
const Empresa = require('../models/empresa.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY
const newEmployee = (req,res)=>{
    const createdBy = req.params._id; //_id de la empresa

    Empresa.findById({_id : createdBy}).then(doc=>{

        Empleado.create({...req.body,createdBy})
    .then(nuevoEmpleado=> {
        const empleadoToken = jwt.sign({_id : nuevoEmpleado._id},SECRET)
        res.status(201).cookie('empleadoToken', empleadoToken, {httpOnly:true, expires:new Date(Date.now() + 90000)})
        .json({successMessage:"Empresa registrada ", empleado :nuevoEmpleado}) 
        //res.json(nuevoEmpleado)
    })
    .catch((err)=>{
        //console.log(err.code)
          if (err.code== 11000){
            console.log("Entro en error 11000 por duplicacion")
            return res.status(400).json({
                errors : {
                    message: "Duplicado",
                    //keyvalue : err.keyValue,
                    PropDuplicada : Object.keys(err.keyPattern)[0]
                }
            })
        }else{  
        return res.status(400).json(err)} //para que pueda llegar el error a axios de frontend
    })
    }).catch(err=>{
        res.status(400).json({
            message : "No se encontro la Empresa"
        })})

}

const allEmployees= (req,res)=>{
    console.log("entro para obtener todas los empleados")
    const Empresa_id = req.params._id;
    Empleado.find({
        createdBy : {
            _id : Empresa_id
        } 
        }).populate({path: 'createdBy',
    select: '_id name'})
    .then(allempleados=>res.json(allempleados))
    .catch(err=>res.json(err))
}

const borrarEmpleado = (req,res)=>{
        const id = req.params._id;
        Empleado.findByIdAndRemove({_id: id})
        .then(deleteado=>res.json(deleteado))
        .catch(err=>res.json(err))
    
}
const editarEmpleado = (req,res)=>{
    console.log("Entro a editar",req.body)
    const id = req.params._id;
    Empleado.findOneAndUpdate({_id : id},req.body,{runValidators:true})
    .then(empleadoedi=>res.json(empleadoedi))
    .catch(err=>{
        console.log(err)
        res.status(400).json(err)})
}

const oneEmpleado = (req,res)=>{
    const id = req.params._id;
    Empleado.findOne({_id: id}).populate({path: 'createdBy',
    select: '_id name'})
    .then((unempleado)=>res.json(unempleado))
    .catch(err=>res.json(err))
}

const loginEmpleado = (req,res)=>{
    console.log("Entro para logearse")
    Empleado.findOne({
        username : req.body.username
    }).then(unempleado=>{
        const passVal=  bcrypt.compare(req.body.accesscode,unempleado.accesscode)
            if(!passVal){
                res.status(400).json({error: "No se puede Ingresar"})}else{
                    console.log("entro en else")
                    const empleadoToken = jwt.sign({_id: unempleado._id},SECRET)
                    res.status(201).cookie('empleadoToken', empleadoToken, {httpOnly:true, expires:new Date(Date.now() + 90000)})
                    .json({successMessage:"Bienvenido ", empleado: unempleado})
                   }
    })
    .catch(err=>{
        console.log("entro en catch log")
                res.status(400).json({error: "No se puede Ingresar"}) //no queremos que se envie mucha informacion del error para que no pueda ser aprovechado
    })
}

const logOutEmpleado= (req,res)=>{
    console.log("entro para deslogear")
    res.clearCookie('empleadoToken')
    res.json({success:'Empleado salio'})
}
module.exports={
    newEmployee,
    allEmployees,
    borrarEmpleado,
    editarEmpleado,
    oneEmpleado,
    loginEmpleado,
    logOutEmpleado
}