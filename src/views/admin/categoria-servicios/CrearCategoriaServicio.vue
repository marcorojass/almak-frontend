<template>
  <div class="container mt-4 page-container">
    <div class="form-card shadow-lg">
      
      <div class="card-header new">
        <h3><i class="bi bi-plus-circle-fill"></i> Nueva Categoría</h3>
        <button class="btn-back" @click="volver">Volver</button>
      </div>

      <div class="card-body">
        <form @submit.prevent="guardar">
          <div class="form-group">
            <label>Nombre de la Categoría</label>
            <input v-model="form.nombre_categoria_servicio" type="text" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="form.descripcion" rows="4" class="form-control"></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="volver">Cancelar</button>
            <button type="submit" class="btn-save new">Guardar Categoría</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import servicioCat from '../../../services/categoriaServicio.service.js'

const router = useRouter()
const form = ref({ nombre_categoria_servicio: '', descripcion: '' })

function volver() {
  router.push('/admin/categorias-servicios')
}

async function guardar() {
  try {
    const payload = {
        nombreCategoriaServicio: form.value.nombre_categoria_servicio,
        descripcion: form.value.descripcion
    }
    await servicioCat.guardar(payload)
    
    Swal.fire({ icon: 'success', title: 'Creado', text: 'Categoría registrada correctamente', timer: 1500, showConfirmButton: false })
    volver()
  } catch (error) {
    console.error(error)
    Swal.fire('Error', 'No se pudo guardar', 'error')
  }
}
</script>

<style scoped>
.page-container { display: flex; justify-content: center; }
.form-card { background: white; width: 100%; max-width: 600px; border-radius: 15px; overflow: hidden; }
.card-header.new { background: #1a6b56; padding: 20px; color: white; display: flex; justify-content: space-between; align-items: center; }
.btn-back { background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 15px; border-radius: 20px; cursor: pointer; }
.card-body { padding: 30px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-weight: bold; color: #555; margin-bottom: 8px; }
.form-control { width: 100%; padding: 12px; border: 2px solid #eee; border-radius: 8px; outline: none; transition: 0.3s; font-size: 1rem; }
.form-control:focus { border-color: #1a6b56; box-shadow: 0 0 0 4px rgba(26,107,86,0.1); }
.form-actions { display: flex; justify-content: flex-end; gap: 15px; margin-top: 30px; }
.btn-cancel { padding: 12px 25px; border: none; background: #eee; border-radius: 8px; cursor: pointer; font-weight: 600; }
.btn-save { padding: 12px 30px; border: none; color: white; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 1rem; }
.btn-save.new { background: #1a6b56; }
</style>