//se importa el controlador
const Rolescontroller = require('../controllers/roles.controller')
const {authenticate}= require('../config/jwt.config')
module.exports=(app)=>{
    app.post("/api/roles/:_id/newRol",authenticate,Rolescontroller.newRol);
    app.get("/api/roles/:_id/allRoles",authenticate,Rolescontroller.allRol);
    app.delete("/api/rol/:_id/delete",authenticate,Rolescontroller.borrarRol);
    app.put("/api/rol/:_id/edit",authenticate,Rolescontroller.editarRol);
    app.get("/api/rol/:_id/oneRole",authenticate,Rolescontroller.oneRol);
}