<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import clienteService from "../../../services/cliente.service"
import tipoMascotaService from "../../../services/tipoMascota.service";
import razaService from "../../../services/raza.service";
import mascotaService from "../../../services/mascota.service";

import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

// Variables del formulario
const mascotaId = ref(null);
const ci = ref(""); 
const clienteEncontrado = ref(null);

const nombreMascota = ref("");
const sexo = ref("");
const color = ref("");
const fechaNacimiento = ref("");

const tipoMascotaId = ref("");
const razaId = ref("");

// Listas para los selects
const tiposMascota = ref([]);
const razas = ref([]);

// 1. Cargar datos auxiliares (Razas y Tipos)
async function cargarCatalogos() {
  try {
      const rTipos = await tipoMascotaService.listar();
      tiposMascota.value = rTipos.data;

      const rRazas = await razaService.listar();
      razas.value = rRazas.data;
  } catch (error) {
      console.error("Error cargando catálogos", error);
  }
}

// 2. Cargar la Mascota (CON SOLUCIÓN AL ERROR 405)
async function cargarMascota() {
    const id = route.params.id;
    mascotaId.value = id;

    try {
        // INTENTO 1: Carga directa (Standard REST)
        const resp = await mascotaService.mostrar(id);
        llenarFormulario(resp.data);

    } catch (error) {
        console.warn("Fallo carga directa (Error 405/404). Iniciando Plan B: Buscar en la lista...", error);
        
        // INTENTO 2: Plan B (Cargar lista y buscar manualmente)
        try {
            // Pedimos una página grande para asegurar que venga nuestra mascota
            const respLista = await mascotaService.listar(0, 1000); 
            const lista = respLista.data.content || respLista.data; // Soporte para Pageable o Lista simple
            
            // Buscamos la mascota específica en la lista
            const mascotaEncontrada = lista.find(m => m.mascotaId == id);

            if (mascotaEncontrada) {
                llenarFormulario(mascotaEncontrada);
                console.log("¡Mascota recuperada exitosamente desde la lista!");
            } else {
                throw new Error("La mascota no existe en la base de datos.");
            }

        } catch (err2) {
            console.error(err2);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar la información de la mascota.',
                confirmButtonColor: '#f0564a'
            }).then(() => {
                router.push('/admin/mascotas');
            });
        }
    }
}

// Función auxiliar para rellenar los campos
function llenarFormulario(data) {
    nombreMascota.value = data.nombreMascota;
    sexo.value = data.sexo;
    color.value = data.color;
    
    // Formatear fecha (YYYY-MM-DD)
    if(data.fechaNacimiento) {
        fechaNacimiento.value = data.fechaNacimiento.split('T')[0];
    }

    // Asignar relaciones
    if (data.tipoMascota) tipoMascotaId.value = data.tipoMascota.tipoMascotaId;
    if (data.raza) razaId.value = data.raza.razaId;
    if (data.cliente) {
        clienteEncontrado.value = data.cliente;
        ci.value = data.cliente.ciUsuario; 
    }
}

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

async function editarMascota(e) {
  e.preventDefault();

  if (!clienteEncontrado.value) {
    Swal.fire("Debe buscar un cliente válido primero");
    return;
  }

  const datos = {
    mascotaId: mascotaId.value,
    cliente: { usuarioId: clienteEncontrado.value.usuarioId },
    tipoMascota: { tipoMascotaId: tipoMascotaId.value },
    raza: { razaId: razaId.value },
    nombreMascota: nombreMascota.value,
    sexo: sexo.value,
    color: color.value,
    fechaNacimiento: fechaNacimiento.value
  };

  try {
    await mascotaService.modificar(mascotaId.value, datos);

    Swal.fire({
      icon: "success",
      title: "Mascota actualizada",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      router.push("/admin/mascotas");
    });

  } catch (error) {
    console.error(error);
    let msg = "Error al actualizar";
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

onMounted(async () => {
  await cargarCatalogos();
  await cargarMascota();
});
</script>

<template>
  <div class="container mt-4" style="max-width: 800px;">

    <div class="card shadow-sm border-0">
      <div class="card-header bg-white border-bottom py-3">
        <h4 class="text-success fw-bold mb-0">Editar Mascota</h4>
      </div>
      
      <div class="card-body p-4">
        
        <div class="mb-4 p-3 bg-light rounded border-start border-4 border-success">
            <label class="form-label fw-bold text-dark">Dueño (Cliente)</label>
            <div class="input-group mb-2">
                <input class="form-control" v-model="ci" placeholder="Buscar por CI si desea cambiar" />
                <button class="btn btn-green" @click="buscarCliente">
                    <i class="bi bi-search"></i> Buscar
                </button>
            </div>
            
            <div v-if="clienteEncontrado" class="text-success fw-bold small">
                <i class="bi bi-person-check-fill"></i> 
                Actual: {{ clienteEncontrado.primerNombre }} {{ clienteEncontrado.primerApellido }} 
                (CI: {{ clienteEncontrado.ciUsuario }})
            </div>
            <div v-else class="text-danger small">
                <i class="bi bi-exclamation-circle"></i> Sin cliente seleccionado
            </div>
        </div>

        <form @submit="editarMascota">
          <div class="row g-3">

            <div class="col-md-6">
              <label class="form-label">Nombre Mascota</label>
              <input class="form-control" v-model="nombreMascota" required>
            </div>

            <div class="col-md-6">
              <label class="form-label">Sexo</label>
              <select class="form-select" v-model="sexo" required>
                <option value="" disabled>-- Seleccione --</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">Color</label>
              <input class="form-control" v-model="color" required>
            </div>

            <div class="col-md-6">
              <label class="form-label">Fecha Nacimiento</label>
              <div class="input-group">
                <input type="date" v-model="fechaNacimiento" class="form-control" />
                <button type="button" class="btn btn-outline-danger" @click="fechaNacimiento = ''" title="Borrar fecha">
                    <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Tipo</label>
              <select class="form-select" v-model="tipoMascotaId" required>
                <option value="" disabled>-- Seleccione --</option>
                <option v-for="t in tiposMascota" :key="t.tipoMascotaId" :value="t.tipoMascotaId">
                  {{ t.nombreTipoMascota }}
                </option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">Raza</label>
              <select class="form-select" v-model="razaId" required>
                <option value="" disabled>-- Seleccione --</option>
                <option v-for="r in razas" :key="r.razaId" :value="r.razaId">
                  {{ r.nombreRaza }}
                </option>
              </select>
            </div>

          </div>

          <div class="d-flex gap-2 mt-4 justify-content-end">
            <router-link class="btn btn-secondary" to="/admin/mascotas">Cancelar</router-link>
            <button type="submit" class="btn btn-green">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
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
.btn-green:hover {
    background-color: #0f534f;
    border-color: #0f534f;
    color: #fff;
}
</style>