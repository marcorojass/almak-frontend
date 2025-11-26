<script setup>
import { ref, watch, onMounted } from "vue";
import clienteService from "../../../services/cliente.service.js";

// lista de clientes
let clientesLista = ref([]);

// paginación
let paginaActual = ref(0);
let totalPaginas = ref(0);
let tamanioPagina = ref(10);
let totalRegistros = ref(0);

// filtros
let filtroCi = ref("");
let filtroNombre = ref("");
let filtroApellido = ref("");

async function cargarClientes(page = 0) {
  try {
    const params = {
      page,
      size: tamanioPagina.value,
      ci: filtroCi.value || null,
      nombre: filtroNombre.value || null,
      apellido: filtroApellido.value || null,
    };

    const { data } = await clienteService.listar(params);
    clientesLista.value = data.content;
    paginaActual.value = data.number;
    totalPaginas.value = data.totalPages;
    totalRegistros.value = data.totalElements;
  } catch (error) {
    console.error("Error cargando clientes:", error);
  }
}

watch([filtroCi, filtroNombre, filtroApellido], () => {
  cargarClientes(0);
});

function siguientePagina() {
  if (paginaActual.value < totalPaginas.value - 1)
    cargarClientes(paginaActual.value + 1);
}

function paginaPrevia() {
  if (paginaActual.value > 0) cargarClientes(paginaActual.value - 1);
}

onMounted(() => cargarClientes(0));
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="text-success fw-bold mb-0">Gestión de Clientes</h2>
        <p class="text-muted mb-0">Total de registros: {{ totalRegistros }}</p>
      </div>
      <router-link class="btn btn-green shadow-sm" to="/admin/usuarios/clientes/crear">
        <i class="bi bi-plus-lg"></i> Nuevo Cliente
      </router-link>
    </div>

    <div class="row g-2 mb-4">
      <div class="col-md-4">
        <input v-model="filtroCi" class="form-control" placeholder="Buscar por CI" />
      </div>
      <div class="col-md-4">
        <input v-model="filtroNombre" class="form-control" placeholder="Buscar por nombre" />
      </div>
      <div class="col-md-4">
        <input v-model="filtroApellido" class="form-control" placeholder="Buscar por apellido" />
      </div>
    </div>

    <div class="card shadow-sm border-0 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle mb-0">
            <thead class="table-success text-white">
              <tr>
                <th class="py-3 ps-4">CI</th>
                <th class="py-3">Nombre completo</th>
                <th class="py-3">Teléfono</th>
                <th class="py-3">Dirección</th>
                <th class="py-3 text-center" style="width: 150px;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in clientesLista" :key="c.usuarioId">
                <td class="ps-4 fw-bold">{{ c.ciUsuario }}</td>
                <td>
                  {{ c.primerNombre }} {{ c.segundoNombre }} {{ c.primerApellido }} {{ c.segundoApellido }}
                </td>
                <td>{{ c.telefono }}</td>
                <td>{{ c.direccion }}</td>
                <td class="text-center">
                  <div class="btn-group" role="group">
                    
                    <router-link
                      class="btn btn-warning btn-sm text-white"
                      :to="`/admin/usuarios/clientes/editar/${c.usuarioId}`"
                      title="Editar"
                    >
                      <i class="bi bi-pen-fill"></i>
                    </router-link>
                    
                    <button class="btn btn-danger btn-sm" title="Eliminar">
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="clientesLista.length === 0">
                <td colspan="5" class="text-center py-5 text-muted">
                   <i class="bi bi-search fs-1 d-block mb-2 opacity-50"></i>
                   No se encontraron clientes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <nav class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: paginaActual === 0 }">
          <button class="page-link" @click="paginaPrevia">Anterior</button>
        </li>
        <li class="page-item disabled">
          <span class="page-link">Página {{ paginaActual + 1 }} de {{ totalPaginas }}</span>
        </li>
        <li class="page-item" :class="{ disabled: paginaActual === totalPaginas - 1 }">
          <button class="page-link" @click="siguientePagina">Siguiente</button>
        </li>
      </ul>
    </nav>
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