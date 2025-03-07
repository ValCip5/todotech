import React from 'react';
import type { Route } from "./+types/home";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useNavigate } from 'react-router-dom';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function Registrarse() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get('username'),
      name: formData.get('name'),
      surname: formData.get('surname'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      alert('Registration successful!');
      navigate('/');
      // Optionally, redirect the user to another page
    } catch (error) {
      console.error('Error during registration:', error);
      alert('There was an error processing your registration. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <section className="seccionRegistrarse width1240">
        <h2>Te damos la bienvenida a TodoTech</h2>
        <form className="formularioRegistrarse" onSubmit={handleSubmit}>
          <div className="grupoFormulario">
            <label htmlFor="username">Usuario</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="surname">Apellido</label>
            <input type="text" id="surname" name="surname" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </section>
      <Footer />
    </>
  );
}