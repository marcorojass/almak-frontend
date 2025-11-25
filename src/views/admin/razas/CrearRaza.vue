<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
          
          <div class="card-header bg-success text-white py-3">
            <h4 class="mb-0 fw-bold text-center"><i class="bi bi-plus-circle-fill me-2"></i> Nueva Raza</h4>
          </div>

          <div class="card-body p-4 bg-light">
            <form @submit.prevent="guardar">
              
              <div class="mb-4">
                <label class="form-label fw-bold text-secondary">Nombre de la Raza</label>
                <input v-model="form.nombreRaza" type="text" class="form-control" placeholder="Ej: Golden Retriever" required :disabled="loading">
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold text-secondary">Descripción</label>
                <textarea v-model="form.descripcion" class="form-control" rows="3" placeholder="Características..." :disabled="loading"></textarea>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button type="button" class="btn btn-secondary px-4" @click="volver">Cancelar</button>
                <button type="submit" class="btn btn-success px-4 fw-bold" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Guardando...' : 'Guardar' }}
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
import razaService from '../../../services/raza.service.js'

const router = useRouter()
const loading = ref(false)
const form = ref({ nombreRaza: '', descripcion: '' })

function volver() { router.push('/admin/razas') }

async function guardar() {
  loading.value = true
  try {
    const payload = {
      nombreRaza: form.value.nombreRaza,
      descripcion: form.value.descripcion,
      activo: 1
    }
    await razaService.guardar(payload)
    await Swal.fire({ icon: 'success', title: '¡Registrado!', text: 'Raza creada correctamente.', timer: 1500, showConfirmButton: false })
    volver()
  } catch (error) {
    console.error(error)
    const msg = error.response?.data?.message || 'Error al guardar'
    Swal.fire({ icon: 'error', title: 'Error', text: msg })
  } finally { loading.value = false }
}
</script>