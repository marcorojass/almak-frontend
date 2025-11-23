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
import Raza from "../views/admin/razas/raza.vue";
import CrearRaza from "../views/admin/razas/CrearRaza.vue";
import EditarRaza from "../views/admin/razas/EditarRaza.vue";

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
                path:"categorias-productos",
                component:CategoriaProducto
            },
            {
                path:"categorias-productos/crear",
                component:CrearCategoria
            },
            {
                path:"categorias-productos/editar/:id",
                component:CrearCategoria
            },
            {
                path:"productos",
                component:Producto
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
}
        ]
    }
]

const router =createRouter({
    history:createWebHistory(),
    routes:routes
});

export default router;