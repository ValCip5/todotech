import React, { useEffect, useState } from 'react';
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { checkAuthAdmin } from "../../utils/auth";
import { useNavigate } from 'react-router-dom';

export async function clientLoader() {
  return checkAuthAdmin();
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
}

export default function Panel() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const handleExamineUser = (userId: number) => {
    navigate(`/examinarusuario/${userId}`);
  };

  return (
    <>
      <Navbar />
      <section className="panel width1240">
        <h2>Lista de usuarios</h2>
        <input type="text" placeholder="Buscar usuario" />
        <table className="tablaPanel primero">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <button onClick={() => handleExamineUser(user.id)}>Examinar usuario</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  );
}