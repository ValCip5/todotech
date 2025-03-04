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
    <h1>aca va el panel de admin</h1>
    <Footer />
    </>
  );
}