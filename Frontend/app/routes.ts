import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
                route("historialdecompras", "routes/historialdecompras.tsx"),
                route("panel", "routes/admin/panel.tsx"),
                route("examinarusuario", "routes/admin/examinarusuario.tsx"),
                route("login", "routes/login.tsx"),
                route("registrarse", "routes/registrarse.tsx"),
                route("producto", "routes/producto.tsx"),
                route("subirproducto", "routes/admin/subirproducto.tsx"),

] satisfies RouteConfig;
