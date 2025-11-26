<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="text-success fw-bold mb-0">Gestión de Ventas</h2>
        <p class="text-muted mb-0">Historial de transacciones</p>
      </div>
      <router-link class="btn btn-green shadow-sm" to="/admin/ventas/crear">
        <i class="bi bi-plus-lg"></i> Nueva Venta
      </router-link>
    </div>

    <div class="row g-2 mb-4">
      <div class="col-md-3">
        <input v-model="ci" type="text" class="form-control" placeholder="CI del cliente">
      </div>
      <div class="col-md-3">
        <input v-model="nit" type="text" class="form-control" placeholder="NIT">
      </div>
      <div class="col-md-3">
        <input v-model="razonSocial" type="text" class="form-control" placeholder="Razón social">
      </div>
      <div class="col-md-3">
        <select v-model="metodoPagoId" class="form-select">
          <option value="">-- Método de pago --</option>
          <option v-for="m in metodosPagos" :key="m.metodoPagoId" :value="m.metodoPagoId">
            {{ m.nombreMetodoPago }}
          </option>
        </select>
      </div>
    </div>

    <div class="card shadow-sm border-0 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle mb-0">
            <thead class="table-success text-white">
              <tr>
                <th class="py-3 ps-4">CI Cliente</th>
                <th class="py-3">Cliente</th>
                <th class="py-3">Empleado</th>
                <th class="py-3">Método Pago</th>
                <th class="py-3">Razón Social</th>
                <th class="py-3">NIT</th>
                <th class="py-3">Total</th>
                <th class="py-3">Fecha</th>
                <th class="py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="venta in ventas.content" :key="venta.ventaId">
                <td class="ps-4">{{ venta.cliente.ciUsuario }}</td>
                <td>
                  {{ venta.cliente.primerNombre }} {{ venta.cliente.primerApellido }}
                </td>
                <td>{{ venta.empleado.primerNombre }}</td>
                <td>{{ venta.metodoPago.nombreMetodoPago }}</td>
                <td>{{ venta.razonSocial }}</td>
                <td>{{ venta.nit }}</td>
                <td class="fw-bold">{{ venta.total }} Bs.</td>
                <td>{{ formatFecha(venta.fechaVenta) }}</td>
                <td>
                    <span class="badge bg-success bg-opacity-10 text-success border border-success rounded-pill">
                        {{ venta.estado }}
                    </span>
                </td>
              </tr>
               <tr v-if="ventas.content.length === 0">
                 <td colspan="9" class="text-center py-5 text-muted">
                   <i class="bi bi-cart-x fs-1 d-block mb-2 opacity-50"></i>
                   No se encontraron ventas.
                 </td>
               </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <nav class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 0 }">
          <a class="page-link" href="#" @click.prevent="cambiarPagina(page - 1)">Anterior</a>
        </li>
        <li class="page-item disabled">
          <span class="page-link">Página {{ page + 1 }} / {{ ventas.totalPages }}</span>
        </li>
        <li class="page-item" :class="{ disabled: page >= ventas.totalPages - 1 }">
          <a class="page-link" href="#" @click.prevent="cambiarPagina(page + 1)">Siguiente</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import ventaService from '../../../services/venta.service.js'
import metodoPagoService from '../../../services/metodoPago.service.js'

const ventas = ref({ content: [], totalPages: 0 })
const metodosPagos = ref([])

const ci = ref('')
const nit = ref('')
const razonSocial = ref('')
const metodoPagoId = ref('')

const page = ref(0)
const size = ref(10)

const formatFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleString()
}

const cargarMetodosPagos = async () => {
  try {
    const { data } = await metodoPagoService.listar()
    metodosPagos.value = data
  } catch (e) {
    console.error('Error al cargar métodos de pago:', e)
  }
}

const buscarVentas = async () => {
  try {
    const params = {
      ci: ci.value || null,
      nit: nit.value || null,
      metodoPagoId: metodoPagoId.value || null,
      razonSocial: razonSocial.value || null,
      page: page.value,
      size: size.value
    }

    const { data } = await ventaService.listar(params)
    ventas.value = data

  } catch (e) {
    console.error('Error al buscar ventas:', e)
  }
}

const cambiarPagina = (n) => {
  page.value = n
  buscarVentas()
}

watch([ci, nit, razonSocial, metodoPagoId], () => {
  page.value = 0 
  buscarVentas()
})

onMounted(() => {
  cargarMetodosPagos()
  buscarVentas()
})
</script>

<style scoped>
.table-success {
  --bs-table-bg: #1a6b56;
  --bs-table-color: #fff;
  border-color: #145242;
}

.btn-green {
    background-color: #146B65;
    border: 1px solid #146B65;
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