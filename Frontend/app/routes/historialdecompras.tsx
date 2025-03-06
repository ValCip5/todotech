import type { Route } from "./+types/home";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TodoTech" },
    { name: "description", content: "Bienvenido a TodoTech, tu mejor tienda de tecnología." },
  ];
}

export default function historialDeCompras() {
  return (
    <>
    <Navbar />
    <h1>todavía no compraste ningun producto</h1>
    <Footer />
    </>
  );
}