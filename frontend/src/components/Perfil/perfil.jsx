// src/components/Perfil.jsx
import React, { useState, useEffect } from "react";
import "./perfil.css";
import LogoEmpren from "../../assets/Logo_Empren.png";

const API_URL = "http://localhost:4000";

const Perfil = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    usuario: "",
    imagen: "https://via.placeholder.com/100?text=+",
    imagenFile: null,
  });

  // 🔹 useEffect correctamente dentro del componente
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      nombre: "",
      apellido: "",
      correo: "",
      usuario: "",
    }));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFormData({
        ...formData,
        imagen: URL.createObjectURL(archivo),
        imagenFile: archivo,
      });
    }
  };

  // 🔹 GUARDAR CAMBIOS (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (formData.imagenFile) {
        const fd = new FormData();
        fd.append("nombre", formData.nombre);
        fd.append("apellido", formData.apellido);
        fd.append("correo", formData.correo);
        fd.append("imagen", formData.imagenFile);

        res = await fetch(`${API_URL}/perfil/${formData.usuario}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        res = await fetch(`${API_URL}/perfil/${formData.usuario}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo: formData.correo,
          }),
        });
      }

      const data = await res.json();
      alert(data.message || "Perfil actualizado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al guardar los cambios");
    }
  };

  // 🔹 ELIMINAR CUENTA (DELETE)
  const handleEliminar = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar la cuenta?")) return;

    try {
      const res = await fetch(`${API_URL}/perfil/${formData.usuario}`, {
        method: "DELETE",
      });

      await res.json();
      alert("Cuenta eliminada");
      window.location.href = "/registro";
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la cuenta");
    }
  };

  const handleCerrarSesion = () => {
    window.location.href = "/login";
  };

  return (
    <div>
      {/* BARRA SUPERIOR */}
      <header className="barra-superior">
        <div className="Lineas" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`top_line common ${menuOpen ? "rotate-down" : ""}`}></span>
          <span className={`middle_line common ${menuOpen ? "hidden" : ""}`}></span>
          <span className={`bottom_line common ${menuOpen ? "rotate-up" : ""}`}></span>
        </div>

        <img src={LogoEmpren} alt="Logo" className="logoem" />
      </header>

      {/* MENÚ LATERAL */}
      <div className={`Menu ${menuOpen ? "open" : ""}`}>
        <h1 className="menu_titulo">Menú</h1>
        <ul>
          <li><a href="http://localhost:5173/usuarios"><i className="fas fa-user"></i>Usuarios</a></li>
          <li><a href="http://localhost:5173/registroinventario"><i className="fas fa-clipboard-list"></i>Inventario</a></li>
          <li><a href="#"><i className="fas fa-cart-plus"></i>Registro De Ventas</a></li>
          <li><a href="http://localhost:5173/reporteventas"><i className="fas fa-chart-line"></i>Reporte De Ventas</a></li>
          <li><a href="http://localhost:5173/registrogastos"><i className="fas fa-wallet"></i>Registro De Gastos</a></li>
          <li><a href="http://localhost:5173/reportegastos"><i className="fas fa-file-invoice-dollar"></i>Reporte De Gastos</a></li>
          <li><a href="http://localhost:5173/menureporte"><i className="fas fa-dollar-sign"></i>Reporte De Ganancias</a></li>
          <li><a href="http://localhost:5173/ajustes"><i className="fas fa-cogs"></i>Ajustes</a></li>
        </ul>
      </div>

      {/* FORMULARIO */}
      <div className="contenedor">
        <h2>Mi Perfil</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input id="nombre" value={formData.nombre} onChange={handleChange} required />

          <label htmlFor="apellido">Apellido:</label>
          <input id="apellido" value={formData.apellido} onChange={handleChange} required />

          <label htmlFor="correo">Correo:</label>
          <input id="correo" type="email" value={formData.correo} onChange={handleChange} required />

          <label htmlFor="usuario">Usuario:</label>
          <input id="usuario" value={formData.usuario} onChange={handleChange} required />

          <label htmlFor="imagenInput">
            <img src={formData.imagen} alt="foto perfil" width="100" />
          </label>

          <input
            type="file"
            id="imagenInput"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button type="submit" className="btn-guardar">Guardar cambios</button>
          <button type="button" className="btn-eliminar" onClick={handleEliminar}>Eliminar cuenta</button>
          <button type="button" className="btn-cerrar" onClick={handleCerrarSesion}>Cerrar sesión</button>

          <a href="/ajustes" className="btn-volver">Volver a Ajustes</a>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
