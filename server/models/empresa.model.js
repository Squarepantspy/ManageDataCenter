const mongoose = require('mongoose')
require('./empleado.model')
const bcrypt = require('bcrypt')
const EmpresaSchema=  new mongoose.Schema({
    name: {
        type : String,
        required:[true, "El nombre es requerido"],
        unique : true,
        sparse : true
    },
    email : {
        type : String,
        required : [true, "El email es requerido"],
        unique : true,
        sparse : true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Ingrese un email valido"
        }
    },
    password: {
        type: String,
        required: [true, "Contraseña es requerida"],
        minlength: [8, "Password debe ser de ocho caracteres o mayor"]
    },
    direction : {
        type : String,
        required : [true, "La direccion es requerida"]
    },
    location : {
        lat :{
            type : Number,
            required : [true, "No se especifico la localizacion"],
            min : [-90, "El minimo es -90"],
            max : [90, "Haz sobrepasado el maximo de 90"]
        },
        lng : {
            type : Number,
            required : [true, "No se especifico la localizacion"],
            min : [-180, "El minimo es -180"],
            max : [180, "Haz sobrepasado el maximo de 180"]
        }
    },
    city : {
        type: String,
        required : [true, "La ciudad es requerida"]
    },
    description : {
        type : String,
        required : [true, "Una descripcion es requerida"]
    },
    servertype: {
        type: String,
        enum: {
            values : ['Impresiones','Correo','Fax','Telefonia','Proxy','RAS','Web','Base de datos','Seguridad','Otros'],
            message : "Solo puedes elegir estos tipos de servidores a monitorear "
        }
    },
    acuerdo : {
        type: Boolean,
        enum : {
            value : true,
            message: "No haz aceptado el acuerdo"
        }
    },
    racks : {
        type : Number,
        min : [0, "El minimo es 0"],
        max : [2, "El maximo es 2"],
        required : [true, "El nro de racks es requerido"]
    }
},{timestamps : true})

EmpresaSchema.pre('save', async function(next){
    try{
        const hashedPassword = await bcrypt.hash(this.password,10)
        console.log("HASHED CONTRASENHA",hashedPassword)
        this.password = hashedPassword
        next()
    }catch{
        console.log("Error en guardar usuario",error)
    }
})

module.exports= mongoose.model("Empresas", EmpresaSchema)

