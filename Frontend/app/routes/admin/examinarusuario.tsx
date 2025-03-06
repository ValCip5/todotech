import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { checkAuthAdmin } from "../../utils/auth";

export async function clientLoader() {
  return checkAuthAdmin();
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function examinarUsuario() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalComentarioVisible, setModalComentarioVisible] = useState(false);

  const eliminarCuenta = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const aceptar = () => {
    setModalVisible(false);
  };

  const borrarComentario = () => {
    setModalComentarioVisible(true);
  };

  const cerrarModalComentario = () => {
    setModalComentarioVisible(false);
  };

  const aceptarComentario = () => {
    setModalComentarioVisible(false);
  };

  return (
    <>
    <Navbar />
    <section className="usuario width1240">
      <h2>aca van los detalles del usuario</h2>

      <table className="tablaExaminarUsuario primero">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nombre</td>
              <td>Juan</td>
              <td>Juan</td>
              <td>Juan</td>
              <td>Juan</td>
              <td>
                <button onClick={eliminarCuenta}>Eliminar cuenta</button>
              </td>
            </tr>
          </tbody>
        </table>

      <table className="tablaExaminarUsuario segundo">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Comentario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-03-04</td>
              <td>Este es un comentario de ejemplo.</td>
              <td>
                <button onClick={borrarComentario}>Borrar comentario</button>
              </td>
            </tr>
            {/* Agrega más filas según sea necesario */}
          </tbody>
        </table>
    </section>

    {modalVisible && (
        <div className="modal">
          <div className="modalContenido">
            <span className="cerrar" onClick={cerrarModal}>&times;</span>
            <h2>¿Estás seguro de borrar esta cuenta?</h2>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modalAcciones">
              <button onClick={aceptar}>Aceptar</button>
              <button onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

{modalComentarioVisible && (
        <div className="modal">
          <div className="modalContenido">
            <span className="cerrar" onClick={cerrarModalComentario}>&times;</span>
            <h2>¿Estás seguro que deseas borrar este comentario?</h2>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modalAcciones">
              <button onClick={aceptarComentario}>Aceptar</button>
              <button onClick={cerrarModalComentario}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

    <Footer />
    </>
  );
}