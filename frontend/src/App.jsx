import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importación de componentes
import Menu from "./components/menu/Menu.jsx";
import Intro from "./components/intro/Intro.jsx";
import Login from "./components/login/Login.jsx";
import Registro from "./components/registro/Registro.jsx";
import ReporteVentas from "./components/ReportVentas/reporteventas.jsx";
import Perfil from "./components/Perfil/perfil.jsx";
import Ajustes from "./components/Ajustes/ajustes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta principal */}
        <Route path="/" element={<Intro />} />

        {/* Intro */}
        <Route path="/intro" element={<Intro />} />

        {/* Menú principal */}
        <Route path="/menu" element={<Menu />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Reporte de ventas */}
        <Route path="/reporteventas" element={<ReporteVentas />} />

        {/* Perfil */}
        <Route path="/perfil" element={<Perfil />} />

        {/* Ajustes */}
        <Route path="/ajustes" element={<Ajustes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
