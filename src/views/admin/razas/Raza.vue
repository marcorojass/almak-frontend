<template>
  <div class="container mt-4">
    
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <div>
        <h2 class="text-success fw-bold mb-0">Gestión de Razas</h2>
        <p class="text-muted mb-0">Catálogo de razas disponibles</p>
      </div>
      
      <div class="d-flex gap-2">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
          <input v-model="searchQuery" type="text" class="form-control border-start-0 ps-0" placeholder="Buscar raza...">
        </div>
        
        <button class="btn btn-success d-flex align-items-center gap-2 px-4 shadow-sm" @click="irACrear">
          <i class="bi bi-plus-lg"></i> Nueva
        </button>
      </div>
    </div>

    <div class="card shadow-sm border-0 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle mb-0">
            <thead class="table-success text-white">
              <tr>
                <th class="py-3 ps-4">ID</th>
                <th class="py-3">Nombre Raza</th>
                <th class="py-3">Descripción</th>
                <th class="py-3 text-center">Estado</th>
                <th class="py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="raza in filteredData" :key="raza.raza_id || raza.razaId">
                <td class="ps-4">{{ raza.raza_id || raza.razaId }}</td>
                <td class="fw-bold text-dark">{{ raza.nombre_raza || raza.nombreRaza }}</td>
                <td class="text-muted text-truncate" style="max-width: 300px;">{{ raza.descripcion || '-' }}</td>
                
                <td class="text-center">
                  <span v-if="raza.activo" class="badge bg-success bg-opacity-10 text-success border border-success rounded-pill">Activo</span>
                  <span v-else class="badge bg-danger bg-opacity-10 text-danger border border-danger rounded-pill">Inactivo</span>
                </td>
                
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <button class="btn btn-warning btn-sm text-white" @click="editar(raza.raza_id || raza.razaId)" title="Editar">
                      <i class="bi bi-pen-fill"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" @click="eliminar(raza)" title="Eliminar">
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredData.length === 0">
                <td colspan="5" class="text-center py-5 text-muted">
                  <i class="bi bi-inbox fs-1 d-block mb-2 opacity-50"></i> No se encontraron razas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer bg-white py-3">
        <span class="text-muted small">Total: <strong>{{ filteredData.length }}</strong></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import razaService from '../../../services/raza.service.js'

const router = useRouter()
const items = ref([])
const searchQuery = ref('')

onMounted(() => cargarDatos())

async function cargarDatos() {
  try {
    const res = await razaService.listar()
    let data = []
    if (Array.isArray(res.data)) data = res.data
    else if (res.data && Array.isArray(res.data.content)) data = res.data.content
    else if (res.data && res.data.data) data = res.data.data
    items.value = data
  } catch (error) { console.error(error) }
}

const filteredData = computed(() => {
  if (!searchQuery.value) return items.value
  const q = searchQuery.value.toLowerCase()
  return items.value.filter(item => {
    const nombre = item.nombre_raza || item.nombreRaza || ''
    return nombre.toLowerCase().includes(q)
  })
})

function irACrear() { router.push('/admin/razas/crear') }
function editar(id) { router.push(`/admin/razas/editar/${id}`) }

async function eliminar(item) {
  const nombre = item.nombre_raza || item.nombreRaza
  const result = await Swal.fire({
    title: '¿Eliminar raza?',
    text: `Se borrará "${nombre}".`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar'
  })

  if (result.isConfirmed) {
    try {
      const id = item.raza_id || item.razaId
      await razaService.eliminar(id)
      Swal.fire('¡Eliminado!', 'La raza ha sido borrada.', 'success')
      cargarDatos()
    } catch(e) { Swal.fire('Error', 'No se pudo eliminar (puede estar en uso).', 'error') }
  }
}
</script>

<style scoped>
.table-success { --bs-table-bg: #1a6b56; --bs-table-color: #fff; border-color: #145242; }
.form-control:focus { border-color: #1a6b56; box-shadow: 0 0 0 0.25rem rgba(26, 107, 86, 0.25); }
</style>