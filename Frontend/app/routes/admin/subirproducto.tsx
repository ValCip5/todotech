import { useState } from "react";
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

export default function subirProducto() {
    return (
        <>
        <Navbar />
            <section className="subirProductos width1240">
                <h2>Subir producto</h2>
                <form className="formularioSubirProductos">
                    <div className="grupoFormulario">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" required />
                    </div>
                    <div className="grupoFormulario">
                        <label htmlFor="descripcion">Descripción</label>
                        <input type="text" id="descripcion" name="descripcion" required />
                    </div>
                    <div className="grupoFormulario">
                        <label htmlFor="precio">Precio</label>
                        <input type="number" id="precio" name="precio" required />
                    </div>
                    <div className="grupoFormulario">
                        <label htmlFor="imagen">Imagen</label>
                        <input type="file" id="imagen" name="imagen" required />
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
                    <tr>
                    <td>Categoria 1</td>
                    <td>
                        <button>Eliminar</button>
                    </td>
                    </tr>
                    <tr>
                    <td>Categoria 2</td>
                    <td>
                        <button>Eliminar</button>
                    </td>
                    </tr>
                </tbody>
                </table>

                <button>Crear categoría</button>

            </section>
        <Footer />
        </>
    );
}