const express = require('express')
const cors = require('cors')
const app= express();
const PORT = 8000;
require('dotenv').config()
const cookieParser=require('cookie-parser')
const SerialPort = require('serialport').SerialPort;
const {DelimiterParser} = require('@serialport/parser-delimiter')//un delimitador que me diga hasta donde(string) quiere recibir un dato serial
// SOCKET 
const socket = require('socket.io')  
// Create a port
const puerto = new SerialPort({
    path: 'COM3',
    baudRate: 9600
  })
const parser = puerto.pipe(new DelimiterParser({ delimiter : '\n'}))
//importamos config de la base de datos
require('./config/mongoose.config')


//middleware para consultas post
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//conexion al front end
app.use(cors({
    origin: 'http://localhost:3000',
    credentials : true
}))


//se requiere las rutas
require('./routes/empleado.routes')(app);
require('./routes/empresa.routes')(app);
require('./routes/roles.routes')(app);

//conexion al servidor
const server = app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


//SERIAL PORT transferencia de datos con arduino via serial
//data es un buffer
const onDataCallback = (buffer)=>{
    let data = JSON.parse(buffer.toString())
    
    if (data.sensor == 1){
        console.log('Los datos del sensor 1 son ', data)
        io.emit('sensor1', data);
    }else if(data.sensor == 2){
        io.emit('sensor2', data);
        console.log('Los datos del sensor 2 son ', data)
    }
     
}

//se abre el puerto serial
puerto.on('open',()=>{
    console.log("Conexion abierta al puerto serial")
})
// cuando se recibe dato se activa la funcion callback recibiendo un argumento buffer de entrada
parser.on('data',onDataCallback)



parser.on('error',(err)=>{
    console.log(err)
})

// configuracion cabecera socket
const io = socket(server, {
    cors:{
        origin:'*',
        methods:['GET', 'POST']
    }
})

io.on('connection', (socket)=>{
    console.log(" usuario conectado",socket.id)
    //evento alerta
    socket.on("alerta", (dato)=>{
        console.log("Temp de alerta es ", dato)
        
    })

    socket.on('disconnect', (socket)=>{
        console.log(`el usuario con id ${socket.id} acaba de desconectarse`)
    })
    
    //io.disconnectSockets();
})
