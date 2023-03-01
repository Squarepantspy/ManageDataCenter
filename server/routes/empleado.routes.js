//se importa el controlador
const Empleadocontroller = require('../controllers/empleado.controller')
const {authenticate} = require('../config/jwt.config')
module.exports=(app)=>{
    app.post("/api/:_id/newEmployee",authenticate,Empleadocontroller.newEmployee);
    app.get("/api/:_id/allEmployess",authenticate,Empleadocontroller.allEmployees);
    app.delete("/api/empleado/:_id/delete",authenticate,Empleadocontroller.borrarEmpleado);
    app.put("/api/:_id/editEmployee",authenticate,Empleadocontroller.editarEmpleado);
    app.get("/api/empleado/:_id",authenticate,Empleadocontroller.oneEmpleado);
    app.post("/api/empleado/login",Empleadocontroller.loginEmpleado);
    app.get('/logout/empleado', Empleadocontroller.logOutEmpleado); 

}