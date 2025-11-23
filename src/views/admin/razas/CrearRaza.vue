<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-success">
      {{ rutaEsEditar ? 'Editar Raza' : 'Nueva Raza' }}
    </h2>

    <div class="card">
      <div class="card-body">
        <form @submit.prevent="guardarRaza">
          <div class="mb-3">
            <label class="form-label">Nombre <span class="text-danger">*</span></label>
            <input
              v-model="razaForm.nombreRaza"
              class="form-control"
              required
              placeholder="Ej: Labrador Retriever"
              :disabled="enviando"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea
              v-model="razaForm.descripcion"
              class="form-control"
              rows="4"
              placeholder="Características de la raza..."
              :disabled="enviando"
            ></textarea>
          </div>

          <div class="d-flex gap-2">
            <button 
              type="submit" 
              class="btn btn-success d-flex align-items-center"
              :disabled="enviando"
            >
              <span v-if="enviando" class="spinner-border spinner-border-sm me-2"></span>
              {{ rutaEsEditar ? 'Actualizar' : 'Crear' }} Raza
            </button>

            <RouterLink to="/admin/razas" class="btn btn-outline-secondary">
              <i class="bi bi-arrow-left"></i> Volver
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import razasService from '../../../services/raza.service'

const route = useRoute()
const router = useRouter()

const rutaEsEditar = route.path.includes('/editar/')
const razaId = route.params.id
const enviando = ref(false)

const razaForm = ref({
  nombreRaza: '',
  descripcion: ''
})

onMounted(async () => {
  if (rutaEsEditar && razaId) {
    try {
      const response = await razasService.obtenerPorId(razaId)
      razaForm.value = response.data || response
    } catch (error) {
      alert('No se pudo cargar la raza')
    }
  }
})



async function guardarRaza() {
  if (!razaForm.value.nombreRaza.trim()) {
    alert('El nombre es obligatorio')
    return
  }

  enviando.value = true

  try {
    if (rutaEsEditar) {
      await razasService.actualizar(razaId, razaForm.value)
      alert('Raza actualizada')
    } else {
      await razasService.guardar(razaForm.value)
      alert('Raza creada')
      razaForm.value = { nombreRaza: '', descripcion: '' }
    }

    router.push('/admin/razas')  // ← siempre vuelve al listado
  } catch (error) {
    alert('Error al guardar')
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  max-width: 700px;
  margin: 0 auto;
}
</style>