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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (username?: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const url = username ? `http://localhost:3000/api/users?username=${username}` : 'http://localhost:3000/api/users';
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleExamineUser = (userId: number) => {
    navigate(`/examinarusuario/${userId}`);
  };

  const handleDeleteUser = (userId: number) => {
    setSelectedUserId(userId);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setSelectedUserId(null);
  };

  const aceptar = async () => {
    if (selectedUserId === null) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3000/api/users/${selectedUserId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== selectedUserId));
      setModalVisible(false);
      setSelectedUserId(null);
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('There was an error deleting the user. Please try again.');
    }
  };

  const handleSearch = () => {
    fetchUsers(searchQuery);
  };

  return (
    <>
      <Navbar />
      <section className="panel width1240">
        <h2>Lista de usuarios</h2>
        <input
          className='buscarU'
          type="text"
          placeholder="Ej. juanceto01"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className='encontrarU' onClick={handleSearch}>Buscar usuario</button>
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
                  <button onClick={() => handleDeleteUser(user.id)}>Eliminar cuenta</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {modalVisible && (
        <div className="modal">
          <div className="modalContenido">
            <span className="cerrar" onClick={cerrarModal}>&times;</span>
            <h2>¿Estás seguro de borrar esta cuenta?</h2>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modalAcciones">
              <button onClick={aceptar}>Aceptar</button>
              <button onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}