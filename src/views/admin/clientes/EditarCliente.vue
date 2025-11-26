<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import clienteService from "../../../services/cliente.service.js";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

// Variables del formulario
const usuarioId = ref(null);
const ciUsuario = ref("");
const primerNombre = ref("");
const segundoNombre = ref("");
const primerApellido = ref("");
const segundoApellido = ref("");
const telefono = ref("");
const direccion = ref("");

// Cargar datos del cliente
onMounted(async () => {
  const id = route.params.id; // Recibimos el ID (ej: 1, 15)
  usuarioId.value = id;

  try {
    const { data } = await clienteService.mostrar(id); 
    
    // Llenamos el formulario
    ciUsuario.value = data.ciUsuario;
    primerNombre.value = data.primerNombre;
    segundoNombre.value = data.segundoNombre;
    primerApellido.value = data.primerApellido;
    segundoApellido.value = data.segundoApellido;
    telefono.value = data.telefono;
    direccion.value = data.direccion;
    
  } catch (error) {
    console.error("Error al cargar cliente:", error);
    Swal.fire("Error", "No se pudo cargar la información del cliente", "error");
    router.push("/admin/usuarios/clientes");
  }
});

// Guardar cambios
async function actualizarCliente() {
  const datos = {
    usuarioId: usuarioId.value,
    ciUsuario: ciUsuario.value,
    primerNombre: primerNombre.value,
    segundoNombre: segundoNombre.value,
    primerApellido: primerApellido.value,
    segundoApellido: segundoApellido.value,
    telefono: telefono.value,
    direccion: direccion.value
  };

  try {
    // Usamos modificar como está en tu servicio
    await clienteService.modificar(usuarioId.value, datos);
    
    Swal.fire({
      icon: "success",
      title: "Cliente actualizado",
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      router.push("/admin/usuarios/clientes");
    });
    
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "No se pudieron guardar los cambios", "error");
  }
}
</script>

<template>
  <div class="container mt-4" style="max-width: 800px;">
    <div class="card shadow-sm border-0">
      <div class="card-header bg-white border-bottom py-3">
        <h4 class="text-success fw-bold mb-0">Editar Cliente</h4>
      </div>
      <div class="card-body p-4">
        <form @submit.prevent="actualizarCliente">
          
          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label fw-bold">Documento de Identidad (CI)</label>
              <input type="text" class="form-control" v-model="ciUsuario" disabled />
            </div>

            <div class="col-md-6">
              <label class="form-label">Primer Nombre</label>
              <input type="text" class="form-control" v-model="primerNombre" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">Segundo Nombre</label>
              <input type="text" class="form-control" v-model="segundoNombre" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Primer Apellido</label>
              <input type="text" class="form-control" v-model="primerApellido" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">Segundo Apellido</label>
              <input type="text" class="form-control" v-model="segundoApellido" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Teléfono</label>
              <input type="text" class="form-control" v-model="telefono" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">Dirección</label>
              <input type="text" class="form-control" v-model="direccion" required />
            </div>
          </div>

          <div class="d-flex gap-2 mt-4 justify-content-end">
             <router-link class="btn btn-secondary" to="/admin/usuarios/clientes">Cancelar</router-link>
             <button type="submit" class="btn btn-salmon text-white">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-salmon {
  background-color: #f0564a;
  border: 1px solid #f0564a;
  transition: all 0.2s;
}
.btn-salmon:hover {
  background-color: #d64539;
  border-color: #d64539;
}
</style>