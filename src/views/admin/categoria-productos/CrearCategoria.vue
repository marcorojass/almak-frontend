<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div class="card-header bg-success text-white py-3">
            <h4 class="mb-0 fw-bold text-center">
              <i class="bi bi-plus-circle-fill me-2"></i> Nueva Categoría
            </h4>
          </div>

          <div class="card-body p-4 bg-light">
            <form @submit.prevent="guardarCategoria">
              
              <div class="mb-4">
                <label class="form-label fw-bold text-secondary">Nombre de la Categoría</label>
                <div class="input-group shadow-sm">
                  <span class="input-group-text bg-white border-end-0"><i class="bi bi-tag text-success"></i></span>
                  <input 
                    v-model="form.nombreCategoriaProducto" 
                    type="text" 
                    class="form-control border-start-0 ps-0" 
                    placeholder="Ej: Alimentos Premium" 
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
                  placeholder="Detalles opcionales..."
                  :disabled="loading"
                ></textarea>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button type="button" class="btn btn-secondary px-4" @click="volver">
                  Cancelar
                </button>
                <button type="submit" class="btn btn-success px-4 fw-bold" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Guardando...' : 'Guardar Categoría' }}
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import servicio from '../../../services/categoriaProducto.service.js'

const router = useRouter()
const loading = ref(false)

const form = ref({
  nombreCategoriaProducto: '',
  descripcion: ''
})

function volver() {
  router.push('/admin/categorias-productos')
}

async function guardarCategoria() {
  if (!form.value.nombreCategoriaProducto.trim()) {
    Swal.fire('Atención', 'El nombre de la categoría es obligatorio.', 'warning')
    return
  }

  loading.value = true
  try {
    // Preparamos datos para el Backend (CamelCase)
    const payload = {
      nombreCategoriaProducto: form.value.nombreCategoriaProducto,
      descripcion: form.value.descripcion,
      activo: 1 // Por defecto activa
    }

    await servicio.guardar(payload)

    // ALERTA SWEETALERT2
    await Swal.fire({
      icon: 'success',
      title: '¡Registrado!',
      text: 'La categoría se creó correctamente.',
      timer: 2000,
      showConfirmButton: false
    })

    volver()
  } catch (error) {
    console.error(error)
    // Manejo de errores del backend
    let msg = 'No se pudo guardar la categoría.'
    if (error.response?.data?.message) msg = error.response.data.message
    if (error.response?.data?.nombreCategoriaProducto) msg = error.response.data.nombreCategoriaProducto

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: msg
    })
  } finally {
    loading.value = false
  }
}
</script>