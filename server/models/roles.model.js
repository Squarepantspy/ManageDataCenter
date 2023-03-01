const mongoose= require('mongoose')
require('./empleado.model')
const RolSchema = new mongoose.Schema({
    rol : {
        type : String,
        required : [true, "Un rol debe ser proporcionado"]
    },
    rolstatus : {
        type : Boolean
    },
    createdFor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Empleado"
    }
},{timestamps: true});

module.exports = mongoose.model('Roles',RolSchema)
