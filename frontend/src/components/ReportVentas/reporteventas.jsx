import { useState, useEffect } from "react";
import axios from "axios";
import "./reporteventas.css";

// imágenes
import LogoEmpren from "../../assets/Logo_Empren.png";
import Cuaderno from "../../assets/Cuaderno_nuevo.png";
import Esfero from "../../assets/Esfero.png";
import Borrador from "../../assets/Borrador_nuevo.png";
import QR from "../../assets/Codigo_QR.png";
import Efectivo from "../../assets/Efectivo.png";
import Datafono from "../../assets/Datafono.png";

function ReporteVentas() {
  const [modalData, setModalData] = useState(null);
  const [productos, setProductos] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);

  // Modal para productos vendidos por método
  const [ventasMetodo, setVentasMetodo] = useState(null);
  const [ventasMetodoData, setVentasMetodoData] = useState([]);

  useEffect(() => {
    // Obtener productos reales
    axios
      .get("http://localhost:4000/api/productos") // URL corregida
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error cargando productos:", err));

    // Obtener métodos de pago reales
    axios
      .get("http://localhost:4000/api/metodopago") // URL corregida
      .then((res) => setMetodosPago(res.data))
      .catch((err) => console.error("Error cargando métodos de pago:", err));
  }, []);

  const abrirModal = (producto) => setModalData(producto);
  const cerrarModal = () => setModalData(null);

  // Modal de productos por método de pago
  const abrirModalMetodo = (metodoId) => {
    axios
      .get(`http://localhost:4000/api/reporteventas/metodo/${metodoId}`) 
      // Aquí asumo que tu backend sí tiene este endpoint para filtrar ventas por método
      .then((res) => {
        setVentasMetodoData(res.data);
        setVentasMetodo(metodoId);
      })
      .catch((err) =>
        console.error("Error cargando productos por método:", err)
      );
  };
  const cerrarModalMetodo = () => setVentasMetodo(null);

  return (
    <div>
      {/* Barra superior */}
      <header className="barra-superior">
        <img src={LogoEmpren} alt="Logo" className="logoem" />
      </header>

      {/* Menú lateral */}
      <label>
        <input className="lineas-check" type="checkbox" />
        <div className="Lineas">
          <span className="top_line common"></span>
          <span className="middle_line common"></span>
          <span className="bottom_line common"></span>
        </div>

        <div className="Menu">
          <h1 className="menu_titulo">Menú</h1>
          <ul>
            <li>
              <a href="http://localhost:5173/registroinventario">Inventario</a>
            </li>
            <li>
              <a href="#">Registro De Ventas</a>
            </li>
            <li>
              <a href="http://localhost:5173/reporteventas">
                Reporte De Ventas
              </a>
            </li>
            <li>
              <a href="http://localhost:5173/registrogastos">Registro De Gastos</a>
            </li>
            <li>
              <a href="http://localhost:5173/reportegastos">Reporte De Gastos</a>
            </li>
            <li>
              <a href="http://localhost:5173/menureporte">Reporte De Ganancias</a>
            </li>
            <li>
              <a href="http://localhost:5173/ajustes">Ajustes</a>
            </li>
          </ul>
        </div>
      </label>

      {/* Título */}
      <h1 className="Titulo">Reporte Ventas</h1>
      <hr />

      {/* Productos */}
      <h1 className="Titulo">Productos:</h1>
      <div className="products">
        {productos.length > 0 ? (
          productos.map((prod, index) => (
            <button
              key={index}
              className="product-btn"
              onClick={() =>
                abrirModal({
                  producto: prod.Nombre,
                  precio: prod.Precio,
                  cantidad: prod.Cantidad || "N/A",
                  fecha: prod.Fecha_Venta || "Sin fecha",
                  imagen: prod.Imagen || Cuaderno,
                })
              }
            >
              <img
                src={prod.Imagen || Cuaderno}
                alt={prod.Nombre}
                className="img-producto"
              />
              <p className="texto-producto">{prod.Nombre}</p>
            </button>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>

      {/* Modal de producto */}
      {modalData && (
        <div className="modal" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <span className="cerrar" onClick={cerrarModal}>
              &times;
            </span>
            <h2>{modalData.producto}</h2>
            <p>
              <strong>Precio:</strong> {modalData.precio}
            </p>
            <p>
              <strong>Cantidad comprada:</strong> {modalData.cantidad}
            </p>
            <p>
              <strong>Fecha:</strong> {modalData.fecha}
            </p>
            <img
              src={modalData.imagen}
              alt={modalData.producto}
              className="img-modal"
            />
          </div>
        </div>
      )}

      {/* Métodos de pago */}
      <h2 className="subtitle">Método de pago:</h2>
      <div className="payments">
        {metodosPago.length > 0 ? (
          metodosPago.map((m) => (
            <button
              key={m.Id_Metodo}
              className="pay-btn"
              onClick={() => abrirModalMetodo(m.Id_Metodo)}
            >
              <p className="texto-pago">{m.Nombre}</p>
            </button>
          ))
        ) : (
          <p>Cargando métodos de pago...</p>
        )}
      </div>

      {/* Modal de productos por método */}
      {ventasMetodo && (
        <div className="modal" onClick={cerrarModalMetodo}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <span className="cerrar" onClick={cerrarModalMetodo}>
              &times;
            </span>
            <h2>Productos vendidos con ID: {ventasMetodo}</h2>

            <ul>
              {ventasMetodoData.length > 0 ? (
                ventasMetodoData.map((p, i) => (
                  <li key={i}>
                    {p.Nombre} - Precio: {p.Precio} - Fecha: {p.Fecha_Venta}
                  </li>
                ))
              ) : (
                <li>No hay ventas registradas</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReporteVentas;
