# Proyecto Data Center Protect

## Para inicializar el proyecto se deben seguir los siguientes pasos

1. Cargar el archivo sensores.ino a un microcontrolador de su preferencia en c++ que se encuentra en la carpeta server/arduino
2. En administrador de dispositivos verificar el puerto COM al cual esta vinculado
3. En caso de que no sea COM3 editar el archivo server.js en la llave path al definir el serialport
4. Ingresar en la carpeta server y dar npm install, luego correr nodemon server.js o node server.js
5. Ingresar en la carpeta client y dar npm install, luego correr con npm start


obs No se olvide de crear un archivo .env y proporcionar una SECRET_KEY
