{/* Acá se ve el perfil del usuario:
    - Nombre completo
    - Correo
    - Contraseña
    - Comentarios (Se pueden eliminar)
    - Decidir si borrar usuario (Se eliminan los comentarios si se hace)
*/}

import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function examinarUsuario() {
  return (
    <>
    <Navbar />
    <h1>aca va el perfil del usuario</h1>
    <Footer />
    </>
  );
}