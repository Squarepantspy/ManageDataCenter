const mongoose = require('mongoose')
require('./empresa.model')
const bcrypt = require('bcrypt')
const EmpleadoSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : [true, "El nombre es requerido"]
    },
    lastName : {
        type : String,
        required : [true, "Apellido es requerido"]
    },
    accesscode : {
        type : String,
        required : [true, "El codigo de acceso debe ser proporcionado"]
    },
    username: {
        type : String,
        required : [true, "El usuario es necesario"],
        unique : true
    },
    cargo : {
        type : String,
        required : [true, "El cargo debe ser proporcionado"]
    },
    likes : {
        type : Number
    },
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Empresas"
    }
},{timestamps: true});
EmpleadoSchema.pre('save', async function(next){
    try{
        const hashedPassword = await bcrypt.hash(this.accesscode,10)
        console.log("HASHED CONTRASENHA",hashedPassword)
        this.accesscode = hashedPassword
        next()
    }catch{
        console.log("Error en guardar usuario",error)
    }
})
module.exports = mongoose.model('Empleado',EmpleadoSchema)