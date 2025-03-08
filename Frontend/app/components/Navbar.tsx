import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  isAdmin: boolean;
}

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
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
        const decodedToken: DecodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.isAdmin);
      }
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
    setIsAdmin(false);
    navigate('/login');
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
      navigate('/historialdecompras'); // Redirect to the purchase history page
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
            {isAdmin && <NavLink to="/panel">Panel</NavLink>}
            {isAdmin && <NavLink to="/subirproducto">Subir Producto</NavLink>}
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
            <button className="botonCarrito" onClick={() => setCarritoAbierto(true)}>Carrito
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
                    <p className="nombreP">{item.name}</p>
                    <p>Precio: ${item.price}</p>
                  </div>
                  <button onClick={() => removeItemFromCarrito(index)}>Remover</button>
                </li>
              ))}
            </ul>
            {carritoItems.length > 0 ? (
              <>
                <p className="totalP">Total: ${carritoItems.reduce((acc, item) => acc + item.price, 0)}</p>
                <button className="comprar" onClick={handleComprar}>Comprar</button>
              </>
            ) : (
              <p className="carritoV">El carrito está vacío</p>
            )}
            <button onClick={() => setCarritoAbierto(false)}>Cerrar carrito</button>
          </div>
        </div>
      )}
    </header>
  );
}