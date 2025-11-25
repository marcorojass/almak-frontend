<script setup>
import { onMounted, ref, watch } from "vue";
import mascotaService from "./../../../services/mascota.service.js"
import tipoMascotaService from "../../../services/tipoMascota.service.js";
import razaService from "../../../services/raza.service.js";

// listas
let mascotasLista = ref([]);
let tipos = ref([]);
let razas = ref([]);

// filtros
let filtroNombre = ref("");
let filtroSexo = ref("");
let filtroRaza = ref("");
let filtroTipo = ref("");
let filtroCliente = ref(""); // ahora solo input de CI

// paginación
let paginaActual = ref(0);
let totalPaginas = ref(0);
let tamanioPagina = ref(10);
let totalRegistros = ref(0);

// obtener mascotas filtradas
async function getMascotas(page = 0) {
    const params = {
        page,
        size: tamanioPagina.value,
        nombre: filtroNombre.value || null,
        sexo: filtroSexo.value || null,
        raza: filtroRaza.value || null,
        tipo: filtroTipo.value || null,
        ciCliente: filtroCliente.value || null
    };

    const datos = await mascotaService.listarFiltradas(params);

    // proteger contra cliente undefined
    mascotasLista.value = datos.data.content
  .map(m => ({
      ...m,
      ciCliente: m.ciCliente || { primerNombre: "", segundoNombre: "", primerApellido: "", segundoApellido: "" }
  }))
  .sort((a, b) => b.mascotaId - a.mascotaId); // <-- orden descendente por ID


    paginaActual.value = datos.data.number;
    totalPaginas.value = datos.data.totalPages;
    totalRegistros.value = datos.data.totalElements;
}

// paginación
function siguientePagina() {
    if (paginaActual.value < totalPaginas.value - 1) {
        getMascotas(paginaActual.value + 1);
    }
}

function paginaPrevia() {
    if (paginaActual.value > 0) {
        getMascotas(paginaActual.value - 1);
    }
}

// cargar opciones de select
async function cargarSelects() {
    const respTipos = await tipoMascotaService.listar();
    tipos.value = respTipos.data;

    const respRazas = await razaService.listar();
    razas.value = respRazas.data;
}

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return "";

  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();

  let años = hoy.getFullYear() - nacimiento.getFullYear();
  let meses = hoy.getMonth() - nacimiento.getMonth();
  let dias = hoy.getDate() - nacimiento.getDate();

  // Ajuste si todavía no cumple el mes exacto
  if (dias < 0) {
    meses--;
  }

  // Ajuste si los meses salen negativos
  if (meses < 0) {
    años--;
    meses += 12;
  }

  // ---- LÓGICA PARA MOSTRAR ----

  // Si no tiene 1 año, mostrar solo meses
  if (años <= 0) {
    // Evitar negativo (por seguridad)
    if (meses < 0) meses = 0;
    return `${meses} meses`;
  }

  // Si tiene años pero 0 meses
  if (meses === 0) {
    return `${años} año${años > 1 ? "s" : ""}`;
  }

  // Años y meses
  return `${años} año${años > 1 ? "s" : ""} y ${meses} meses`;
}


onMounted(() => {
    cargarSelects();
    getMascotas(0);

});

// watch para filtro en tiempo real
watch(
    [filtroNombre, filtroSexo, filtroRaza, filtroTipo, filtroCliente],
    () => getMascotas(0)
);
</script>

<template>
    <h1>Mascotas</h1>
    <h4>Total de mascotas: {{ totalRegistros }}</h4>

    <!-- filtros -->
    <div class="row mb-3">
        <div class="col">
            <input type="text" class="form-control" placeholder="Nombre" v-model="filtroNombre">
        </div>
        <div class="col">
            <select class="form-control" v-model="filtroSexo">
                <option value="">Todos los sexos</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
            </select>
        </div>
        <div class="col">
            <select class="form-control" v-model="filtroRaza">
                <option value="">Todas las razas</option>
                <option v-for="r in razas" :key="r.razaId" :value="r.nombreRaza">{{ r.nombreRaza }}</option>
            </select>
        </div>
        <div class="col">
            <select class="form-control" v-model="filtroTipo">
                <option value="">Todos los tipos</option>
                <option v-for="t in tipos" :key="t.tipoMascotaId" :value="t.nombreTipoMascota">{{ t.nombreTipoMascota }}</option>
            </select>
        </div>
        <div class="col">
            <input type="text" class="form-control" placeholder="CI del cliente" v-model="filtroCliente">
        </div>
    </div>

    <div class="container-fluid">
        <router-link class="btn btn-green mb-2" to="/admin/mascotas/crear">
            Crear nuevo <i class="bi bi-plus-square-fill"></i>
        </router-link>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Mascota</th>
                    <th>Sexo</th>
                    <th>Color</th>
                    <th>Edad</th>
                    <th>Raza</th>
                    <th>Tipo</th>
                    <th>Apoderado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="mascota in mascotasLista" :key="mascota.mascotaId">
                    <td>{{ mascota.nombreMascota }}</td>
                    <td>{{ mascota.sexo }}</td>
                    <td>{{ mascota.color }}</td>
                    <td>{{ calcularEdad(mascota.fechaNacimiento) }}</td>

                    <td>{{ mascota.raza.nombreRaza }}</td>
                    <td>{{ mascota.tipoMascota.nombreTipoMascota }}</td>
                    <td>{{ mascota.cliente.primerNombre }} {{ mascota.cliente.segundoNombre }}
                        {{ mascota.cliente.primerApellido }} {{ mascota.cliente.segundoApellido }}
                    </td>
                    <td>
                        <div class="d-flex" style="gap: 10px;">
                            <router-link class="btn btn-warning">
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
        <nav aria-label="Page navigation">
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
