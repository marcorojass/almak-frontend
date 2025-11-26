<script setup>
import { onMounted, ref, watch } from "vue";
import mascotaService from "./../../../services/mascota.service.js"
import tipoMascotaService from "../../../services/tipoMascota.service.js";
import razaService from "../../../services/raza.service.js";
import Swal from "sweetalert2"; // Importante para eliminar

// listas
let mascotasLista = ref([]);
let tipos = ref([]);
let razas = ref([]);

// filtros
let filtroNombre = ref("");
let filtroSexo = ref("");
let filtroRaza = ref("");
let filtroTipo = ref("");
let filtroCliente = ref(""); 

// paginación
let paginaActual = ref(0);
let totalPaginas = ref(0);
let tamanioPagina = ref(10);
let totalRegistros = ref(0);

async function getMascotas(page = 0) {
    try {
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

        mascotasLista.value = datos.data.content
        .map(m => ({
            ...m,
            ciCliente: m.ciCliente || { primerNombre: "", segundoNombre: "", primerApellido: "", segundoApellido: "" }
        }))
        .sort((a, b) => b.mascotaId - a.mascotaId); 

        paginaActual.value = datos.data.number;
        totalPaginas.value = datos.data.totalPages;
        totalRegistros.value = datos.data.totalElements;
    } catch (error) {
        console.error(error);
    }
}

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
  if (dias < 0) { meses--; }
  if (meses < 0) { años--; meses += 12; }
  if (años <= 0) {
    if (meses < 0) meses = 0;
    return `${meses} meses`;
  }
  if (meses === 0) {
    return `${años} año${años > 1 ? "s" : ""}`;
  }
  return `${años} año${años > 1 ? "s" : ""} y ${meses} meses`;
}

// --- FUNCION ELIMINAR ---
async function eliminarMascota(id) {
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
            await mascotaService.eliminar(id);
            Swal.fire('¡Eliminado!', 'La mascota ha sido eliminada.', 'success');
            getMascotas(paginaActual.value); // Recargar tabla
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo eliminar la mascota.', 'error');
        }
    }
}

onMounted(() => {
    cargarSelects();
    getMascotas(0);
});

watch(
    [filtroNombre, filtroSexo, filtroRaza, filtroTipo, filtroCliente],
    () => getMascotas(0)
);
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="text-success fw-bold mb-0">Gestión de Mascotas</h2>
        <p class="text-muted mb-0">Total de registros: {{ totalRegistros }}</p>
      </div>
      <router-link class="btn btn-green shadow-sm" to="/admin/mascotas/crear">
        <i class="bi bi-plus-lg"></i> Nueva Mascota
      </router-link>
    </div>

    <div class="row g-2 mb-4">
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

    <div class="card shadow-sm border-0 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle mb-0">
            <thead class="table-success text-white">
                <tr>
                    <th class="py-3 ps-4">Mascota</th>
                    <th class="py-3">Sexo</th>
                    <th class="py-3">Color</th>
                    <th class="py-3">Edad</th>
                    <th class="py-3">Raza</th>
                    <th class="py-3">Tipo</th>
                    <th class="py-3">Apoderado</th>
                    <th class="py-3 text-center" style="width: 150px;">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="mascota in mascotasLista" :key="mascota.mascotaId">
                    <td class="ps-4 fw-bold">{{ mascota.nombreMascota }}</td>
                    <td>{{ mascota.sexo }}</td>
                    <td>{{ mascota.color }}</td>
                    <td>{{ calcularEdad(mascota.fechaNacimiento) }}</td>
                    <td>{{ mascota.raza.nombreRaza }}</td>
                    <td>{{ mascota.tipoMascota.nombreTipoMascota }}</td>
                    <td>{{ mascota.cliente.primerNombre }} {{ mascota.cliente.primerApellido }}</td>
                    <td class="text-center">
                        <div class="btn-group" role="group">
                            <router-link 
                                :to="`/admin/mascotas/editar/${mascota.mascotaId}`" 
                                class="btn btn-warning btn-sm text-white"
                                title="Editar"
                            >
                                <i class="bi bi-pen-fill"></i>
                            </router-link>
                            
                            <button 
                                @click="eliminarMascota(mascota.mascotaId)" 
                                class="btn btn-danger btn-sm"
                                title="Eliminar"
                            >
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                 <tr v-if="mascotasLista.length === 0">
                    <td colspan="8" class="text-center py-5 text-muted">
                        <i class="bi bi-search fs-1 d-block mb-2 opacity-50"></i>
                        No se encontraron mascotas.
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