import { redirect } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { checkAuth } from '../utils/auth';

export async function clientLoader() {
  return checkAuth();
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function producto() {
    return(
        <>
        <Navbar />
        <ul>
        <li>
          <img src="https://via.placeholder.com/150" alt="Producto 1" />
          <h3>Pley 5</h3>
          <p>Na pero mirá lo que es esta play amigo es re flama osea guatefak</p>
          <p>15 de cada 20 usuarios recomiendan este producto</p>
          <p>Precio: $9999</p>
          <a>Comprar</a>
        </li>
        </ul>

        <div className="realizar comentario">
            <p>recomendas este producto?<button>si</button><button>no</button></p>   
            <textarea></textarea>
            <button>comentar</button>
        </div>

        <div className="comentarioHecho">
            <h4>juan</h4>
            <span>* recomienda el producto</span>
            <p>bueno la verdad me gusto mucho la play 5</p>
        </div>
        <Footer />
        </>
    );
}