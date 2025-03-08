import { useState, useEffect } from "react";
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

interface Categoria {
  id: number;
  name: string;
}

export default function SubirProducto() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/api/categories', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      }
    }

    fetchCategorias();
  }, []);

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const newCategory = await response.json();
      setCategorias([...categorias, newCategory]);
      setModalVisible(false);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error creating category:', error);
      alert('There was an error creating the category. Please try again.');
    }
  };

  const handleDeleteCategory = async () => {
    if (selectedCategoryId === null) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3000/api/categories/${selectedCategoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategorias(categorias.filter(categoria => categoria.id !== selectedCategoryId));
      setDeleteModalVisible(false);
      setSelectedCategoryId(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('There was an error deleting the category. Please try again.');
    }
  };

  const openDeleteModal = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedCategoryId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: nombre,
          description: descripcion,
          price: parseFloat(precio),
          image: imagen,
          categoryId: selectedCategory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload product');
      }

      alert('Product uploaded successfully');
      // Optionally, reset the form fields
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setImagen('');
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('There was an error uploading the product. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <section className="subirProducto width1240">
        <h2>Subir producto</h2>
        <form className="formularioSubirProductos" onSubmit={handleSubmit}>
          <div className="grupoFormulario">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="imagen">Imagen</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              required
            />
          </div>
          <div className="grupoFormulario">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              required
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Subir</button>
        </form>

        <h2 className="tituloCategorias">Lista de categorias</h2>
        <table className="tablaCategorias">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.name}</td>
                <td>
                  <button onClick={() => openDeleteModal(categoria.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="crearC" onClick={() => setModalVisible(true)}>Crear categoría</button>
      </section>

      {modalVisible && (
        <div className="modal">
          <div className="modalContenido">
            <span className="cerrar" onClick={() => setModalVisible(false)}>&times;</span>
            <h2>Crear nueva categoría</h2>
            <div className="grupoFormulario">
              <label htmlFor="newCategoryName">Nombre de la categoría</label>
              <input
                type="text"
                id="newCategoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />
            </div>
            <div className="modalAcciones">
              <button onClick={handleCreateCategory}>Aceptar</button>
              <button onClick={() => setModalVisible(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {deleteModalVisible && (
        <div className="modal">
          <div className="modalContenido">
            <span className="cerrar" onClick={closeDeleteModal}>&times;</span>
            <h2>¿Estás seguro de eliminar esta categoría?</h2>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modalAcciones">
              <button onClick={handleDeleteCategory}>Aceptar</button>
              <button onClick={closeDeleteModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}