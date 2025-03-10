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

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    serverError: ''
  });

  const [touchedFields, setTouchedFields] = useState({
    username: false,
    password: false
  });

  const navigate = useNavigate();

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'username':
        if (value.trim() === '') {
          error = 'El usuario es requerido';
        }
        break;
      case 'password':
        if (value.trim() === '') {
          error = 'La contraseña es requerida';
        }
        break;
    }
    
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar el error del servidor cuando el usuario comienza a escribir
    if (errors.serverError) {
      setErrors(prev => ({
        ...prev,
        serverError: ''
      }));
    }
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    const noErrors = Object.values(errors).every(error => error === '');
    const allFieldsTouched = Object.values(touchedFields).every(touched => touched);

    return allFieldsFilled && noErrors && allFieldsTouched;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      const response = await fetch('https://todotech.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        alert('Login exitoso');
        navigate('/');
      } else {
        const errorData = await response.json();
        setErrors(prev => ({
          ...prev,
          serverError: errorData.error || 'Credenciales inválidas'
        }));
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setErrors(prev => ({
        ...prev,
        serverError: 'Error al conectar con el servidor'
      }));
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
              onBlur={handleBlur}
              required
            />
            {touchedFields.username && errors.username && 
              <span className="error-message">{errors.username}</span>
            }
          </div>
          <div className="grupoFormulario">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touchedFields.password && errors.password && 
              <span className="error-message">{errors.password}</span>
            }
          </div>
          {errors.serverError && 
            <div className="error-message server-error">
              {errors.serverError}
            </div>
          }
          <button 
            className='botonLogin' 
            type="submit"
            disabled={!isFormValid()}
          >
            Login
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}