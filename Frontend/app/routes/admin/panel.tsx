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
