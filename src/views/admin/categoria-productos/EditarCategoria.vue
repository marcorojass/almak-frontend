<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div class="card-header bg-warning text-dark py-3">
            <h4 class="mb-0 fw-bold text-center text-white" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
              <i class="bi bi-pencil-square me-2"></i> Editar Categoría
            </h4>
          </div>

          <div class="card-body p-4 bg-light">
            
            <div v-if="cargando" class="text-center py-5">
              <div class="spinner-border text-warning" role="status"></div>
              <p class="mt-2 text-muted">Cargando información...</p>
            </div>

            <form v-else @submit.prevent="actualizarCategoria">
              
              <div class="mb-4">
                <label class="form-label fw-bold text-secondary">Nombre</label>
                <div class="input-group shadow-sm">
                  <span class="input-group-text bg-white border-end-0"><i class="bi bi-tag text-warning"></i></span>
                  <input 
                    v-model="form.nombreCategoriaProducto" 
                    type="text" 
                    class="form-control border-start-0 ps-0" 
                    required 
                    :disabled="loading"
                  >
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold text-secondary">Descripción</label>
                <textarea 
                  v-model="form.descripcion" 
                  class="form-control shadow-sm" 
                  rows="3" 
                  :disabled="loading"
                ></textarea>
              </div>

              <div class="form-check form-switch mb-4">
                <input class="form-check-input" type="checkbox" id="activoSwitch" v-model="form.activo" style="transform: scale(1.3); margin-right: 10px;">
                <label class="form-check-label fw-bold text-secondary" for="activoSwitch">
                  Categoría Activa
                </label>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button type="button" class="btn btn-secondary px-4" @click="volver">
                  Cancelar
                </button>
                <button type="submit" class="btn btn-warning text-white px-4 fw-bold" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import servicio from '../../../services/categoriaProducto.service.js'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const loading = ref(false)
const cargando = ref(true)

const form = ref({
  nombreCategoriaProducto: '',
  descripcion: '',
  activo: true
})

function volver() {
  router.push('/admin/categorias-productos')
}

onMounted(async () => {
  try {
    // Cargar datos del backend
    const res = await servicio.mostrar(id)
    const data = res.data

    // Mapeo inteligente (CamelCase o snake_case)
    form.value.nombreCategoriaProducto = data.nombreCategoriaProducto || data.nombre_categoria_producto
    form.value.descripcion = data.descripcion || ''
    // Convertir 1/0 a true/false si es necesario
    form.value.activo = (data.activo === 1 || data.activo === true)

    cargando.value = false
  } catch (error) {
    console.error(error)
    Swal.fire('Error', 'No se pudo cargar la información de la categoría.', 'error')
    volver()
  }
})

async function actualizarCategoria() {
  if (!form.value.nombreCategoriaProducto.trim()) {
    Swal.fire('Atención', 'El nombre no puede estar vacío.', 'warning')
    return
  }

  loading.value = true
  try {
    const payload = {
      nombreCategoriaProducto: form.value.nombreCategoriaProducto,
      descripcion: form.value.descripcion,
      activo: form.value.activo ? 1 : 0
    }

    await servicio.modificar(id, payload)

    // ALERTA SWEETALERT2
    await Swal.fire({
      icon: 'success',
      title: '¡Actualizado!',
      text: 'La categoría ha sido modificada con éxito.',
      timer: 2000,
      showConfirmButton: false
    })

    volver()
  } catch (error) {
    console.error(error)
    
    // Detección de nombre duplicado
    const msg = error.response?.data?.message || JSON.stringify(error.response?.data)
    if (msg && msg.includes('ya existe')) {
      Swal.fire('Nombre Duplicado', 'Ya existe otra categoría con ese nombre.', 'warning')
    } else {
      Swal.fire('Error', 'No se pudo guardar los cambios.', 'error')
    }
  } finally {
    loading.value = false
  }
}
</script>