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

  // 🔥 NUEVO → Modal para métodos de pago
  const [ventasMetodo, setVentasMetodo] = useState(null);

  // 🔥 NUEVO → Datos ejemplo de productos vendidos por método
  const ventasPorMetodo = {
    QR: ["Cuaderno", "Esfero", "Colores"],
    Efectivo: ["Borrador", "Marcadores"],
    Datáfono: ["Cuaderno", "Regla"]
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/ventas/productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error cargando productos:", err));

    axios
      .get("http://localhost:4000/ventas/metodos-pago")
      .then((res) => setMetodosPago(res.data))
      .catch((err) => console.error("Error cargando métodos de pago:", err));
  }, []);

  const abrirModal = (producto) => setModalData(producto);
  const cerrarModal = () => setModalData(null);

  // 🔥 NUEVO: abrir modal según método de pago
  const abrirModalMetodo = (metodo) => setVentasMetodo(metodo);
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
            <li><a href="http://localhost:5173/usuarios">Usuarios</a></li>
            <li><a href="http://localhost:5173/registroinventario">Inventario</a></li>
            <li><a href="#">Registro De Ventas</a></li>
            <li><a href="http://localhost:5173/reporteventas">Reporte De Ventas</a></li>
            <li><a href="http://localhost:5173/registrogastos">Registro De Gastos</a></li>
            <li><a href="http://localhost:5173/reportegastos">Reporte De Gastos</a></li>
            <li><a href="http://localhost:5173/menureporte">Reporte De Ganancias</a></li>
            <li><a href="http://localhost:5173/ajustes">Ajustes</a></li>
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
                  cantidad: prod.Cantidad,
                  fecha: prod.Fecha || "Sin fecha",
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
          <>
            {/* Productos estáticos */}
            <button
              className="product-btn"
              onClick={() =>
                abrirModal({
                  producto: "Cuaderno",
                  precio: "3.000",
                  cantidad: "15",
                  fecha: "18/04/2025",
                  imagen: Cuaderno,
                })
              }
            >
              <img src={Cuaderno} alt="Cuaderno" className="img-producto" />
              <p className="texto-producto">Cuaderno</p>
            </button>

            <button
              className="product-btn"
              onClick={() =>
                abrirModal({
                  producto: "Esfero",
                  precio: "1.500",
                  cantidad: "10",
                  fecha: "18/04/2025",
                  imagen: Esfero,
                })
              }
            >
              <img src={Esfero} alt="Esfero" className="img-producto" />
              <p className="texto-producto">Esfero</p>
            </button>

            <button
              className="product-btn"
              onClick={() =>
                abrirModal({
                  producto: "Borrador",
                  precio: "500",
                  cantidad: "8",
                  fecha: "18/04/2025",
                  imagen: Borrador,
                })
              }
            >
              <img src={Borrador} alt="Borrador" className="img-producto" />
              <p className="texto-producto">Borrador</p>
            </button>
          </>
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
            <p><strong>Precio:</strong> {modalData.precio}</p>
            <p><strong>Cantidad comprada:</strong> {modalData.cantidad}</p>
            <p><strong>Fecha:</strong> {modalData.fecha}</p>
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
        <>
          <button
            className="pay-btn"
            onClick={() => abrirModalMetodo("QR")}
          >
            <img src={QR} alt="QR" className="icono-pago" />
            <p className="texto-pago">QR</p>
          </button>

          <button
            className="pay-btn"
            onClick={() => abrirModalMetodo("Efectivo")}
          >
            <img src={Efectivo} alt="Efectivo" className="icono-pago" />
            <p className="texto-pago">Efectivo</p>
          </button>

          <button
            className="pay-btn"
            onClick={() => abrirModalMetodo("Datáfono")}
          >
            <img src={Datafono} alt="Datáfono" className="icono-pago" />
            <p className="texto-pago">Datáfono</p>
          </button>
        </>
      </div>

      {/* 🔥 Nuevo modal: Productos vendidos por método */}
      {ventasMetodo && (
        <div className="modal" onClick={cerrarModalMetodo}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <span className="cerrar" onClick={cerrarModalMetodo}>&times;</span>

            <h2>Productos vendidos por {ventasMetodo}</h2>

            <ul>
              {ventasPorMetodo[ventasMetodo]?.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReporteVentas;
