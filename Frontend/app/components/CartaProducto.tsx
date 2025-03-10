import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toast } from './Toast';

interface CartaProductoProps {
  producto: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    likeCount: number;
    dislikeCount: number;
    category: Category;
  };
}

interface Category {
  id: number;
  name: string;
}

const CartaProducto: React.FC<CartaProductoProps> = ({ producto }) => {
  const [showToast, setShowToast] = useState(false);

  const addToCart = (producto: CartaProductoProps['producto']) => {
    const cart = JSON.parse(localStorage.getItem('carrito') || '[]');
    cart.push(producto);
    localStorage.setItem('carrito', JSON.stringify(cart));
    setShowToast(true);
  };

  return (
    <>
      <li>
        <Link to={`/productos/${producto.id}`}>
          <img className='productoImg' src={producto.image} alt={producto.name} />
          <div className="categoriaExiste">
            {producto.category ? (
              <p>{producto.category.name}</p>
            ) : (
              <div className='categoriaNoExiste'>
                <p>Sin categoria</p>
              </div>
            )}
          </div>
          <h3>{producto.name}</h3>
          <p className='recom'>{producto.likeCount} usuarios recomiendan este producto</p>
          <p className='noRecom'>{producto.dislikeCount} usuarios no recomiendan este producto.</p>
          <p className='precio'>Precio: ${producto.price}</p>
        </Link>
        <button className='botonCarrito' onClick={() => addToCart(producto)}>
          Agregar al carrito
        </button>
      </li>
      {showToast && (
        <Toast 
          message={`${producto.name} agregado al carrito`} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </>
  );
};

export default CartaProducto;