import { type RouteConfig, index, route } from "@react-router/dev/routes";
import PrivateRoute from './components/privateroute';
import { isAuthenticated } from './auth';
import Panel from './routes/admin/panel';

export default [index("routes/home.tsx"),
                route("historialdecompras", "routes/historialdecompras.tsx"),
                {
                    path: "panel",
                    element: (
                      <PrivateRoute isAuthenticated={isAuthenticated()}>
                        <Panel />
                      </PrivateRoute>
                    )
                },
                route("examinarusuario", "routes/admin/examinarusuario.tsx"),
                route("login", "routes/login.tsx"),
                route("registrarse", "routes/registrarse.tsx"),
                route("producto", "routes/producto.tsx"),
                route("subirproducto", "routes/admin/subirproducto.tsx"),

] satisfies RouteConfig;
