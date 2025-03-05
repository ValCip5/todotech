import type { Route } from "./+types/home";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function login() {
  return (
    <>
    <Navbar />
    <section className="seccionLogin width1240">
        <h2>Bienvenido de vuelta a TodoTech</h2>
        <form className="formularioLogin">
          <div className="grupoFormulario">
            <label htmlFor="username">Usuario</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
    <Footer />
    </>
  );
}