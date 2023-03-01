const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/DataCenter',{
    useNewUrlParser : true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Conexion establecida con MongoDB")})
.catch(error=>console.log("Algo salio mal al conectar con MongoDB"))