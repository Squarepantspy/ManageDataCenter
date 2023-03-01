const Empresa = require('../models/empresa.model')
//importar bcrypt jwt 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY
const newEmpresa = (req,res)=>{
    console.log(req.body)

    Empresa.create(req.body)
    .then(nuevaEmpresa=> {
        const empresaToken = jwt.sign({_id : nuevaEmpresa._id},SECRET)
        res.status(201).cookie('empresaToken', empresaToken, {httpOnly:true, expires:new Date(Date.now() + 90000)})
        .json({successMessage:"Empresa registrada ", empresa :nuevaEmpresa}) 
        //res.status(201).json(nuevaEmpresa)
        })
    .catch((err)=>{
        console.log(err)
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
        return res.status(400).json(err)
            //res.status(401).json(err)
    } //para que pueda llegar el error a axios de frontend
    })
}

const allEmpresas= (req,res)=>{
    Empresa.find({})
    .then(allempresas=>res.json(allempresas))
    .catch(err=>res.json(err))
}
const loginEmpresa = (req,res)=>{
    console.log("Entro para logearse")
    Empresa.findOne({
        email : req.body.email
    }).then(unaempresa=>{
        const passVal=  bcrypt.compare(req.body.password,unaempresa.password)
            if(!passVal){
                res.status(400).json({error: "No se puede Ingresar"})}else{
                    console.log("entro en else")
                    const empresaToken = jwt.sign({_id: unaempresa._id},SECRET)
                    res.status(201).cookie('empresaToken', empresaToken, {httpOnly:true, expires:new Date(Date.now() + 90000)})
                    .json({successMessage:"Bienvenido ", empresa: unaempresa})
                   }
    })
    .catch(err=>{
        console.log("entro en catch log")
                res.status(400).json({error: "No se puede Ingresar"}) //no queremos que se envie mucha informacion del error para que no pueda ser aprovechado
    })


}
const oneEmpresa = (req,res)=>{
    
        const id = req.params._id;
        Empresa.findOne({_id: id})
        .then((unaEmpresa)=>res.json(unaEmpresa))
        .catch(err=>res.json(err))
    
}
const logoutEmpresa = (req,res)=>{
        res.clearCookie('empresaToken')
        res.json({success:'Empresa salio'})
}


module.exports={
    newEmpresa,
    allEmpresas,
    loginEmpresa,
    oneEmpresa,
    logoutEmpresa
}