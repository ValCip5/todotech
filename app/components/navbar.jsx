import { useState } from "react";
import { NavLink } from "react-router";

export function Navbar() {
    const [carritoAbierto, setCarritoAbierto] = useState(false);

  return (
    <header>
        <h1>TodoTech</h1>
    <nav>
      <ul>
        <div className="rutas">
            <NavLink to="/">Home</NavLink>
            <li>Nosotros</li>
            <li>Productos</li>
        </div>
        <div className="acciones">
            <NavLink to="/login">Log in</NavLink> {/*Cambia a Log out al iniciar sesión*/}
            <NavLink to="/registrarse">Registrarse</NavLink> {/*Solo aparece al no estar en sesión*/}
            <button onClick={() => setCarritoAbierto(true)}>Carrito {/*Solo se puede comprar si estamos registrados*/}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </button>
        </div>
      </ul>
    </nav>

    {carritoAbierto && (
        <div className="modalCarrito">
            <div className="contenidoCarrito">
                <h2>Carrito</h2>
                <ul>
                    <li>Producto 1</li>
                    <li>Producto 2</li>
                    <li>Producto 3</li>
                </ul>
                <button onClick={() => setCarritoAbierto(false)}>Cerrar</button>
            </div>
        </div>
    )}
    </header>
  );
}