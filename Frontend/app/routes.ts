import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("historialdecompras", "routes/historialdecompras.tsx"),
  route("panel", "routes/admin/panel.tsx"),
  route("examinarusuario/:id", "routes/admin/examinarusuario.tsx"),
  route("login", "routes/login.tsx"),
  route("registrarse", "routes/registrarse.tsx"),
  route("productos/:id", "routes/producto.tsx"),
  route("subirproducto", "routes/admin/subirproducto.tsx"),
  route("notfound", "routes/notfound.tsx"),
] satisfies RouteConfig;