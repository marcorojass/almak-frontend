<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import clienteService from "../../../services/cliente.service"
import tipoMascotaService from "../../../services/tipoMascota.service";
import razaService from "../../../services/raza.service";
import mascotaService from "../../../services/mascota.service";

import Swal from "sweetalert2";

const router = useRouter();

// Form fields
const ci = ref("");
const clienteEncontrado = ref(null);

const nombreMascota = ref("");
const sexo = ref("");
const color = ref("");
const fechaNacimiento = ref("");


const tipoMascotaId = ref("");
const razaId = ref("");

// Lists independientes
const tiposMascota = ref([]);
const razas = ref([]);

async function buscarCliente() {
  if (!ci.value) return;

  try {
    const r = await clienteService.mostrarCLienteCi(ci.value);

    if (!r.data) {
      clienteEncontrado.value = null;
      Swal.fire("Cliente no encontrado");
      return;
    }

    clienteEncontrado.value = r.data;

  } catch (error) {
    clienteEncontrado.value = null;
    Swal.fire("Cliente no encontrado");
  }
}

async function cargarTiposMascota() {
  const r = await tipoMascotaService.listar();
  tiposMascota.value = r.data;
}

async function cargarRazas() {
  const r = await razaService.listar();
  razas.value = r.data;
}

async function crearMascota(e) {
  e.preventDefault();

  if (!clienteEncontrado.value) {
    Swal.fire("Debe buscar un cliente válido primero");
    return;
  }

  const datos = {
    cliente: {
      usuarioId: clienteEncontrado.value.usuarioId
    },
    tipoMascota: {
      tipoMascotaId: tipoMascotaId.value
    },
    raza: {
      razaId: razaId.value
    },
    nombreMascota: nombreMascota.value,
    sexo: sexo.value,
    color: color.value,
    fechaNacimiento: fechaNacimiento.value
  };

  try {
    await mascotaService.guardar(datos);

    Swal.fire({
      icon: "success",
      title: "Mascota registrada",
      timer: 1500,               // ⏳ Se cierra solo en 1.5s
  showConfirmButton: false,
    }).then(() => {
      router.push("/admin/mascotas");
    });

  } catch (error) {
    console.error(error);

    let msg = "Error al guardar";

    if (error.response?.data)
      msg = Object.values(error.response.data).join("\n");

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg,
      confirmButtonColor: "#f0564a"
    });
  }
}

onMounted(() => {
  cargarTiposMascota();
  cargarRazas(); // SE CARGAN TODAS LAS RAZAS
});
</script>

<template>
  <div class="container mt-4">

    <h3>Registrar Mascota</h3>

    <!-- Buscar cliente -->
    <div class="mb-3">
      <label class="form-label">Buscar cliente por CI</label>
      <div class="input-group">
        <input class="form-control" v-model="ci" placeholder="Ingrese CI" />
        <button class="btn btn-green" @click="buscarCliente">Buscar <i class="bi bi-search"></i></button>
      </div>
    </div>

    <!-- Cliente encontrado -->
    <div class="mb-3">
      <label class="form-label">Cliente</label>
      <input
        type="text"
        class="form-control"
        :value="clienteEncontrado ? clienteEncontrado.primerNombre + ' ' + clienteEncontrado.primerApellido : ''"
        disabled
      />
    </div>

    <form @submit="crearMascota">

      <div class="row">

        <div class="col-md-6 mb-3">
          <label class="form-label">Nombre Mascota</label>
          <input class="form-control" v-model="nombreMascota" required>
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Sexo</label>
          <select class="form-select" v-model="sexo" required>
            <option value="" disabled>-- Seleccione un sexo --</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Color</label>
          <input class="form-control" v-model="color" required>
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Fecha Nacimiento</label>
          <div class="d-flex gap-2 align-items-center">
  <input 
    type="date" 
    v-model="fechaNacimiento" 
    class="form-control"
  />
  <button 
    class="btn btn-outline-danger btn-sm" 
    @click="fechaNacimiento = ''"
  >
    X
  </button>
</div>

        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Tipo de Mascota</label>
          <select class="form-select" v-model="tipoMascotaId" required>
            <option value="" disabled>-- Seleccione tipo --</option>
            <option v-for="t in tiposMascota" :key="t.tipoMascotaId" :value="t.tipoMascotaId">
              {{ t.nombreTipoMascota }}
            </option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Raza</label>
          <select class="form-select" v-model="razaId" required>
            <option value="" disabled>-- Seleccione raza --</option>
            <option v-for="r in razas" :key="r.razaId" :value="r.razaId">
              {{ r.nombreRaza }}
            </option>
          </select>
        </div>

      </div>

      
      <div class="d-flex gap-2">
  <button type="submit" class="btn btn-salmon">Registrar</button>
  <router-link class="btn btn-secondary" to="/admin/mascotas">Cancelar</router-link>
</div>

    </form>

  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
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
}

.btn-salmon:active {
  background-color: #c0433a;
  border-color: #c0433a;
}
</style>
