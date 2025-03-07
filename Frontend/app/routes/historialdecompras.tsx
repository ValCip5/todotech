import type { Route } from "./+types/home";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function historialDeCompras() {
  return (
    <>
    <Navbar />
    <section className="historialCompras width1240">
      <h2>Historial de Compras</h2>
      <table className="tablaCompras">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Fecha de Compra</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Producto 1</td>
              <td>Descripción del producto 1</td>
              <td>
                <img src="url_de_la_imagen_1" alt="Producto 1" width="50" />
              </td>
              <td>01/03/2025</td>
              <td>
                $8000
              </td>
            </tr>
            <tr>
              <td>Producto 2</td>
              <td>Descripción del producto 2</td>
              <td>
                <img src="url_de_la_imagen_2" alt="Producto 2" width="50" />
              </td>
              <td>02/03/2025</td>
              <td>$8000</td>
            </tr>
          </tbody>
        </table>
    </section>
    <Footer />
    </>
  );
}