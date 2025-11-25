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

// función para cargar clientes con filtros y paginación
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

// recargar al cambiar filtros
watch([filtroCi, filtroNombre, filtroApellido], () => {
  cargarClientes(0);
});

// funciones de paginación
function siguientePagina() {
  if (paginaActual.value < totalPaginas.value - 1)
    cargarClientes(paginaActual.value + 1);
}

function paginaPrevia() {
  if (paginaActual.value > 0) cargarClientes(paginaActual.value - 1);
}

// al montar
onMounted(() => cargarClientes(0));
</script>

<template>
  <div class="container mt-4">
    <h3>Clientes</h3>
    <h5>Total de registros: {{ totalRegistros }}</h5>

    <!-- filtros -->
    <div class="row mb-3">
      <div class="col">
        <input
          v-model="filtroCi"
          class="form-control"
          placeholder="Buscar por CI"
        />
      </div>
      <div class="col">
        <input
          v-model="filtroNombre"
          class="form-control"
          placeholder="Buscar por nombre"
        />
      </div>
      <div class="col">
        <input
          v-model="filtroApellido"
          class="form-control"
          placeholder="Buscar por apellido"
        />
      </div>
    </div>

    <router-link class="btn btn-green" to="/admin/usuarios/clientes/crear">
      Crear nuevo <i class="bi bi-plus-square-fill"></i>
    </router-link>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>CI</th>
          <th>Nombre completo</th>
          <th>Telefono</th>
          <th>Direccion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in clientesLista" :key="c.ciUsuario">
          <td>{{ c.ciUsuario }}</td>
          <td>
            {{ c.primerNombre }} {{ c.segundoNombre }} {{ c.primerApellido }}
            {{ c.segundoApellido }}
          </td>
          <td>{{ c.telefono }}</td>
          <td>{{ c.direccion }}</td>
          <td>
            <div class="d-flex" style="gap: 10px">
              <router-link
                class="btn btn-warning"
                :to="`/admin/usuarios/clientes/editar/${c.ciUsuario}`"
              >
                <i class="bi bi-pen-fill"></i>
              </router-link>
              <router-link class="btn btn-danger">
                <i class="bi bi-trash-fill"></i>
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- paginación -->
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: paginaActual === 0 }">
          <button class="page-link" @click="paginaPrevia">Anterior</button>
        </li>
        <li class="page-item disabled">
          <span class="page-link"
            >Página {{ paginaActual + 1 }} de {{ totalPaginas }}</span
          >
        </li>
        <li
          class="page-item"
          :class="{ disabled: paginaActual === totalPaginas - 1 }"
        >
          <button class="page-link" @click="siguientePagina">Siguiente</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style scoped>
/* Botón color salmón (similar a btn-danger) */
.btn-salmon {
  background-color: #f0564a;
  border: 1px solid #f0564a;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.15s ease-in-out;
}

.btn-salmon:hover {
  background-color: #d84c42;
  border-color: #d84c42;
  color: white;
}

.btn-salmon:active {
  background-color: #c0433a;
  border-color: #c0433a;
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
  background-color: #146b65;
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
