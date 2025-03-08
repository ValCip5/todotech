import React, { useEffect, useState } from 'react';
import type { Route } from "./+types/home";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import CartaProducto from '../components/CartaProducto';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    }

    fetchProductos();
  }, []);

  return (
    <>
    <Navbar />
    <section className="hero width1240">
      <h2 className='superTitulo'>Bienvenido a TodoTech</h2>
      <p>Acá vas a encontrar la mejor selección de productos tecnologicos.</p>
      <a className='botonHero' href='#productos'>Comprá eso que buscas</a>
    </section>
    
    <section id="nosotros" className="nosotros width1240">
      <div className="nosotros-text">
      <img src="https://via.placeholder.com/150" alt="Imagen" />
      <h2>
        Productos importados al menor precio
      </h2>
      <p>
        En TodoTech trabajamos con los mejores proveedores para traerte los productos más novedosos al mejor
        precio.
      </p>
      </div>
      <ul>
        <li>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <h3>Precio</h3>
        <p>Te traemos los productos al mejor precio del mercado</p>
        </li>
        <li>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <h3>Calidad</h3>
        <p>No traemos copias, solo tecnologia autentica y original</p>
        </li>
        <li>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
        </svg>
        <h3>Devoluciones</h3>
        <p>¿Pensas que te cagamos? No te preocupes, podes devolver el producto en 7 dias 
           y te devolvemos la plata al toque</p>
        </li>
      </ul>
    </section>

    <section id="productos" className="productos width1240"> 
      <h2>Productos disponibles</h2>
      <ul>
          {productos.map((producto) => (
            <CartaProducto key={producto.id} producto={producto} />
          ))}
      </ul>
    </section>
    <Footer />
    </>
);
}
