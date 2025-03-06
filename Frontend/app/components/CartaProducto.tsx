import React from 'react';
import { Link } from 'react-router-dom';

interface CartaProductoProps {
  producto: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    likeCount: number;
    dislikeCount: number;
  };
}

const CartaProducto: React.FC<CartaProductoProps> = ({ producto }) => {
  return (
    <li>
      <Link to={`/productos/${producto.id}`}>
        <img src={producto.image} alt={producto.name} />
        <h3>{producto.name}</h3>
        <p>{producto.description}</p>
        <p>{producto.likeCount} usuarios recomiendan este producto</p>
        <p>{producto.dislikeCount} usuarios no recomiendan este producto</p>
        <p>Precio: ${producto.price}</p>
      </Link>
    </li>
  );
};

export default CartaProducto;