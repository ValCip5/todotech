import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

interface Comment {
  id: number;
  user: User | null;
  text: string;
  createdAt: string;
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
  category: Category;
}

interface User {
  id: number;
  username: string;
}

interface Category{
  id: number;
  name: string;
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

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('carrito') || '[]');
    cart.push(product);
    localStorage.setItem('carrito', JSON.stringify(cart));
  };

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
            <div className="categoriaExiste">
            {product.category ? (
              <p>{product.category.name}</p>
            ) : (
              <div className='categoriaNoExiste'>
                <p>Sin categoria</p>
              </div>
            )}
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.likeCount} de cada 20 usuarios recomiendan este producto</p>
            <p>Precio: <strong>${product.price}</strong></p>
            <a href="#" onClick={() => addToCart(product)}>Agregar al Carrito</a>
          </li>
        </ul>

        <div className="realizar comentario">
          <p>¿Recomiendas este producto?<button>sí</button><button>no</button></p>
          <textarea></textarea>
          <button>comentar</button>
        </div>

        {product.comments.map((comment) => (
          <div key={comment.id} className="comentarioHecho">
            {comment.user ? (
              <h4>{comment.user.username}</h4>
            ) : (
              <div className='usuarioEliminado'>
                <p>Este usuario ya no existe</p>
              </div>
            )}
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            <p>{comment.text}</p>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}