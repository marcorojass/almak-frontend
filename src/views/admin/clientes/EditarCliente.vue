<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import clienteService from '../../../services/cliente.service.js';
import Swal from 'sweetalert2';

// Router
const router = useRouter();
const route = useRoute();

// Campos del formulario
let ciUsuario = ref('');
let primerNombre = ref('');
let segundoNombre = ref('');
let primerApellido = ref('');
let segundoApellido = ref('');
let telefono = ref('');
let direccion = ref('');

// ID del cliente desde la URL
const clienteId = route.params.id;

// Cargar datos del cliente al montar
onMounted(async () => {
    try {
        const { data } = await clienteService.mostrar(clienteId);
        ciUsuario.value = data.ciUsuario;
        primerNombre.value = data.primerNombre;
        segundoNombre.value = data.segundoNombre;
        primerApellido.value = data.primerApellido;
        segundoApellido.value = data.segundoApellido;
        telefono.value = data.telefono;
        direccion.value = data.direccion;
    } catch (error) {
        Swal.fire('Error', 'No se pudo cargar el cliente', 'error');
    }
});

// Función para guardar cambios
async function editarCliente(e) {
    e.preventDefault();

    const datos = {
        ciUsuario: ciUsuario.value,
        primerNombre: primerNombre.value,
        segundoNombre: segundoNombre.value,
        primerApellido: primerApellido.value,
        segundoApellido: segundoApellido.value,
        telefono: telefono.value,
        direccion: direccion.value
    };

    try {
        await clienteService.modificar(clienteId, datos);
        Swal.fire({
            icon: 'success',
            title: 'Cliente actualizado',
            confirmButtonColor: '#f0564a'
        }).then(() => {
            router.push('/clientes'); // Redirige al listado
        });
    } catch (error) {
        let mensaje = "Error al actualizar cliente.";
        if (error.response && error.response.data) {
            mensaje = Object.values(error.response.data).join('\n');
        }
        Swal.fire('Error', mensaje, 'error');
    }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-start min-vh-100">
    <form class="border p-4 rounded shadow" style="width: 600px;" @submit="editarCliente">
      <h3 class="text-center mb-3">Editar Cliente</h3>

      <div class="mb-3">
        <label class="form-label">Documento de identidad (CI)</label>
        <input type="text" class="form-control" v-model="ciUsuario" disabled/>
      </div>

      <div class="mb-3">
        <label class="form-label">Primer Nombre</label>
        <input type="text" class="form-control" v-model="primerNombre"/>
      </div>

      <div class="mb-3">
        <label class="form-label">Segundo Nombre</label>
        <input type="text" class="form-control" v-model="segundoNombre"/>
      </div>

      <div class="mb-3">
        <label class="form-label">Primer Apellido</label>
        <input type="text" class="form-control" v-model="primerApellido"/>
      </div>

      <div class="mb-3">
        <label class="form-label">Segundo Apellido</label>
        <input type="text" class="form-control" v-model="segundoApellido"/>
      </div>

      <div class="mb-3">
        <label class="form-label">Teléfono</label>
        <input type="number" class="form-control" v-model="telefono"/>
      </div>

      <div class="mb-3">
        <label class="form-label">Dirección</label>
        <input type="text" class="form-control" v-model="direccion"/>
      </div>

      <button type="submit" class="btn btn-salmon w-100">Guardar cambios</button>
    </form>
  </div>
</template>

<style scoped>
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
