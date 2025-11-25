<template>
  <div>
    <h2>Ventas</h2>

    <!-- FILTROS -->
<div class="row g-2 mb-3">
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
      <option value="">Seleccione método de pago</option>
      <option v-for="m in metodosPagos" :key="m.metodoPagoId" :value="m.metodoPagoId">
        {{ m.nombreMetodoPago }}
      </option>
    </select>
  </div>
</div>

<router-link class="btn btn-green mb-3" to="/admin/ventas/crear">
                        Crear nuevo  <i class="bi bi-plus-square-fill"></i>
                        </router-link>

<table class="table table-striped table-hover align-middle">
  <thead class="table-dark">
    <tr>
      <th>CI cliente</th>
      <th>Cliente</th>
      <th>Empleado</th>
      <th>Método de Pago</th>
      <th>Razón Social</th>
      <th>NIT</th>
      <th>Total</th>
      <th>Fecha</th>
      <th>Estado</th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="venta in ventas.content" :key="venta.ventaId">
      <td>{{ venta.cliente.ciUsuario }}</td>
      <td>
        {{ venta.cliente.primerNombre }}
        {{ venta.cliente.segundoNombre }}
        {{ venta.cliente.primerApellido }}
        {{ venta.cliente.segundoApellido }}
      </td>
      <td>{{ venta.empleado.primerNombre }}</td>
      <td>{{ venta.metodoPago.nombreMetodoPago }}</td>
      <td>{{ venta.razonSocial }}</td>
      <td>{{ venta.nit }}</td>
      <td>{{ venta.total }}</td>
      <td>{{ formatFecha(venta.fechaVenta) }}</td>
      <td>{{ venta.estado }}</td>
    </tr>
  </tbody>
</table>


    <nav aria-label="Page navigation" class="mt-3">
  <ul class="pagination justify-content-center">

    <li class="page-item" :class="{ disabled: page === 0 }">
      <a class="page-link" href="#" @click.prevent="cambiarPagina(page - 1)">
        Anterior
      </a>
    </li>

    <li class="page-item disabled">
      <span class="page-link">
        Página {{ page + 1 }} / {{ ventas.totalPages }}
      </span>
    </li>

    <li class="page-item" :class="{ disabled: page >= ventas.totalPages - 1 }">
      <a class="page-link" href="#" @click.prevent="cambiarPagina(page + 1)">
        Siguiente
      </a>
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

// Filtros
const ci = ref('')
const nit = ref('')
const razonSocial = ref('')
const metodoPagoId = ref('')

// Paginación
const page = ref(0)
const size = ref(10)

/* FORMATEAR FECHA */
const formatFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleString()
}

/* MÉTODOS DE PAGO */
const cargarMetodosPagos = async () => {
  try {
    const { data } = await metodoPagoService.listar()
    metodosPagos.value = data
  } catch (e) {
    console.error('Error al cargar métodos de pago:', e)
  }
}

/* BUSCAR VENTAS */
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

/* PAGINACIÓN */
const cambiarPagina = (n) => {
  page.value = n
  buscarVentas()
}

/* 🎯 BUSQUEDA EN TIEMPO REAL */
watch([ci, nit, razonSocial, metodoPagoId], () => {
  page.value = 0 // reset a primera página
  buscarVentas()
})

/* INICIALIZAR */
onMounted(() => {
  cargarMetodosPagos()
  buscarVentas()
})
</script>

<style scoped>
.filtros {
  margin-bottom: 1rem;
}
.filtros input,
.filtros select {
  margin-right: 0.5rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  border-bottom: 1px solid #ccc;
  padding: 0.5rem;
}
tbody td {
  border-bottom: 1px solid #eee;
  padding: 0.5rem;
}
.paginacion {
  margin-top: 1rem;
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

/* Hover */
.btn-green:hover {
    background-color: #0f534f; /* un poco más oscuro */
    border-color: #0f534f;
    color: #fff;
}

/* Active (click) */
.btn-green:active {
    background-color: #0b3d3a;
    border-color: #0b3d3a;
    color: #fff;
}

/* Disabled */
.btn-green:disabled {
    background-color: #146B65;
    opacity: 0.65;
    cursor: not-allowed;
}
</style>
