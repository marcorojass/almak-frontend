import { createRouter, createWebHistory } from "vue-router";

// Layouts
import AppLayout from "../layout/AppLayout.vue";
import SitioLayout from "../views/SitioLayout.vue";

// Auth
import Login from "../views/auth/login/Login.vue";
import Registro from "../views/auth/registro/Registro.vue";

// Web Publica
import Inicio from "../views/web/Inicio.vue";
import Nosotros from "../views/web/Nosotros.vue";

// Admin Generales
import Perfil from "../views/admin/perfil/Perfil.vue";
import User from "../views/admin/user/User.vue";

// Clientes
import Cliente from "../views/admin/clientes/Cliente.vue";
import CrearCliente from "../views/admin/clientes/CrearCliente.vue";
import EditarCliente from "../views/admin/clientes/EditarCliente.vue";

// Categorias Productos
import CategoriaProducto from "../views/admin/categoria-productos/CategoriaProducto.vue";
import CrearCategoria from "../views/admin/categoria-productos/CrearCategoria.vue";
import EditarCategoria from "../views/admin/categoria-productos/EditarCategoria.vue";

// Categorias Servicios
import CategoriaServicio from "../views/admin/categoria-servicios/CategoriaServicio.vue";
import CrearCategoriaServicio from "../views/admin/categoria-servicios/CrearCategoriaServicio.vue";

// Productos
import Producto from "../views/admin/productos/Producto.vue";
import CrearProducto from "../views/admin/productos/CrearProducto.vue";
import EditarProducto from "../views/admin/productos/EditarProducto.vue";

// Razas
import Raza from "../views/admin/razas/Raza.vue";
import CrearRaza from "../views/admin/razas/CrearRaza.vue";
import EditarRaza from "../views/admin/razas/EditarRaza.vue";

// Mascotas
import Mascota from "../views/admin/mascotas/Mascota.vue";
import CrearMascota from "../views/admin/mascotas/CrearMascota.vue";
import EditarMascota from "../views/admin/mascotas/EditarMascota.vue";

// Ventas
import Venta from "../views/admin/ventas/Venta.vue";
import CrearVenta from "../views/admin/ventas/CrearVenta.vue";

// Citas
import Cita from "../views/admin/citas/Cita.vue";

// Servicios
import Servicio from "../views/admin/Servicios/Servicio.vue";
import ServicioCrear from "../views/admin/servicios/ServicioCrear.vue";
import ServicioEditar from "../views/admin/Servicios/ServicioEditar.vue";

// Tipos de Mascota
import TipoMascota from "../views/admin/tipo-mascota/TipoMascota.vue";
import CrearTipoMascota from "../views/admin/tipo-mascota/CrearTipoMascota.vue";
import EditarTipoMascota from "../views/admin/tipo-mascota/EditarTipoMascota.vue";

// --- MÉTODOS DE PAGO (NOMBRE ACTUALIZADO) ---
// Recomendación: Crea la carpeta /views/admin/metodos-pagos/ para guardar estos 3 archivos
import TipoPago from "../views/admin/metodos-pagos/TipoPago.vue";
import CrearTipoPago from "../views/admin/metodos-pagos/CrearTipoPago.vue";
import EditarTipoPago from "../views/admin/metodos-pagos/EditarTipoPago.vue";


const routes = [
    {
        path: "",
        component: SitioLayout,
        children: [
            { path: "", component: Inicio },
            { path: "nosotros", component: Nosotros },
            { path: "auth/login", component: Login },
            { path: "/auth/register", component: Registro }
        ]
    },
    {
        path: "/admin",
        component: AppLayout,
        children: [
            { path: "perfil", component: Perfil },
            { path: "usuarios", component: User },
            
            // Clientes
            { path: "usuarios/clientes", component: Cliente },
            { path: "usuarios/clientes/crear", component: CrearCliente },
            { path: "usuarios/clientes/editar/:id", component: EditarCliente },

            // Categorias Servicios
            { path: "categorias-servicios", component: CategoriaServicio },
            { path: "categorias-servicios/crear", component: CrearCategoriaServicio },

            // Categorias Productos
            { path: "categorias-productos", component: CategoriaProducto },
            { path: "categorias-productos/crear", component: CrearCategoria },
            { path: "categorias-productos/editar/:id", component: EditarCategoria },

            // Productos
            { path: "productos", component: Producto },
            { path: "productos/crear", component: CrearProducto },
            { path: "productos/editar/:id", component: EditarProducto },

            // Mascotas
            { path: "mascotas", component: Mascota },
            { path: "mascotas/crear", component: CrearMascota },
            { path: "mascotas/editar/:id", component: EditarMascota },

            // Tipos de Mascotas
            { path: "tipos-mascotas", component: TipoMascota },
            { path: "tipos-mascotas/crear", component: CrearTipoMascota },
            { path: "tipos-mascotas/editar/:id", component: EditarTipoMascota },

            // --- MÉTODOS DE PAGO (RUTAS ACTUALIZADAS) ---
            { path: "metodos-pagos", component: TipoPago },
            { path: "metodos-pagos/crear", component: CrearTipoPago },
            { path: "metodos-pagos/editar/:id", component: EditarTipoPago },

            // Ventas
            { path: "ventas", component: Venta },
            { path: "ventas/crear", component: CrearVenta },

            // Citas
            { path: "citas", component: Cita },

            // Razas
            { path: "razas", component: Raza },
            { path: "razas/crear", component: CrearRaza },
            { path: "razas/editar/:id", component: EditarRaza },

            // Servicios
            { path: "servicios", component: Servicio },
            { path: "servicios/crear", component: ServicioCrear },
            { path: "servicios/editar/:id", component: ServicioEditar },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;