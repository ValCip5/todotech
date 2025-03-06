import React from 'react';

interface CartaProductoProps {
  producto: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    likes: number;
    dislikes: number;
  };
}

const CartaProducto: React.FC<CartaProductoProps> = ({ producto }) => {
  return (
    <li>
      <img src={producto.image} alt={producto.name} />
      <h3>{producto.name}</h3>
      <p>{producto.description}</p>
      <p>{producto.likes} de cada 20 usuarios recomiendan este producto</p>
      <p>Precio: ${producto.price}</p>
      <a href={`/comprar/${producto.id}`}>Comprar</a>
    </li>
  );
};

export default CartaProducto;