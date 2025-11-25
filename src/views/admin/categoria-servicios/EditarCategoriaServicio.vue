<template>
  <div class="container mt-4 page-container">
    <div class="form-card shadow-lg">
      
      <div class="card-header edit">
        <h3><i class="bi bi-pencil-square"></i> Editar Categoría (ID: {{ id }})</h3>
        <button class="btn-back" @click="volver">Volver</button>
      </div>

      <div class="card-body">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-warning" role="status"></div>
          <p class="mt-2">Cargando datos del servidor...</p>
        </div>

        <form v-else @submit.prevent="guardarCambios">
          <div class="form-group">
            <label>Nombre</label>
            <input v-model="form.nombre_categoria_servicio" type="text" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="form.descripcion" rows="4" class="form-control"></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="volver">Cancelar</button>
            <button type="submit" class="btn-save edit">Guardar Cambios</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import servicioCat from '../../../services/categoriaServicio.service.js'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const form = ref({
  nombre_categoria_servicio: '',
  descripcion: ''
})

// 1. CAPTURAMOS EL ID DE LA URL
const id = route.params.id 

onMounted(async () => {
  console.log("--- INICIANDO EDICIÓN ---")
  console.log("ID capturado de URL:", id)
  await cargarDatos()
})

async function cargarDatos() {
  try {
    // 2. PEDIMOS LOS DATOS AL BACKEND
    const res = await servicioCat.mostrar(id)
    console.log("Datos recibidos del servidor:", res.data)
    
    const data = res.data

    // 3. LLENAMOS EL FORMULARIO (Manejo de CamelCase y snake_case)
    form.value.nombre_categoria_servicio = data.nombreCategoriaServicio || data.nombre_categoria_servicio || ''
    form.value.descripcion = data.descripcion || ''
    
    loading.value = false
  } catch (error) {
    console.error("Error al cargar:", error)
    Swal.fire('Error de Carga', 'No se pudo encontrar la categoría con ID ' + id, 'error')
    volver()
  }
}

function volver() {
  router.push('/admin/categorias-servicios')
}

async function guardarCambios() {
  try {
    const payload = {
        nombreCategoriaServicio: form.value.nombre_categoria_servicio,
        descripcion: form.value.descripcion
    }

    console.log("Enviando actualización...", payload)

    await servicioCat.modificar(id, payload)
    
    Swal.fire({ 
      icon: 'success', 
      title: '¡Actualizado!', 
      text: 'La categoría se modificó correctamente.', 
      timer: 1500, 
      showConfirmButton: false 
    })
    
    volver()

  } catch (error) {
    console.error("Error al guardar:", error)
    
    // --- MANEJO INTELIGENTE DE ERRORES ---
    if (error.response && error.response.status === 400) {
        // Capturamos la data del error (el JSON que me mostraste)
        const data = error.response.data;
        
        // Si el error es por el nombre duplicado
        if (data.nombreCategoriaServicio) {
            Swal.fire({
                icon: 'warning',
                title: 'Nombre Duplicado',
                text: data.nombreCategoriaServicio, // "El campo... ya existe"
                footer: 'Intenta usar otro nombre diferente.'
            })
        } else {
            // Otro error 400
            Swal.fire('Datos Incorrectos', 'Revisa la información ingresada.', 'warning')
        }
    } else {
        // Error genérico (500, conexión, etc)
        Swal.fire('Error del Sistema', 'No se pudo completar la edición.', 'error')
    }
  }
}
</script>

<style scoped>
.page-container { display: flex; justify-content: center; padding-bottom: 50px; }
.form-card { background: white; width: 100%; max-width: 600px; border-radius: 15px; overflow: hidden; border: 1px solid #ddd; }
.card-header.edit { background: #ff8c42; padding: 20px; color: white; display: flex; justify-content: space-between; align-items: center; }
.btn-back { background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 15px; border-radius: 20px; cursor: pointer; font-weight: bold; }
.card-body { padding: 30px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-weight: bold; color: #555; margin-bottom: 8px; }
.form-control { width: 100%; padding: 12px; border: 2px solid #eee; border-radius: 8px; outline: none; transition: 0.3s; font-size: 1rem; }
.form-control:focus { border-color: #ff8c42; box-shadow: 0 0 0 4px rgba(255, 140, 66, 0.2); }
.form-actions { display: flex; justify-content: flex-end; gap: 15px; margin-top: 30px; }
.btn-cancel { padding: 12px 25px; border: none; background: #eee; border-radius: 8px; cursor: pointer; font-weight: 600; }
.btn-save { padding: 12px 30px; border: none; color: white; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 1rem; }
.btn-save.edit { background: #ff8c42; }
.btn-save:hover { opacity: 0.9; transform: translateY(-2px); transition: 0.2s; }
</style>