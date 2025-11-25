<script setup>
import { ref } from 'vue';
import clienteService from '../../../services/cliente.service';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const router = useRouter();


// Campos del formulario
let ciUsuario = ref('');
let nombreUsuario=ref("");
let password=ref("")
let primerNombre = ref('');
let segundoNombre = ref('');
let primerApellido = ref('');
let segundoApellido = ref('');
let telefono = ref('');
let direccion = ref('');
let avatar=ref("");


async function crearCliente(e) {
    e.preventDefault(); 

    if (!ciUsuario.value || !primerNombre.value || !primerApellido.value) {
        alert("Por favor completa todos los campos obligatorios (CI, Primer Nombre, Primer Apellido).");
        return;
    }

    const datos = {
        ciUsuario: ciUsuario.value,
        nombreUsuario:ciUsuario.value,
        password:ciUsuario.value,
        primerNombre: primerNombre.value,
        segundoNombre: segundoNombre.value,
        primerApellido: primerApellido.value,
        segundoApellido: segundoApellido.value,
        telefono: telefono.value,
        direccion: direccion.value,
        avatar:avatar.value
    };

    try {
        await clienteService.guardar(datos);


          Swal.fire({
        icon: 'success',
        title: '¡Cliente registrado!',
        text: 'El cliente se guardó correctamente',
        confirmButtonColor: '#f0564a'
    }).then(() => {
        router.push('/admin/usuarios/clientes'); 
    });

        
        ciUsuario.value = '';
        nombreUsuario.value="";
        password.value=""
        primerNombre.value = '';
        segundoNombre.value = '';
        primerApellido.value = '';
        segundoApellido.value = '';
        telefono.value = '';
        direccion.value = '';
        avatar.value=""


    } catch (error) {
        console.error(error);
    let mensaje = "Error al guardar cliente. Intenta nuevamente.";
    if (error.response && error.response.data) {
        mensaje = Object.values(error.response.data).join('\n');
    }
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje,
        confirmButtonColor: '#f0564a'
    });
    }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-start min-vh-100">
    <form class="border p-4 rounded shadow" style="width: 600px;" @submit="crearCliente">
      <h3 class="text-center mb-3">Registrar Cliente</h3>

      <div class="mb-3">
        <label class="form-label">Documento de identidad (CI) *</label>
        <input type="text" class="form-control" v-model="ciUsuario"/>
      </div>

      <div class="mb-3">
        <label class="form-label">Primer Nombre *</label>
        <input type="text" class="form-control" v-model="primerNombre"/>
      </div>

      <div class="mb-3">
        <label class="form-label">Segundo Nombre</label>
        <input type="text" class="form-control" v-model="segundoNombre"/>
      </div>

      <div class="mb-3">
        <label class="form-label">Primer Apellido *</label>
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
       <div class="mb-3">
        <label class="form-label">Foto de perfil</label>
        <input type="text" class="form-control" v-model="avatar"/>
      </div>

      <div class="d-flex" style="gap: 10px;">
            <button type="submit" class="btn btn-salmon">Guardar</button>
      <router-link class="btn btn-secondary" to="/admin/usuarios/clientes">
                        Cancelar  
                        </router-link>
      </div>
      
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
