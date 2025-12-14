import { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Modal } from "react-bootstrap"; 
import "./reporteventas.css";

// imágenes
import LogoEmpren from "../../assets/Logo_Empren.png";
import Cuaderno from "../../assets/Cuaderno_nuevo.png";

function ReporteVentas() {
  const [modalData, setModalData] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      // 🔹 CAMBIO MÍNIMO: endpoint correcto
      .get("http://localhost:4000/api/reporteventas")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const abrirModal = (producto) => setModalData(producto);
  const cerrarModal = () => setModalData(null);

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
            <li><a href="http://localhost:5173/registroinventario">Inventario</a></li>
            <li><a href="#">Registro De Ventas</a></li>
            <li><a href="http://localhost:5173/reporteventas">Reporte De Ventas</a></li>
            <li><a href="http://localhost:5173/ajustes">Ajustes</a></li>
          </ul>
        </div>
      </label>

      {/* Título */}
      <h1 className="Titulo">Reporte Ventas</h1>
      <hr />

      {/* Productos en carrusel */}
      <h1 className="Titulo">Productos:</h1>
      {productos.length > 0 ? (
        <Carousel 
          interval={null} 
          controls={true} 
          indicators={false} 
          className="products-carousel"
        >
          {productos.map((prod, index) => (
            <Carousel.Item key={index}>
              <img
                src={prod.Imagen || Cuaderno}
                alt={prod.Producto || prod.Nombre}
                className="d-block w-100 img-producto"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  abrirModal({
                    producto: prod.Producto || prod.Nombre,
                    precio: prod.Precio,
                    // 🔹 CAMBIOS EXACTOS AQUÍ
                    cantidad: prod.Cantidad ?? "N/A",
                    fecha: prod.Fecha_Venta ?? "Sin fecha",
                    imagen: prod.Imagen || Cuaderno,
                    metodoPago: prod.MetodoPago ?? "No especificado"
                  })
                }
              />
              <Carousel.Caption>
                <h5>{prod.Producto || prod.Nombre}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>Cargando productos...</p>
      )}

      {/* Modal de producto dinámico */}
      <Modal show={!!modalData} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData?.producto}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Precio:</strong> {modalData?.precio}</p>
          <p><strong>Cantidad comprada:</strong> {modalData?.cantidad}</p>
          <p><strong>Fecha:</strong> {modalData?.fecha}</p>
          <p><strong>Método de pago:</strong> {modalData?.metodoPago}</p>
          <img
            src={modalData?.imagen}
            alt={modalData?.producto}
            className="img-modal"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ReporteVentas;
