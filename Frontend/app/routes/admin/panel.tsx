{/* Acá se ve el panel del admin:
    - Tabla con todos los usuarios registrados por orden alfabetico
    - Puede buscar nombres de usuarios
    - Puede tocar el botón de examinar usuario, el cual lo lleva a examinarusuario.jsx
*/}

import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function panel() {
  return (
    <>
    <Navbar />
    <section className="panel width1240">
      <h2>Lista de usuarios</h2>
      <input type="text" placeholder="Buscar usuario"/>
      <table className="tablaPanel primero">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Usuario</th>
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Juan</td>
              <td>Perez</td>
              <td>juan@ceto</td>
              <td>juanceto01</td>
              <td>juanceto01</td>
              <td>
                <button>Examinar usuario</button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Juan</td>
              <td>Perez</td>
              <td>juan@ceto</td>
              <td>juanceto01</td>
              <td>juanceto01</td>
              <td>
                <button>Examinar usuario</button>
              </td>
            </tr>
          </tbody>
        </table>
    </section>
    <Footer />
    </>
  );
}