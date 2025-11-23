<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-success">
      {{ rutaEsEditar ? 'Editar Categoría' : 'Nueva Categoría' }}
    </h2>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="guardarCategoria">
          <div class="mb-3">
            <label class="form-label">
              Nombre de la Categoría <span class="text-danger">*</span>
            </label>
            <input
              v-model="form.nombreCategoriaProducto"
              type="text"
              class="form-control"
              placeholder="Ej: Alimentos, Juguetes, Medicamentos..."
              required
              :disabled="enviando"
            />
          </div>

          <div class="mb-4">
            <label class="form-label">Descripción</label>
            <textarea
              v-model="form.descripcion"
              class="form-control"
              rows="4"
              placeholder="Descripción opcional de la categoría..."
              :disabled="enviando"
            ></textarea>
          </div>

          <div class="d-flex gap-3">
            <button
              type="submit"
              class="btn btn-success d-flex align-items-center"
              :disabled="enviando"
            >
              <span
                v-if="enviando"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              {{ enviando 
                ? (rutaEsEditar ? 'Actualizando...' : 'Creando...') 
                : (rutaEsEditar ? 'Actualizar' : 'Crear') 
              }} Categoría
            </button>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import categoriaProductoService from '../../../services/categoriaProducto.service'

const route = useRoute()
const router = useRouter()

const rutaEsEditar = route.path.includes('/editar/')
const categoriaId = route.params.id

const enviando = ref(false)

const form = ref({
  nombreCategoriaProducto: '',
  descripcion: ''
})

onMounted(async () => {
  if (rutaEsEditar && categoriaId) {
    await cargarCategoria()
  }
})

async function cargarCategoria() {
  try {
    const response = await categoriaProductoService.obtenerPorId(categoriaId)
    form.value = response.data || response
  } catch (error) {
    console.error('Error al cargar categoría:', error)
    alert('No se pudo cargar la categoría para editar')
  }
}

async function guardarCategoria() {
  if (!form.value.nombreCategoriaProducto.trim()) {
    alert('El nombre de la categoría es obligatorio')
    return
  }

  enviando.value = true

  try {
    if (rutaEsEditar) {
      await categoriaProductoService.actualizar(categoriaId, form.value)
      alert('¡Categoría actualizada correctamente!')
    } else {
      await categoriaProductoService.guardar(form.value)
      alert('¡Categoría creada correctamente!')
      // Limpiar formulario para seguir creando
      form.value = { nombreCategoriaProducto: '', descripcion: '' }
    }

    // Vuelve a la página anterior (listado o donde haya venido)
    if (router.options.history.state.back) {
      router.back()
    } else {
      router.push('/admin/categorias-producto')
    }
  } catch (error) {
    console.error('Error al guardar categoría:', error)
    alert('Ocurrió un error al guardar la categoría')
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
.card {
  max-width: 700px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>