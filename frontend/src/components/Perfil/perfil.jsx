// src/components/Perfil.jsx
import React, { useState, useEffect } from "react";
import "./perfil.css";
import LogoEmpren from "../../assets/Logo_Empren.png";

const API_URL = "http://localhost:4000/api/perfil";

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

  // =============================
  //     CARGAR DATOS DEL PERFIL
  // =============================
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario_actual");

    if (!usuarioGuardado) {
      console.warn("⚠ No hay usuario guardado en localStorage");
      return;
    }

    fetch(`${API_URL}/${usuarioGuardado}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          nombre: data.Nombre,
          apellido: data.Apellido,
          correo: data.Correo,
          usuario: data.Usuario,
          imagen: data.Imagen || "https://via.placeholder.com/100?text=+",
          imagenFile: null,
        });
      })
      .catch((err) => console.log("Error cargando perfil:", err));
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

  // =============================
  //     GUARDAR CAMBIOS
  // =============================
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

        res = await fetch(`${API_URL}/${formData.usuario}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        res = await fetch(`${API_URL}/${formData.usuario}`, {
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
      alert(data.message || "Perfil actualizado");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar.");
    }
  };

  // =============================
  //     ELIMINAR CUENTA
  // =============================
  const handleEliminar = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar la cuenta?")) return;

    try {
      const res = await fetch(`${API_URL}/${formData.usuario}`, {
        method: "DELETE",
      });

      await res.json();
      window.location.href = "/registro";
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al eliminar la cuenta.");
    }
  };

  const handleCerrarSesion = () => {
    window.location.href = "/login";
  };

  return (
    <div>
      {/* Barra superior */}
      <header className="barra-superior">
        <div className="Lineas" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`top_line common ${menuOpen ? "rotate-down" : ""}`}></span>
          <span className={`middle_line common ${menuOpen ? "hidden" : ""}`}></span>
          <span className={`bottom_line common ${menuOpen ? "rotate-up" : ""}`}></span>
        </div>

        <img src={LogoEmpren} alt="Logo" className="logoem" />
      </header>

      {/* Menú lateral */}
      <div className={`Menu ${menuOpen ? "open" : ""}`}>
        <h1 className="menu_titulo">Menú</h1>
        <ul>
          <li><a href="http://localhost:5173/registroinventario"><i className="fas fa-clipboard-list"></i>Inventario</a></li>
          <li><a href="#"><i className="fas fa-cart-plus"></i>Registro De Ventas</a></li>
          <li><a href="http://localhost:5173/reporteventas"><i className="fas fa-chart-line"></i>Reporte De Ventas</a></li>
          <li><a href="http://localhost:5173/registrogastos"><i className="fas fa-wallet"></i>Registro De Gastos</a></li>
          <li><a href="http://localhost:5173/reportegastos"><i className="fas fa-file-invoice-dollar"></i>Reporte De Gastos</a></li>
          <li><a href="http://localhost:5173/menureporte"><i className="fas fa-dollar-sign"></i>Reporte De Ganancias</a></li>
          <li><a href="http://localhost:5173/ajustes"><i className="fas fa-cogs"></i>Ajustes</a></li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="contenedor">
        <h2>Mi Perfil</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} required />

          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" value={formData.apellido} onChange={handleChange} required />

          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" value={formData.correo} onChange={handleChange} required />

          <label htmlFor="usuario">Usuario:</label>
          <input type="text" id="usuario" value={formData.usuario} onChange={handleChange} required />

          <label htmlFor="imagenInput" className="image-label">
            <img src={formData.imagen} alt="foto perfil" width="100" />
          </label>

          <input type="file" id="imagenInput" accept="image/*" onChange={handleImageChange} />

          <button type="submit" className="btn-guardar">Guardar cambios</button>
          <button type="button" onClick={handleEliminar} className="btn-eliminar">Eliminar cuenta</button>
          <button type="button" onClick={handleCerrarSesion} className="btn-cerrar">Cerrar sesión</button>

          <a href="/ajustes" className="btn-volver">Volver a Ajustes</a>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
