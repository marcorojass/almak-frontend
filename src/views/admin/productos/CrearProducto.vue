<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import productoService from '../../../services/producto.service';
import categoriaProductoService from '../../../services/categoriaProducto.service';

const router = useRouter();

// Campos del formulario
let nombreProducto = ref("");
let categoriaId = ref("");
let stock = ref(0);
let stockMinimo = ref(1);
let precioCosto = ref(0.0);
let precioVenta = ref(0.0);
let descripcion = ref("");
let imagenProducto = ref("");

// Lista de categorías
let categorias = ref([]);

onMounted(async () => {
    try {
        let resp = await categoriaProductoService.listar();
        categorias.value = resp.data;
    } catch (error) {
        console.error("Error cargando categorías:", error);
    }
});

// Función para guardar producto
async function guardarProducto(e) {
    e.preventDefault();

    const datos = {
        nombreProducto: nombreProducto.value,
        categoriaProducto: { categoriaProductoId: categoriaId.value },
        stock: stock.value,
        stockMinimo: stockMinimo.value,
        precioCosto: precioCosto.value,
        precioVenta: precioVenta.value,
        descripcion: descripcion.value,
        imagenProducto: imagenProducto.value,
        activo: true
    };

    try {
        await productoService.guardar(datos);
        Swal.fire({
            icon: 'success',
            title: '¡Producto registrado!',
            text: 'El producto se guardó correctamente',
            confirmButtonColor: '#146b65'
        }).then(() => {
            router.push('/admin/productos'); // Ajusta ruta según tu app
        });
    } catch (error) {
        console.error(error);
        let mensaje = "Error al guardar producto. Intenta nuevamente.";
        if (error.response && error.response.data) {
            mensaje = Object.values(error.response.data).join('\n');
        }
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
            confirmButtonColor: '#f0564a'
        });
    }
}
</script>

<template>
<div class="container-fluid">
    <h1>Crear Producto</h1>
    <form @submit.prevent="guardarProducto">

        <div class="mb-3">
            <label class="form-label">Nombre del producto</label>
            <input type="text" class="form-control" v-model="nombreProducto" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Categoría</label>
            <select class="form-select" v-model="categoriaId" required>
                <option value="">-- Seleccione categoría --</option>
                <option v-for="cat in categorias" :key="cat.categoriaProductoId" :value="cat.categoriaProductoId">
                    {{ cat.nombreCategoriaProducto }}
                </option>
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Stock</label>
            <input type="number" class="form-control" v-model="stock" min="0">
        </div>

        <div class="mb-3">
            <label class="form-label">Stock mínimo</label>
            <input type="number" class="form-control" v-model="stockMinimo" min="1">
        </div>

        <div class="mb-3">
            <label class="form-label">Precio de costo</label>
            <input type="number" class="form-control" v-model="precioCosto" min="0" step="0.01">
        </div>

        <div class="mb-3">
            <label class="form-label">Precio de venta</label>
            <input type="number" class="form-control" v-model="precioVenta" min="0" step="0.01">
        </div>

        <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea class="form-control" v-model="descripcion"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Imagen (URL)</label>
            <input type="text" class="form-control" v-model="imagenProducto">
        </div>

        <div class="d-flex gap-2">
            <button type="submit" class="btn btn-green">Guardar</button>
            <router-link class="btn btn-secondary" to="/admin/productos">Cancelar</router-link>
        </div>

    </form>
</div>
</template>

<style scoped>
.btn-green {
  background-color: #146b65;
  border: 1px solid #146b65;
  color: #fff;
  padding: 8px 16px;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.btn-green:hover {
  background-color: #0f534f;
  border-color: #0f534f;
  color: #fff;
}

.btn-green:active {
  background-color: #0b3d3a;
  border-color: #0b3d3a;
  color: #fff;
}
</style>
