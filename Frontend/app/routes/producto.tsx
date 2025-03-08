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
      <section className='width1240 productoSolo'>
        <div className='productoContenido'>
            <div className='izq'>
              <img src={product.image} alt={product.name} />
            </div>

            <div className='der'>
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
            <div className='recomendaciones'>
              <p>{product.likeCount} usuarios recomiendan este producto.</p>
              <p>{product.dislikeCount} usuarios no recomiendan este producto.</p>
            </div>
            <p>Precio: <strong>${product.price}</strong></p>
            <button className='botonCarrito solo' onClick={() => addToCart(product)}>Agregar al Carrito</button>
            </div>
        </div>

        <div className="realizarComentario">
          <p>Dejá tu comentario</p>
          <textarea></textarea>
          <button className='botonGeneral comentar'>Comentar</button>
          <div>
          <p>¿Recomendas este producto?</p>
          <button className='botonGeneral si'>Sí</button><button className='botonGeneral no'>No</button>
          </div>
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
            <p>{comment.text}</p>
            <span>Comentado el {new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}