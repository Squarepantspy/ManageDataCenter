const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports.authenticate = (req,res,next) => {
    //console.log("Entor en autenticacion",req.headers)
     console.log("cookies",req.cookies)
     if (req.cookies.empresaToken){
        console.log("Entro para verificiar token de empresa")
    jwt.verify(req.cookies.empresaToken,SECRET,(err,payload)=>{
        if(err){
            console.log('authentication error',err)
            res.status(401).json({verified:false})
        }else{
            console.log('authenticated!')
            next()
        }
    })}else if (req.cookies.empleadoToken){
        console.log("Entro para verificiar token de empleado")
        jwt.verify(req.cookies.empleadoToken,SECRET,(err,payload)=>{
            if(err){
                console.log('authentication error',err)
                res.status(401).json({verified:false})
            }else{
                console.log('authenticated!')
                next()
            }
        })
    }
}