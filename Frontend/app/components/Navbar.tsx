import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  isAdmin: boolean;
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const removeItemFromCarrito = (index: number) => {
    const newItems = carritoItems.filter((_, i) => i !== index);
    setCarritoItems(newItems);
  };

  const handleComprar = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Debes iniciar sesión para realizar una compra');
        navigate('/login');
        return;
      }

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
      alert('¡Compra realizada con éxito!');
      navigate('/historialdecompras');
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('Hubo un error al procesar tu compra. Por favor, intenta nuevamente.');
    }
  };

  return (
    <header>
      <h1><img src="/assets/logo.png" alt="Logo TodoTech"/></h1>
      <nav className={isMenuOpen ? 'active' : ''}>
        <ul>
          <li><div className="rutas">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/#nosotros" onClick={() => setIsMenuOpen(false)}>Nosotros</NavLink>
            <NavLink to="/#productos" onClick={() => setIsMenuOpen(false)}>Productos</NavLink>
            {isAdmin && <NavLink to="/panel" onClick={() => setIsMenuOpen(false)}>Panel</NavLink>}
            {isAdmin && <NavLink to="/subirproducto" onClick={() => setIsMenuOpen(false)}>Subir Producto</NavLink>}
            {isLoggedIn && (
              <NavLink to="/historialdecompras" onClick={() => setIsMenuOpen(false)}>
                Historial de compras
              </NavLink>
            )}
          </div>
          </li>
          <li>
            <button 
              className="menuToggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            </button>
          </li>
          <li>
            <div className="acciones">
              {isLoggedIn ? (
                <>
                  <NavLink to="/login" onClick={handleLogout}>Log out</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Log in</NavLink>
                  <NavLink to="/registrarse" onClick={() => setIsMenuOpen(false)}>Registrarse</NavLink>
                </>
              )}
              <button className="botonCarrito" onClick={() => setCarritoAbierto(true)}>
                Carrito
              </button>
            </div>
          </li>
        </ul>
      </nav>

      {carritoAbierto && (
        <div className="modalCarrito">
          <div className="contenidoCarrito">
            <h2>Carrito</h2>
            <ul>
              {carritoItems.map((item: Product, index: number) => (
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
                <p className="totalP">Total: ${carritoItems.reduce((acc: number, item: Product) => acc + item.price, 0)}</p>
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