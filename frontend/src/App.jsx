import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importación de componentes
import Menu from "./components/menu/Menu.jsx";
import Intro from "./components/intro/Intro.jsx";
import Login from "./components/login/Login.jsx";
import Registro from "./components/registro/Registro.jsx";
import Usuarios from "./components/usuarios/usuariosfrom"
import ReporteVentas from "./components/ReportVentas/reporteventas";
import Perfil from "./components/Perfil/perfil";
import Ajustes from "./components/Ajustes/ajustes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Intro />} />
        {/* Ruta de inicio */}
        <Route path="/intro" element={<Intro />} />

        {/* Menu principal */}
        <Route path="/menu" element={<Menu />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Registro */}
        <Route path="/registro" element={<Registro />} />

        {/*Usuarios*/}
        <Route path="/usuarios" element={<Usuarios/>} />

        {/*Reporte De Ventas*/}
        <Route path="/reporteventas" element={<ReporteVentas />} />

        {/*Perfil*/}
        <Route path="/perfil" element={<Perfil />} />

        {/*Ajustes*/}
        <Route path="/ajustes" element={<Ajustes />} />
      </Routes>
    </Router>
  );
}

export default App;