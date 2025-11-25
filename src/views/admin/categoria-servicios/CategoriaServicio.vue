<template>
  <div class="container mt-4">
    
    <transition name="fade">
      <div v-if="notification.visible" class="alert alert-dismissible fade show fixed-top m-3 shadow" 
           :class="notification.type === 'success' ? 'alert-success' : 'alert-danger'" 
           style="z-index: 1050; left: auto; max-width: 400px;">
        <strong>{{ notification.type === 'success' ? '¡Éxito!' : '¡Error!' }}</strong> {{ notification.message }}
        <button type="button" class="btn-close" @click="notification.visible = false"></button>
      </div>
    </transition>

    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <div>
        <h2 class="text-success fw-bold mb-0">Categorías de Servicios</h2>
        <p class="text-muted mb-0">Administración del sistema</p>
      </div>
      
      <div class="d-flex gap-2">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search"></i>
          </span>
          <input 
            v-model="searchQuery" 
            type="text" 
            class="form-control border-start-0 ps-0" 
            placeholder="Buscar..."
          >
        </div>
        
        <button class="btn btn-success d-flex align-items-center gap-2 px-4" @click="abrirCrear">
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
                <th class="py-3 ps-4">Nombre</th>
                <th class="py-3">Descripción</th>
                <th class="py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in filteredData" :key="cat.categoria_servicio_id || cat.categoriaServicioId">
                
                <td class="fw-bold text-dark ps-4">
                  {{ cat.nombre_categoria_servicio || cat.nombreCategoriaServicio }}
                </td>
                
                <td class="text-muted text-truncate" style="max-width: 300px;">
                  {{ cat.descripcion || 'Sin descripción' }}
                </td>
                
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <button 
                      class="btn btn-warning btn-sm text-white" 
                      @click="abrirEditar(cat)" 
                      title="Editar"
                    >
                      <i class="bi bi-pen-fill"></i> </button>
                    
                    <button 
                      class="btn btn-danger btn-sm" 
                      @click="eliminar(cat)" 
                      title="Eliminar"
                    >
                      <i class="bi bi-trash-fill"></i> </button>
                  </div>
                </td>
              </tr>

              <tr v-if="filteredData.length === 0">
                <td colspan="3" class="text-center py-5 text-muted">
                  <i class="bi bi-inbox fs-1 d-block mb-2 opacity-50"></i>
                  No se encontraron categorías registradas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer bg-white py-3 d-flex justify-content-between align-items-center">
        <span class="text-muted small">Total registros: <strong>{{ filteredData.length }}</strong></span>
      </div>
    </div>

    <CrearCategoriaServicio 
      v-if="showCreate" 
      @close="showCreate = false"
      @refresh="cargarDatos"
      @notify="mostrarNotificacion"
    />

    <EditarCategoriaServicio 
      v-if="showEdit" 
      :categoria="selectedItem"
      @close="showEdit = false"
      @refresh="cargarDatos"
      @notify="mostrarNotificacion"
    />

  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { computed, onMounted, ref } from 'vue'
import servicioCat from '../../../services/categoriaServicio.service.js'
import CrearCategoriaServicio from './CrearCategoriaServicio.vue'
import EditarCategoriaServicio from './EditarCategoriaServicio.vue'

const items = ref([])
const searchQuery = ref('')
const showCreate = ref(false)
const showEdit = ref(false)
const selectedItem = ref(null)
const notification = ref({ visible: false, message: '', type: '' })

onMounted(() => {
  cargarDatos()
})

async function cargarDatos() {
  try {
    const res = await servicioCat.listar()
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
    const nombre = item.nombre_categoria_servicio || item.nombreCategoriaServicio || ''
    return nombre.toLowerCase().includes(q)
  })
})

function abrirCrear() { showCreate.value = true }

function abrirEditar(item) {
  selectedItem.value = item
  showEdit.value = true
}

async function eliminar(item) {
  // Usamos SweetAlert2 para confirmar (más bonito que confirm())
  const result = await Swal.fire({
    title: '¿Eliminar?',
    text: `Se borrará la categoría "${item.nombre_categoria_servicio || item.nombreCategoriaServicio}".`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    try {
      const id = item.categoria_servicio_id || item.categoriaServicioId
      await servicioCat.eliminar(id)
      Swal.fire('¡Eliminado!', 'La categoría ha sido borrada.', 'success')
      cargarDatos()
    } catch(e) { 
      Swal.fire('Error', 'No se pudo eliminar (posiblemente esté en uso).', 'error') 
    }
  }
}

function mostrarNotificacion(msg, type) {
  notification.value = { visible: true, message: msg, type }
  setTimeout(() => notification.value.visible = false, 3000)
}
</script>

<style scoped>
/* Solo estilos extra que Bootstrap no cubre por defecto */
.table-success {
  --bs-table-bg: #1a6b56; /* Tu verde corporativo */
  --bs-table-color: #fff;
}

/* Transición suave para la alerta */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>