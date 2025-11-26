<script setup>
import { ref, onMounted } from 'vue'
import tipoMascotaService from '../../../services/tipoMascota.service.js'
import Swal from 'sweetalert2'

// Estado
const tiposMascota = ref([])

// Cargar datos
async function cargarTiposMascota() {
  try {
    const { data } = await tipoMascotaService.listar()
    
    // Ajuste por si viene envuelto en .content o .data
    let lista = []
    if (Array.isArray(data)) lista = data
    else if (data && Array.isArray(data.content)) lista = data.content
    else if (data && data.data) lista = data.data

    tiposMascota.value = lista
  } catch (error) {
    console.error('Error al cargar tipos de mascota:', error)
  }
}

// Función Eliminar Integrada
async function eliminar(id) {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esta acción",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      await tipoMascotaService.eliminar(id);
      Swal.fire('¡Eliminado!', 'El tipo de mascota ha sido eliminado.', 'success');
      cargarTiposMascota(); // Recargar tabla
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
    }
  }
}

onMounted(() => {
  cargarTiposMascota()
})
</script>

<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="text-success fw-bold mb-0">Tipos de Mascotas</h2>
        <p class="text-muted mb-0">Total: {{ tiposMascota.length }}</p>
      </div>
      
      <router-link to="/admin/tipos-mascotas/crear" class="btn btn-green shadow-sm">
        <i class="bi bi-plus-lg me-1"></i> Nuevo Tipo
      </router-link>
    </div>

    <div class="card shadow-sm border-0 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle mb-0">
            <thead class="table-success text-white">
              <tr>
                <th class="py-3 ps-4">Nombre</th>
                <th class="py-3">Descripción</th>
                <th class="py-3 text-center">Estado</th>
                <th class="py-3 text-center" style="width: 150px;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tiposMascota" :key="item.tipoMascotaId">
                <td class="ps-4 fw-bold">{{ item.nombreTipoMascota }}</td>
                <td>{{ item.descripcion || '—' }}</td>
                <td class="text-center">
                  <span :class="item.activo ? 'badge bg-success bg-opacity-10 text-success border border-success rounded-pill' : 'badge bg-danger bg-opacity-10 text-danger border border-danger rounded-pill'">
                    {{ item.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <router-link
                      :to="`/admin/tipos-mascotas/editar/${item.tipoMascotaId}`"
                      class="btn btn-warning btn-sm text-white"
                      title="Editar"
                    >
                      <i class="bi bi-pen-fill"></i>
                    </router-link>

                    <button
                      @click="eliminar(item.tipoMascotaId)"
                      class="btn btn-danger btn-sm"
                      title="Eliminar"
                    >
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="tiposMascota.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  <i class="bi bi-emoji-frown fs-1 d-block mb-2 opacity-50"></i>
                  No hay tipos de mascotas registrados.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-success {
  --bs-table-bg: #1a6b56;
  --bs-table-color: #fff;
  border-color: #145242;
}

.btn-green {
  background-color: #146b65;
  border: 1px solid #146b65;
  color: #fff;
  padding: 8px 16px;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.btn-green:hover {
  background-color: #0f534f;
  border-color: #0f534f;
  color: #fff;
}
</style>