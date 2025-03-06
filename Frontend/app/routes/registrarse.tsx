import type { Route } from "./+types/home";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function registrarse() {
  return (
    <>
    <Navbar />
    <section className="seccionRegistrarse width1240">
        <h2>Te damos la bienvenida a TodoTech</h2>
        <form className="formularioRegistrarse">
          <div className="grupoFormulario">
            <label htmlFor="username">Usuario</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="surname">Apellido</label>
            <input type="text" id="surname" name="surname" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </section>
    <Footer />
    </>
  );
}