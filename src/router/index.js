import { createRouter, createWebHistory } from "vue-router"
import Inicio from "../views/web/Inicio.vue";
import Nosotros from "../views/web/Nosotros.vue";
import Perfil from "../views/admin/perfil/Perfil.vue";
import Registro from "../views/auth/registro/Registro.vue";
import User from "../views/admin/user/User.vue";
import AppLayout from "../layout/AppLayout.vue";
import CategoriaProducto from "../views/admin/categoria-productos/CategoriaProducto.vue";
import CrearCategoria from "../views/admin/categoria-productos/CrearCategoria.vue";
import SitioLayout from "../views/SitioLayout.vue";
import Login from "../views/auth/login/Login.vue";
import Producto from "../views/admin/productos/Producto.vue";
import Raza from "../views/admin/razas/Raza.vue";
import CrearRaza from "../views/admin/razas/CrearRaza.vue";
import EditarRaza from "../views/admin/razas/EditarRaza.vue";
import Mascota from "../views/admin/mascotas/Mascota.vue";
import CrearMascota from "../views/admin/mascotas/CrearMascota.vue";
import Cliente from "../views/admin/clientes/Cliente.vue";
import CrearCliente from "../views/admin/clientes/CrearCliente.vue";
import EditarCliente from "../views/admin/clientes/EditarCliente.vue";
import Venta from "../views/admin/ventas/Venta.vue";
import CrearVenta from "../views/admin/ventas/CrearVenta.vue";
import Servicio from "../views/admin/servicios/Servicio.vue";
import ServicioCrear from "../views/admin/servicios/ServicioCrear.vue";
import ServicioEditar from "../views/admin/servicios/ServicioEditar.vue";
import CrearProducto from "../views/admin/productos/CrearProducto.vue";
import EditarProducto from "../views/admin/productos/EditarProducto.vue";
import Cita from "../views/admin/citas/Cita.vue";
import EditarCategoria from "../views/admin/categoria-productos/EditarCategoria.vue";
import CategoriaServicio from "../views/admin/categoria-servicios/CategoriaServicio.vue";
import CrearCategoriaServicio from "../views/admin/categoria-servicios/CrearCategoriaServicio.vue";



const routes=[
    {
        path:"",
        component:SitioLayout,
        children:[

    {path:"",component:Inicio},
    {path:"nosotros",component:Nosotros},
    {
        path:"auth/login",
        component:Login
    },
    {
        path:"/auth/register",
        component:Registro
    }

        ]
    }
,
    {
        path:"/admin",
        component:AppLayout,
        children:[
            {
                path:"perfil",
                component:Perfil
            },
            {
                path:"usuarios",
                component:User
            },
            {
                path:"usuarios/clientes",
                component:Cliente
            },
            {
                path:"usuarios/clientes/crear",
                component:CrearCliente
            },
            {
                path:"usuarios/clientes/editar/:id",
                component:EditarCliente
            },
             {
                path:"categorias-servicios",
                component:CategoriaServicio
            },
             {
                path:"categorias-servicios/crear",
                component:CrearCategoriaServicio
            },
             {
                path:"categorias-servicios/editar/:id",
                component:CategoriaProducto
            },

            {
                path:"categorias-productos",
                component:CategoriaProducto
            },
            {
                path:"categorias-productos/crear",
                component:CrearCategoria
            },
            {
                path:"categorias-productos/editar/:id",
                component:EditarCategoria
            },

            {
                path:"productos",
                component:Producto
            },
            {
                path:"productos/crear",
                component:CrearProducto
            },
            {
                path:"productos/editar/:id",
                component:EditarProducto
            },
            {
                path:"mascotas",
                component:Mascota,    
            },
            {
                path:"mascotas/crear",
                component:CrearMascota

            },
             {
                path:"ventas",
                component:Venta

            },
            {
                path:"ventas/crear",
                component:CrearVenta

            },{
                path:"citas",
                component:Cita
            },
            
                
{
    path: "razas",
    component: Raza
},
{
    path: "razas/crear",
    component: CrearRaza   // ← este archivo de arriba
},
{
    path: "razas/editar/:id",
    component: EditarRaza   // ← mismo componente para editar
},
{
    path: "servicios",
    component: Servicio   // ← este archivo de arriba
},
{
    path: "servicios/editar",
    component: ServicioEditar   // ← este archivo de arriba
},
{
    path: "servicios/crear",
    component: ServicioCrear   // ← este archivo de arriba
},
        ]
    }
]

const router =createRouter({
    history:createWebHistory(),
    routes:routes
});

export default router;