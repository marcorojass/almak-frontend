<template>
  <div class="container mt-4">

    <!-- Título + Botón Nueva Categoría -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0 text-success">Listado de Categorías</h2>
      <RouterLink 
        to="/admin/categorias-productos/crear" 
        class="btn btn-success"
      >
        <i class="bi bi-plus-lg"></i> Nueva Categoría
      </RouterLink>
    </div>

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
          <td>{{ categoria.descripcion || '—' }}</td>
          <td>
            <!-- Botón Editar que ahora navega al formulario -->
            <RouterLink
              :to="`/admin/categorias-productos/editar/${categoria.categoriaProductoId}`"
              class="btn btn-warning btn-sm me-2"
            >
              <i class="bi bi-pencil"></i> Editar
            </RouterLink>

            <button
              class="btn btn-danger btn-sm"
              @click="eliminar(categoria.categoriaProductoId)"
            >
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </td>
        </tr>

        <!-- Mensaje cuando no hay datos -->
        <tr v-if="categoriasProductos.length === 0">
          <td colspan="4" class="text-center text-muted py-4">
            No hay categorías registradas.<br><br>
            <RouterLink 
              to="/admin/categorias-productos/crear" 
              class="btn btn-success btn-sm"
            >
              <i class="bi bi-plus-lg"></i> Crear la primera categoría
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import categoriaProductoService from '../../../services/categoriaProducto.service'

const router = useRouter()
const categoriasProductos = ref([])

onMounted(() => {
  getCategoriasProductos()
})

async function getCategoriasProductos() {
  try {
    const { data } = await categoriaProductoService.listar()
    categoriasProductos.value = data
  } catch (error) {
    console.error('Error al cargar categorías:', error)
  }
}

// Ya no necesitas esta función porque el RouterLink hace la navegación
// function editar(id) { ... }

// Eliminación (puedes mejorarla después con el service real)
function eliminar(id) {
  if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
    // Aquí iría: await categoriaProductoService.eliminar(id)
    alert(`Categoría con ID ${id} eliminada (simulado)`)
    getCategoriasProductos() // recarga la lista
  }
}
</script>

<style scoped>
table {
  border-radius: 10px;
  overflow: hidden;
}
</style>