<template>
  <div class="container mt-4">
    <h2 class="mb-3 text-success">Listado de Razas</h2>
    { raza }
    <form>
      <label for="">nombre</label>
      <input v-model="raza.nombreRaza">
      <br>
      <label for="">descripcion</label>
      <input v-model="raza.descripcion">
      <br>
      <button type="button" @click="crearRazas()">crear</button>
    </form>
    
    <table class="table table-striped table-bordered shadow-sm">
      <thead class="table-success">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in razas" :key="x.razaId">
          <td>{{ x.razaId }}</td>
          <td>{{ x.nombreRaza }}</td>
          <td>{{ x.descripcion }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              
            >
              <i class="bi bi-pencil"></i>

 Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              
            >
            <i class="bi bi-trash"></i>
              Eliminar
            </button>
          </td>
        </tr>

        <!-- Mensaje cuando no hay datos -->
        <tr v-if="razas.length === 0">
          <td colspan="4" class="text-center text-muted">
            No hay categorías registradas.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import razasService from '../../../services/raza.service'

// Estado reactivo
const razas = ref([])
const raza = ref({})

// Cargar datos al montar el componente
onMounted(() => {
  getRazas()
})

// Función asíncrona para obtener los datos del backend
async function getRazas() {
  try {
    const { data } = await razasService.listar()
    razas.value=data
  } catch (error) {
    console.error('Error al cargar categorías:', error)
  }
}
async function crearRazas() {
  try{
    const { data } = await razasService.guardar(raza.value)
    console.log(data)
    getRazas()
    raza.value= ""
  }catch(error) {
    console.error("Error al crear el registro")
  }
}

// Placeholder para botones
</script>

<style scoped>
table {
  border-radius: 10px;
  overflow: hidden;
}
</style>
