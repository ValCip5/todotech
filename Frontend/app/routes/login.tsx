import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Route } from "./+types/home";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token); // Store the token in local storage
        alert('Login exitoso');
        navigate('/'); // Redirect to the home page or a protected route
      } else {
        alert('Error en el login');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Error en el login');
    }
  };

  return (
    <>
      <Navbar />
      <section className="seccionLogin width1240">
        <h2>Bienvenido de vuelta a TodoTech</h2>
        <form className="formularioLogin" onSubmit={handleSubmit}>
          <div className="grupoFormulario">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
      <Footer />
    </>
  );
}