import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [touchedFields, setTouchedFields] = useState({
    username: false,
    name: false,
    surname: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'username':
        if (value.length < 8) {
          error = 'El usuario debe tener al menos 8 caracteres';
        }
        break;
      case 'name':
        if (value.trim().length === 0) {
          error = 'El nombre es requerido';
        }
        break;
      case 'surname':
        if (value.trim().length === 0) {
          error = 'El apellido es requerido';
        }
        break;
      case 'email':
        if (value.length < 5) {
          error = 'El email debe tener al menos 5 caracteres';
        } else if (!value.includes('@')) {
          error = 'El email debe contener un @';
        }
        break;
      case 'password':
        if (value.length < 8) {
          error = 'La contraseña debe tener al menos 8 caracteres';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Las contraseñas no coinciden';
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
  };

  const isFormValid = () => {
    // Verificar si todos los campos están llenos
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    
    // Verificar si no hay errores
    const noErrors = Object.values(errors).every(error => error === '');
    
    // Verificar si todos los campos han sido tocados
    const allFieldsTouched = Object.values(touchedFields).every(touched => touched);

    return allFieldsFilled && noErrors && allFieldsTouched;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      alert('Registro exitoso!');
      navigate('/login'); // Cambiado de '/' a '/login'
      
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Hubo un error con tu registro, intentalo nuevamente.');
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
            <label htmlFor="name">Nombre</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required 
            />
            {touchedFields.name && errors.name && 
              <span className="error-message">{errors.name}</span>
            }
          </div>
          <div className="grupoFormulario">
            <label htmlFor="surname">Apellido</label>
            <input 
              type="text" 
              id="surname" 
              name="surname" 
              value={formData.surname}
              onChange={handleChange}
              onBlur={handleBlur}
              required 
            />
            {touchedFields.surname && errors.surname && 
              <span className="error-message">{errors.surname}</span>
            }
          </div>
          <div className="grupoFormulario">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required 
            />
            {touchedFields.email && errors.email && 
              <span className="error-message">{errors.email}</span>
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
          <div className="grupoFormulario">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required 
            />
            {touchedFields.confirmPassword && errors.confirmPassword && 
              <span className="error-message">{errors.confirmPassword}</span>
            }
          </div>
          <button 
            className='botonRegistrarse' 
            type="submit"
            disabled={!isFormValid()}
          >
            Registrarse
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}