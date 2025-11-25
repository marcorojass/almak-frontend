<template>
  <div class="container mt-4">
    
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <div>
        <h2 class="text-success fw-bold mb-0">Categorías de Productos</h2>
        <p class="text-muted mb-0">Gestión del inventario</p>
      </div>
      
      <div class="d-flex gap-2">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search text-muted"></i>
          </span>
          <input 
            v-model="searchQuery" 
            type="text" 
            class="form-control border-start-0 ps-0" 
            placeholder="Buscar categoría..."
          >
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
                <th class="py-3 ps-4">Nombre</th>
                <th class="py-3">Descripción</th>
                <th class="py-3 text-center">Estado</th>
                <th class="py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in filteredData" :key="cat.categoria_producto_id || cat.categoriaProductoId">
                
                <td class="fw-bold text-dark ps-4">
                  {{ cat.nombre_categoria_producto || cat.nombreCategoriaProducto }}
                </td>
                
                <td class="text-muted text-truncate" style="max-width: 300px;">
                  {{ cat.descripcion || 'Sin descripción' }}
                </td>

                <td class="text-center">
                  <span v-if="cat.activo" class="badge bg-success bg-opacity-10 text-success border border-success rounded-pill">
                    Activo
                  </span>
                  <span v-else class="badge bg-danger bg-opacity-10 text-danger border border-danger rounded-pill">
                    Inactivo
                  </span>
                </td>
                
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <button 
                      class="btn btn-warning btn-sm text-white" 
                      @click="editar(cat.categoria_producto_id || cat.categoriaProductoId)" 
                      title="Editar"
                    >
                      <i class="bi bi-pen-fill"></i>
                    </button>
                    
                    <button 
                      class="btn btn-danger btn-sm" 
                      @click="eliminar(cat)" 
                      title="Eliminar"
                    >
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="filteredData.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  <div class="d-flex flex-column align-items-center">
                    <i class="bi bi-inbox fs-1 mb-2 opacity-50"></i>
                    <p class="mb-0">No se encontraron categorías.</p>
                  </div>
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

  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
// Asegúrate que la ruta sea correcta (3 niveles arriba)
import servicio from '../../../services/categoriaProducto.service.js'

const router = useRouter()
const items = ref([])
const searchQuery = ref('')

onMounted(() => {
  cargarDatos()
})

async function cargarDatos() {
  try {
    // Pedimos todos los datos (limit alto para que traiga todo)
    const res = await servicio.listar() // Asegúrate que tu servicio tenga ?limit=1000 si es necesario
    let data = []
    if (Array.isArray(res.data)) data = res.data
    else if (res.data && Array.isArray(res.data.content)) data = res.data.content
    else if (res.data && res.data.data) data = res.data.data
    
    items.value = data
  } catch (error) { 
    console.error(error)
    Swal.fire('Error', 'No se pudieron cargar las categorías', 'error')
  }
}

// Filtro de búsqueda en tiempo real
const filteredData = computed(() => {
  if (!searchQuery.value) return items.value
  const q = searchQuery.value.toLowerCase()
  return items.value.filter(item => {
    const nombre = item.nombre_categoria_producto || item.nombreCategoriaProducto || ''
    return nombre.toLowerCase().includes(q)
  })
})

// NAVEGACIÓN
function irACrear() {
  router.push('/admin/categorias-productos/crear')
}

function editar(id) {
  router.push(`/admin/categorias-productos/editar/${id}`)
}

// ELIMINAR CON SWEETALERT2
async function eliminar(item) {
  const nombre = item.nombre_categoria_producto || item.nombreCategoriaProducto
  
  const result = await Swal.fire({
    title: '¿Eliminar categoría?',
    text: `Se borrará "${nombre}" permanentemente.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545', // Rojo Bootstrap
    cancelButtonColor: '#6c757d', // Gris Bootstrap
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true // Pone cancelar a la izquierda (estilo moderno)
  })

  if (result.isConfirmed) {
    try {
      const id = item.categoria_producto_id || item.categoriaProductoId
      await servicio.eliminar(id)
      
      Swal.fire(
        '¡Eliminado!',
        'La categoría ha sido eliminada.',
        'success'
      )
      cargarDatos() // Recargar la tabla
    } catch(e) { 
      Swal.fire('Error', 'No se pudo eliminar (posiblemente tenga productos asociados).', 'error') 
    }
  }
}
</script>

<style scoped>
/* Ajuste fino para el verde corporativo en la tabla */
.table-success {
  --bs-table-bg: #1a6b56; 
  --bs-table-color: #fff;
  border-color: #145242;
}

/* Inputs más bonitos */
.form-control:focus {
  border-color: #1a6b56;
  box-shadow: 0 0 0 0.25rem rgba(26, 107, 86, 0.25);
}

/* Efecto hover en filas */
tbody tr { transition: all 0.2s; }
</style>