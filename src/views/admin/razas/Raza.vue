<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-success mb-0">Listado de Razas</h2>
      
      <!-- CORREGIDO: clase btn-primary → btn-success + ruta correcta -->
      <RouterLink class="btn btn-success d-flex align-items-center gap-2" to="/admin/razas/crear">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
          <path d="M228.7 108.7l-48 48a8 8 0 0 1-11.4-11.4L204.7 120H32a8 8 0 0 1 0-16h172.7l-35.4-35.3a8 8 0 0 1 11.4-11.4l48 48a8 8 0 0 1 0 11.4Z"></path>
        </svg>
        Crear Nueva Raza
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
        <tr v-for="raza in razas" :key="raza.razaId">
          <td>{{ raza.razaId }}</td>
          <td>{{ raza.nombreRaza }}</td>
          <td>{{ raza.descripcion || '-' }}</td>
          <td>
            <!-- CORREGIDO: /admin/raza → /admin/razas -->
            <RouterLink
              class="btn btn-warning btn-sm me-2"
              :to="`/admin/razas/editar/${raza.razaId}`"
            >
              <i class="bi bi-pencil"></i> Editar
            </RouterLink>
            <button
              class="btn btn-danger btn-sm"
              @click="eliminarRaza(raza.razaId)"
            >
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </td>
        </tr>

        <tr v-if="!razas || razas.length === 0">
          <td colspan="4" class="text-center text-muted py-4">
            No hay razas registradas.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import razasService from '../../../services/raza.service'

const razas = ref([])

onMounted(async () => {
  await getRazas()
})

async function getRazas() {
  try {
    const response = await razasService.listar()
    razas.value = response.data || response
  } catch (error) {
    console.error('Error al cargar las razas:', error)
    alert('Error al cargar las razas')
  }
}

async function eliminarRaza(id) {
  if (!confirm('¿Estás seguro de eliminar esta raza?')) return

  try {
    await razasService.eliminar(id)
    alert('Raza eliminada correctamente')
    await getRazas()
  } catch (error) {
    console.error('Error al eliminar:', error)
    alert('No se pudo eliminar la raza')
  }
}
</script>

<style scoped>
.table {
  border-radius: 10px;
  overflow: hidden;
}
</style>