<template>
  <div class="container mt-4">
    <h2 class="mb-3 text-success">Listado de Categorías</h2>

    <table class="table table-striped table-bordered shadow-sm">
      <thead class="table-success">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categoriasProductos" :key="categoria.categoriaProductoId">
          <td>{{ categoria.categoriaProductoId }}</td>
          <td>{{ categoria.nombreCategoriaProducto }}</td>
          <td>{{ categoria.descripcion }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="editar(categoria.categoriaProductoId)"
            >
              <i class="bi bi-pencil"></i>

 Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="eliminar(categoria.categoriaProductoId)"
            >
            <i class="bi bi-trash"></i>
              Eliminar
            </button>
          </td>
        </tr>

        <!-- Mensaje cuando no hay datos -->
        <tr v-if="categoriasProductos.length === 0">
          <td colspan="4" class="text-center text-muted">
            No hay categorías registradas.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import categoriaProductoService from '../../../services/categoriaProducto.service'

// Estado reactivo
const categoriasProductos = ref([])

// Cargar datos al montar el componente
onMounted(() => {
  getCategoriasProductos()
})

// Función asíncrona para obtener los datos del backend
async function getCategoriasProductos() {
  try {
    const { data } = await categoriaProductoService.listar()
    categoriasProductos.value = data
  } catch (error) {
    console.error('Error al cargar categorías:', error)
  }
}

// Placeholder para botones
function editar(id) {
  alert(`Editar categoría con ID: ${id}`)
}

function eliminar(id) {
  if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
    alert(`Categoría con ID ${id} eliminada`)
  }
}
</script>

<style scoped>
table {
  border-radius: 10px;
  overflow: hidden;
}
</style>
