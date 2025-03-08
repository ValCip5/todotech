import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { checkAuthAdmin } from "../../utils/auth";

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
}

interface Comment {
  id: number;
  date: string;
  text: string;
}

export default function ExaminarUsuario() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalComentarioVisible, setModalComentarioVisible] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data.user);
        setComments(data.comments);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    fetchUser();
  }, [id]);

  const eliminarCuenta = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const aceptar = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setModalVisible(false);
      alert('User deleted successfully');
      // Optionally, redirect to another page
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('There was an error deleting the user. Please try again.');
    }
  };

  const borrarComentario = (commentId: number) => {
    setModalComentarioVisible(true);
  };

  const cerrarModalComentario = () => {
    setModalComentarioVisible(false);
  };

  const aceptarComentario = async (commentId: number) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      setComments(comments.filter(comment => comment.id !== commentId));
      setModalComentarioVisible(false);
      alert('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('There was an error deleting the comment. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <section className="usuario width1240">
        <h2>Comentarios del usuario</h2>

        {user && (
          <table className="tablaExaminarUsuario primero">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={eliminarCuenta}>Eliminar cuenta</button>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {comments.length > 0 ? (
          <table className="tablaExaminarUsuario segundo">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Comentario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td>{new Date(comment.date).toLocaleDateString()}</td>
                  <td>{comment.text}</td>
                  <td>
                    <button onClick={() => borrarComentario(comment.id)}>Borrar comentario</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Éste usuario aún no ha comentado.</p>
        )}
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

      {modalComentarioVisible && (
        <div className="modal">
          <div className="modalContenido">
            <span className="cerrar" onClick={cerrarModalComentario}>&times;</span>
            <h2>¿Estás seguro que deseas borrar este comentario?</h2>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modalAcciones">
              <button onClick={aceptarComentario}>Aceptar</button>
              <button onClick={cerrarModalComentario}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}