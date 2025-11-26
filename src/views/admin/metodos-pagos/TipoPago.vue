<script setup>
import { ref, onMounted } from 'vue'
import metodoPagoService from '../../../services/metodoPago.service.js' // Ajusta si la ruta varía
import Swal from 'sweetalert2'

const metodosPago = ref([])

async function cargarMetodos() {
  try {
    const { data } = await metodoPagoService.listar()
    // Ajuste por si el backend devuelve un Page o una lista directa
    let lista = []
    if (Array.isArray(data)) lista = data
    else if (data && Array.isArray(data.content)) lista = data.content
    else if (data && data.data) lista = data.data

    metodosPago.value = lista
  } catch (error) {
    console.error('Error al cargar metodos de pago:', error)
  }
}

// LÓGICA DE ELIMINAR INTEGRADA
async function eliminar(id) {
  const result = await Swal.fire({
    title: '¿Eliminar método?',
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
      await metodoPagoService.eliminar(id);
      Swal.fire('¡Eliminado!', 'El método de pago ha sido eliminado.', 'success');
      cargarMetodos(); // Recargar tabla
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
    }
  }
}

onMounted(() => {
  cargarMetodos()
})
</script>

<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="text-success fw-bold mb-0">Métodos de Pago</h2>
        <p class="text-muted mb-0">Total: {{ metodosPago.length }}</p>
      </div>
      <router-link to="/admin/metodos-pagos/crear" class="btn btn-green shadow-sm">
        <i class="bi bi-plus-lg me-1"></i> Nuevo Método
      </router-link>
    </div>

    <div class="card shadow-sm border-0 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle mb-0">
            <thead class="table-success text-white">
              <tr>
                <th class="py-3 ps-4">ID</th>
                <th class="py-3">Nombre</th>
                <th class="py-3">Descripción</th>
                <th class="py-3 text-center" style="width: 150px;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in metodosPago" :key="item.metodoPagoId">
                <td class="ps-4 fw-bold text-muted">{{ item.metodoPagoId }}</td>
                <td class="fw-bold">{{ item.nombreMetodoPago }}</td>
                <td>{{ item.descripcion || '—' }}</td>
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <router-link
                      :to="`/admin/metodos-pagos/editar/${item.metodoPagoId}`"
                      class="btn btn-warning btn-sm text-white"
                      title="Editar"
                    >
                      <i class="bi bi-pen-fill"></i>
                    </router-link>

                    <button
                      @click="eliminar(item.metodoPagoId)"
                      class="btn btn-danger btn-sm"
                      title="Eliminar"
                    >
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="metodosPago.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  <i class="bi bi-wallet2 fs-1 d-block mb-2 opacity-50"></i>
                  No hay métodos de pago registrados.
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