import React, { useEffect, useState } from "react";

const Perfil = () => {
    const idUsuario = 1; // ← Cambia esto por el ID que obtengas de login
    const [usuario, setUsuario] = useState({
        Nombre: "",
        Apellido: "",
        Correo: "",
        Usuario: "",
    });

    const [mensaje, setMensaje] = useState("");

    // Cargar datos del usuario cuando se abre la vista
    useEffect(() => {
        fetch(`http://localhost:3000/usuarios/${idUsuario}`)
            .then(res => res.json())
            .then(data => {
                setUsuario(data);
            })
            .catch(err => console.log("Error al cargar usuario:", err));
    }, []);

    // Manejar los cambios en los inputs
    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    // Guardar cambios (PUT al backend)
    const guardarCambios = () => {
        fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
        .then(res => res.json())
        .then(data => {
            setMensaje("Cambios guardados correctamente ✔️");
        })
        .catch(err => {
            console.log(err);
            setMensaje("Hubo un error al guardar los cambios ❌");
        });
    };

    return (
        <div className="perfil-container">
            <h2>Mi Perfil</h2>

            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="Nombre"
                    value={usuario.Nombre}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Apellido:</label>
                <input
                    type="text"
                    name="Apellido"
                    value={usuario.Apellido}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Correo:</label>
                <input
                    type="email"
                    name="Correo"
                    value={usuario.Correo}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Usuario:</label>
                <input
                    type="text"
                    name="Usuario"
                    value={usuario.Usuario}
                    onChange={handleChange}
                />
            </div>

            <button onClick={guardarCambios}>Guardar Cambios</button>

            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default Perfil;
