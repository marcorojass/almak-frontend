<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-success">
      {{ esEdicion ? 'Editar Raza' : 'Nueva Raza' }}
    </h2>

    <div class="card">
      <div class="card-body">
        <form @submit.prevent="guardarRaza">
          <div class="mb-3">
            <label class="form-label">Nombre <span class="text-danger">*</span></label>
            <input
              v-model="form.nombre"
              class="form-control"
              required
              placeholder="Ej: Labrador Retriever"
              :disabled="enviando"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea
              v-model="form.descripcion"
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
              {{ esEdicion ? 'Actualizar' : 'Crear' }} Raza
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import razasService from '../../../services/raza.service.js'

const route = useRoute()
const router = useRouter()

// Detectar si es edición por la ruta
const esEdicion = computed(() => route.path.includes('/editar/'))
const razaId = computed(() => route.params.id)

const enviando = ref(false)

// ¡¡IMPORTANTE!! Usar "nombre" y "descripcion", NO "nombreRaza"
const form = ref({
  nombre: '',
  descripcion: ''
})

// Cargar datos si es edición
onMounted(async () => {
  if (esEdicion.value && razaId.value) {
    try {
      enviando.value = true
      const response = await razasService.obtenerPorId(razaId.value)
      const raza = response.data || response

      // Mapear correctamente los campos
      form.value.nombre = raza.nombre || ''
      form.value.descripcion = raza.descripcion || ''
    } catch (error) {
      alert('Error al cargar la raza')
      console.error(error)
    } finally {
      enviando.value = false
    }
  }
})

async function guardarRaza() {
  if (!form.value.nombre?.trim()) {
    alert('El nombre de la raza es obligatorio')
    return
  }

  enviando.value = true

  try {
    // Enviar solo los campos que espera el backend
    const payload = {
      nombre: form.value.nombre.trim(),
      descripcion: form.value.descripcion?.trim() || ''
    }

    if (esEdicion.value) {
      await razasService.actualizar(razaId.value, payload)
      alert('Raza actualizada correctamente')
    } else {
      await razasService.guardar(payload)
      alert('Raza creada correctamente')
      form.value = { nombre: '', descripcion: '' }
    }

    router.push('/admin/razas')
  } catch (error) {
    console.error('Error:', error.response?.data || error)
    alert(
      'Error al guardar: ' +
        (error.response?.data?.message || 'Datos inválidos')
    )
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>