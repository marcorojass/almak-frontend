<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
          
          <div class="card-header bg-warning text-dark py-3">
            <h4 class="mb-0 fw-bold text-center text-white" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
              <i class="bi bi-pencil-square me-2"></i> Editar Raza
            </h4>
          </div>

          <div class="card-body p-4 bg-light">
            <div v-if="cargando" class="text-center py-5">
              <div class="spinner-border text-warning" role="status"></div>
              <p class="mt-2 text-muted">Cargando...</p>
            </div>

            <form v-else @submit.prevent="actualizar">
              <div class="mb-4">
                <label class="form-label fw-bold text-secondary">Nombre de la Raza</label>
                <input v-model="form.nombreRaza" type="text" class="form-control" required :disabled="loading">
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold text-secondary">Descripción</label>
                <textarea v-model="form.descripcion" class="form-control" rows="3" :disabled="loading"></textarea>
              </div>

              <div class="form-check form-switch mb-4">
                <input class="form-check-input" type="checkbox" v-model="form.activo" style="transform: scale(1.3); margin-right: 10px;">
                <label class="form-check-label fw-bold text-secondary">Raza Activa</label>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button type="button" class="btn btn-secondary px-4" @click="volver">Cancelar</button>
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
import razaService from '../../../services/raza.service.js'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const loading = ref(false)
const cargando = ref(true)

const form = ref({ nombreRaza: '', descripcion: '', activo: true })

function volver() { router.push('/admin/razas') }

onMounted(async () => {
  try {
    const res = await razaService.mostrar(id)
    const data = res.data
    form.value.nombreRaza = data.nombreRaza || data.nombre_raza
    form.value.descripcion = data.descripcion || ''
    form.value.activo = (data.activo === 1 || data.activo === true)
    cargando.value = false
  } catch (error) {
    Swal.fire('Error', 'No se pudo cargar la raza.', 'error')
    volver()
  }
})

async function actualizar() {
  loading.value = true
  try {
    const payload = {
      nombreRaza: form.value.nombreRaza,
      descripcion: form.value.descripcion,
      activo: form.value.activo ? 1 : 0
    }
    await razaService.modificar(id, payload)
    await Swal.fire({ icon: 'success', title: '¡Actualizado!', text: 'Raza modificada con éxito.', timer: 1500, showConfirmButton: false })
    volver()
  } catch (error) {
    console.error(error)
    const msg = error.response?.data?.message || 'Error al guardar'
    Swal.fire({ icon: 'error', title: 'Error', text: msg })
  } finally { loading.value = false }
}
</script>