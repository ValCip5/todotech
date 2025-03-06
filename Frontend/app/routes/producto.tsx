import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { checkAuth } from '../utils/auth';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}

interface Product {
  comments: Comment[];
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  likeCount: number;
  dislikeCount: number;
}

export default function Producto() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <section className='width1240'>
        <ul>
          <li>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.likeCount} de cada 20 usuarios recomiendan este producto</p>
            <p>Precio: ${product.price}</p>
            <a href="#">Agregar al Carrito</a>
          </li>
        </ul>

        <div className="realizar comentario">
          <p>¿Recomiendas este producto?<button>sí</button><button>no</button></p>
          <textarea></textarea>
          <button>comentar</button>
        </div>

        {product.comments.map((comment) => (
          <div key={comment.id} className="comentarioHecho">
            <h4>{comment.user}</h4>
            <span>{comment.date}</span>
            <p>{comment.text}</p>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}