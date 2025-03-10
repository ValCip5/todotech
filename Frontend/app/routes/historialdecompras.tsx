import React, { useEffect, useState } from 'react';
import type { Route } from "./+types/home";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

interface Purchase {
  id: number;
  createdAt: string;
  product: Product;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  likeCount: number;
  dislikeCount: number;
}

export default function historialDeCompras() {
  const [compras, setCompras] = useState<Purchase[]>([]);

  useEffect(() => {
    async function fetchCompras() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('https://todotech.onrender.com/api/purchases/myPurchases', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCompras(data);
      } catch (error) {
        console.error('Error fetching compras:', error);
      }
    }

    fetchCompras();
  }, []);

  return (
    <>
      <Navbar />
      <section className="historialCompras width1240">
        <h2>Historial de Compras</h2>
        {compras.length > 0 ? (
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
              {compras.map((compra) => (
                <tr key={compra.id}>
                  <td>{compra.product.name}</td>
                  <td>{compra.product.description}</td>
                  <td>
                    <img src={compra.product.image} alt={compra.product.name} width="50" />
                  </td>
                  <td>{new Date(compra.createdAt).toLocaleDateString()}</td>
                  <td>${compra.product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No realizaste ninguna compra</p>
        )}
      </section>
      <Footer />
    </>
  );
}