//se importa el controlador
const Rolescontroller = require('../controllers/roles.controller')

module.exports=(app)=>{
    app.post("/api/roles/:_id/newRol",Rolescontroller.newRol);
    app.get("/api/roles/:_id/allRoles",Rolescontroller.allRol);
    app.delete("/api/rol/:_id/delete",Rolescontroller.borrarRol);
    app.put("/api/rol/:_id/edit",Rolescontroller.editarRol);
    app.get("/api/rol/:_id/oneRole",Rolescontroller.oneRol);
}