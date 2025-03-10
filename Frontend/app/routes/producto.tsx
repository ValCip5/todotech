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

interface Category {
  id: number;
  name: string;
}

interface Recommendation {
  like: boolean;
}

export default function Producto() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [commentText, setCommentText] = useState('');
  const [hasRecommended, setHasRecommended] = useState(false);
  const [userRecommendation, setUserRecommendation] = useState<Recommendation | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch product data
        const productResponse = await fetch(`http://localhost:3000/api/products/${id}`);
        const productData = await productResponse.json();
        setProduct(productData);


        const token = localStorage.getItem('authToken');
        if (token) {
          const recommendationResponse = await fetch(`http://localhost:3000/api/products/${id}/recommendation`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (recommendationResponse.ok) {
            const recommendationData = await recommendationResponse.json();
            if (recommendationData) {
              setHasRecommended(true);
              setUserRecommendation(recommendationData);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [id]);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('carrito') || '[]');
    cart.push(product);
    localStorage.setItem('carrito', JSON.stringify(cart));
  };

  const handleComment = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3000/api/products/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: commentText })
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const newComment = await response.json();
      setProduct(prevProduct => ({
        ...prevProduct!,
        comments: [...prevProduct!.comments, newComment]
      }));
      setCommentText('');
      alert('Comentario publicado exitosamente');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Error al publicar el comentario');
    }
  };

  const handleRecommendation = async (like: boolean) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Debes iniciar sesión para recomendar productos');
        return;
      }

      const endpoint = like ? 'like' : 'dislike';
      const response = await fetch(`http://localhost:3000/api/products/${id}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to submit recommendation');
      }

      const { product, recommendation } = await response.json();
      
      // Si el usuario ya recomendó y está seleccionando la misma opción
      if (hasRecommended && userRecommendation?.like === like) {
        setHasRecommended(false);
        setUserRecommendation(null);
      } else {
        setHasRecommended(true);
        setUserRecommendation({ like });
      }

      // Actualizamos los contadores con los valores del backend
      setProduct(prevProduct => ({
        ...prevProduct!,
        likeCount: product.likeCount,
        dislikeCount: product.dislikeCount
      }));

    } catch (error) {
      console.error('Error submitting recommendation:', error);
      alert('Error al enviar la recomendación');
    }
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
          <textarea 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button 
            className='botonGeneral comentar'
            onClick={handleComment}
          >Comentar</button>
          <div>
            <p>
              {hasRecommended 
                ? `Gracias por tu recomendación, puedes cambiarla si quieres`
                : "¿Recomendas este producto?"}
            </p>
            <button 
              className='botonGeneral si'
              onClick={() => handleRecommendation(true)}
              disabled={userRecommendation?.like === true}
            >
              Sí
            </button>
            <button 
              className='botonGeneral no'
              onClick={() => handleRecommendation(false)}
              disabled={userRecommendation?.like === false}
            >
              No
            </button>
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
