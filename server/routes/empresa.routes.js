//se importa el controlador
const Empresacontroller = require('../controllers/empresa.controller')
const {authenticate} = require('../config/jwt.config')
module.exports=(app)=>{
    app.post("/api/newEmpresa",Empresacontroller.newEmpresa);
    app.get("/api/allEmpresas",authenticate,Empresacontroller.allEmpresas);
    app.post("/api/empresa/login",Empresacontroller.loginEmpresa);
    app.get("/logout/empresa",Empresacontroller.logoutEmpresa);
    app.get("/api/empresa/:_id",authenticate,Empresacontroller.oneEmpresa);
}