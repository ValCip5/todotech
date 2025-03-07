import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const [carritoAbierto, setCarritoAbierto] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('carritoAbierto') === 'true';
    }
    return false;
  });
  const [carritoItems, setCarritoItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('carrito');
      return savedItems ? JSON.parse(savedItems) : [];
    }
    return [];
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('carritoAbierto', carritoAbierto.toString());
    }
  }, [carritoAbierto]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('carrito', JSON.stringify(carritoItems));
    }
  }, [carritoItems]);

  useEffect(() => {
    if (carritoAbierto && typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('carrito');
      setCarritoItems(savedItems ? JSON.parse(savedItems) : []);
    }
  }, [carritoAbierto]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    setIsLoggedIn(false);
    navigate('/login');
  };

  const addItemToCarrito = (item) => {
    setCarritoItems([...carritoItems, item]);
  };

  const removeItemFromCarrito = (index) => {
    const newItems = carritoItems.filter((_, i) => i !== index);
    setCarritoItems(newItems);
  };

  const handleComprar = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(carritoItems),
      });

      if (!response.ok) {
        throw new Error('Failed to complete purchase');
      }

      setCarritoItems([]);
      setCarritoAbierto(false);
      alert('Purchase successful!');
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('There was an error processing your purchase. Please try again.');
    }
  };

  return (
    <header>
      <h1>TodoTech</h1>
      <nav>
        <ul>
          <div className="rutas">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/#nosotros">Nosotros</NavLink>
            <NavLink to="/#productos">Productos</NavLink>
          </div>
          <div className="acciones">
            {isLoggedIn ? (
              <>
                <NavLink to="/login" onClick={handleLogout}>Log out</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">Log in</NavLink>
                <NavLink to="/registrarse">Registrarse</NavLink>
              </>
            )}
            <button onClick={() => setCarritoAbierto(true)}>Carrito
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
              {carritoItems.map((item, index) => (
                <li key={index}>
                  <div>
                    <p>{item.name}</p>
                    <p>Precio: ${item.price}</p>
                  </div>
                  <button onClick={() => removeItemFromCarrito(index)}>Remove</button>
                </li>
              ))}
            </ul>
            <button onClick={handleComprar}>Comprar</button>
            <button onClick={() => setCarritoAbierto(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </header>
  );
}