
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import LoginEmpresa from './components/LoginEmpresa';
import MainEmpresa from './components/MainEmpresa';
import EditarEmpleado from './components/EditarEmpleado';
import CrearEmpleado from './components/CrearEmpleado';
import Roles from './components/Roles';
import EditarRol from './components/EditarRol';
import LoginEmpleado from './components/LoginEmpleado';
import MainEmpleado from './components/MainEmpleado';
import Monitor from './components/Monitor';
import Empleados from './components/Empleados';


function App() {

   
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/empresa/login" element={<LoginEmpresa/>}/>
          <Route path="/empleado/login" element={<LoginEmpleado/>}/>
          <Route path="/empresa/:id/main" element={<MainEmpresa/>}/>
          <Route path="/empleado/:id/main" element={<MainEmpleado/>}/>
          <Route path="/editar/empleado/:id" element={<EditarEmpleado/>}/>
          <Route path="/crear/:id/empleado" element={<CrearEmpleado/>}/>
          <Route path="/rol/:id/editar" element={<EditarRol/>}/>
          <Route path="/roles/:id" element={<Roles/>}/>
          <Route path="/:id/monitor" element={<Monitor/>}/>
          <Route path="/:id/empleados" element={<Empleados/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
