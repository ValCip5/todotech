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
  
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [errors, setErrors] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    categoria: ''
  });

  const [touched, setTouched] = useState({
    nombre: false,
    descripcion: false,
    precio: false,
    imagen: false,
    categoria: false
  });

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

  const validateField = (name: string, value: any) => {
    switch (name) {
      case 'nombre':
        return value.length < 5 ? 'El nombre debe tener al menos 5 caracteres' : '';
      case 'descripcion':
        return value.length < 5 ? 'La descripción debe tener al menos 5 caracteres' : '';
      case 'precio':
        return !value || isNaN(value) || parseFloat(value) <= 0 ? 'El precio debe ser un número mayor a 0' : '';
      case 'imagen':
        const imageRegex = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i;
        if (!value.trim()) {
          return 'La URL de la imagen es requerida';
        }
        return !imageRegex.test(value) 
          ? 'La URL debe ser una imagen válida (jpg, jpeg, png, gif o webp)' 
          : '';
      case 'categoria':
        return value === null ? 'Debe seleccionar una categoría' : '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let value;
    switch (field) {
      case 'nombre':
        value = nombre;
        break;
      case 'descripcion':
        value = descripcion;
        break;
      case 'precio':
        value = precio;
        break;
      case 'imagen':
        value = imagen;
        break;
      case 'categoria':
        value = selectedCategory;
        break;
      default:
        value = '';
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, value)
    }));
  };

  const isFormValid = () => {
    const allFieldsFilled = 
      nombre.trim() !== '' && 
      descripcion.trim() !== '' && 
      precio !== '' && 
      imagen.trim() !== '' && 
      selectedCategory !== null;
    
    const noErrors = Object.values(errors).every(error => !error);
    
    const allFieldsTouched = Object.values(touched).every(field => field);
  
    return allFieldsFilled && noErrors && allFieldsTouched;
  };

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

    if (!isFormValid()) {
      return;
    }

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

      alert('Producto subido exitosamente');
      // Reset form
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setImagen('');
      setSelectedCategory(null);
      setTouched({
        nombre: false,
        descripcion: false,
        precio: false,
        imagen: false,
        categoria: false
      });
      setErrors({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: '',
        categoria: ''
      });
    } catch (error) {
      console.error('Error al subir el producto:', error);
      alert('Hubo un error al subir el producto, intente nuevamente');
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
              onChange={(e) => {
                setNombre(e.target.value);
                if (touched.nombre) {
                  setErrors(prev => ({
                    ...prev,
                    nombre: validateField('nombre', e.target.value)
                  }));
                }
              }}
              onBlur={() => handleBlur('nombre')}
              required
            />
            {touched.nombre && errors.nombre && 
              <span className="error-message">{errors.nombre}</span>
            }
          </div>

          <div className="grupoFormulario">
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
                if (touched.descripcion) {
                  setErrors(prev => ({
                    ...prev,
                    descripcion: validateField('descripcion', e.target.value)
                  }));
                }
              }}
              onBlur={() => handleBlur('descripcion')}
              required
            />
            {touched.descripcion && errors.descripcion && 
              <span className="error-message">{errors.descripcion}</span>
            }
          </div>

          <div className="grupoFormulario">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={precio}
              onChange={(e) => {
                setPrecio(e.target.value);
                if (touched.precio) {
                  setErrors(prev => ({
                    ...prev,
                    precio: validateField('precio', e.target.value)
                  }));
                }
              }}
              onBlur={() => handleBlur('precio')}
              required
            />
            {touched.precio && errors.precio && 
              <span className="error-message">{errors.precio}</span>
            }
          </div>

          <div className="grupoFormulario">
            <label htmlFor="imagen">Imagen (URL)</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={imagen}
              onChange={(e) => {
                setImagen(e.target.value);
                if (touched.imagen) {
                  setErrors(prev => ({
                    ...prev,
                    imagen: validateField('imagen', e.target.value)
                  }));
                }
              }}
              onBlur={() => handleBlur('imagen')}
              required
            />
            {touched.imagen && errors.imagen && 
              <span className="error-message">{errors.imagen}</span>
            }
          </div>

          <div className="grupoFormulario">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={selectedCategory || ''}
              onChange={(e) => {
                setSelectedCategory(Number(e.target.value));
                if (touched.categoria) {
                  setErrors(prev => ({
                    ...prev,
                    categoria: validateField('categoria', Number(e.target.value))
                  }));
                }
              }}
              onBlur={() => handleBlur('categoria')}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
            {touched.categoria && errors.categoria && 
              <span className="error-message">{errors.categoria}</span>
            }
          </div>

          <button 
            type="submit" 
            disabled={!isFormValid()}
            className="botonGeneral"
          >
            Subir
          </button>
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

        <button className="crearC" onClick={() => setModalVisible(true)}>
          Crear categoría
        </button>
      </section>

      {modalVisible && (
        <div className="modal">
          <div className="modalContenido">
            <h3>Crear nueva categoría</h3>
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
              <button className="botonGeneral" onClick={handleCreateCategory}>
                Aceptar
              </button>
              <button className="botonSecundario" onClick={() => setModalVisible(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModalVisible && (
        <div className="modal">
          <div className="modalContenido">
            <h3>¿Estás seguro de eliminar esta categoría?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modalAcciones">
              <button className="botonEliminar porEliminar" onClick={handleDeleteCategory}>
                Aceptar
              </button>
              <button className="botonGeneral" onClick={closeDeleteModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
