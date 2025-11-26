<script setup>
import { ref, onMounted } from "vue";
import servicioService from "../../../services/servicio.service"; 
import categoriaServicioService from "../../../services/categoriaServicio.service"; 
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute(); 

// Variables reactivas
let categoriasServicios = ref([]);

let servicioId = ref(null);
let nombreServicio = ref("");
let categoriaId = ref("");
let precio = ref(0.0);
let descripcion = ref("");

// 1. Cargar las categorías para el Select
const cargarCategorias = async () => {
  let resp = await categoriaServicioService.listar();
  categoriasServicios.value = resp.data;
};

// 2. Cargar los datos del servicio actual
const cargarDatosServicio = async () => {
  try {
    const id = route.params.id; 
    servicioId.value = id;
    
    // CORRECCIÓN AQUÍ: Usamos .mostrar(id) en lugar de obtenerPorId
    const resp = await servicioService.mostrar(id);
    const data = resp.data;

    // Asignamos valores a las variables del formulario
    nombreServicio.value = data.nombreServicio;
    precio.value = data.precio;
    descripcion.value = data.descripcion;

    if (data.categoriaServicio) {
        categoriaId.value = data.categoriaServicio.categoriaServicioId;
    }
  } catch (error) {
    console.error("Error al cargar servicio", error);
    Swal.fire("Error", "No se pudo cargar la información del servicio", "error");
    router.push('/admin/servicios'); 
  }
};

onMounted(async () => {
  await cargarCategorias();
  await cargarDatosServicio();
});

// 3. Función para guardar cambios
async function actualizarServicio() {
    const datos = {
        servicioId: servicioId.value,
        nombreServicio: nombreServicio.value,
        categoriaServicio: { categoriaServicioId: categoriaId.value },
        precio: precio.value,
        descripcion: descripcion.value
    };

    try {
        // CORRECCIÓN AQUÍ: Usamos .modificar(id, datos) en lugar de actualizar
        await servicioService.modificar(servicioId.value, datos);

        Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: 'El servicio se actualizó correctamente',
            confirmButtonColor: '#146b65'
        }).then(() => {
            router.push('/admin/servicios'); 
        });

    } catch (error) {
        console.error(error);
        let mensaje = "Error al actualizar servicio.";
        if (error.response && error.response.data) {
            mensaje = typeof error.response.data === 'string' 
                ? error.response.data 
                : Object.values(error.response.data).join('\n');
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
  <h1>Editar Servicio</h1>

  <div class="container-fluid">
    <form @submit.prevent="actualizarServicio">

        <div class="mb-3">
            <label class="form-label">Nombre del servicio</label>
            <input type="text" class="form-control" v-model="nombreServicio" required />
        </div>

        <div class="mb-3">
            <label class="form-label">Precio</label>
            <input 
                type="number" 
                class="form-control" 
                v-model.number="precio" 
                min="0" 
                step="0.01" 
                placeholder="0.0"
                required
            />
        </div>

        <div class="mb-3">
            <label class="form-label">Categoría</label>
            <select class="form-select" v-model="categoriaId" required>
                <option value="">-- Seleccione categoría --</option>
                <option v-for="cat in categoriasServicios" :key="cat.categoriaServicioId" :value="cat.categoriaServicioId">
                    {{ cat.nombreCategoriaServicio }}
                </option>
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea class="form-control" v-model="descripcion" rows="3"></textarea>
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-green">Actualizar</button>
          <router-link class="btn btn-secondary" to="/admin/servicios">Cancelar</router-link>
        </div>

    </form>
  </div>
</template>

<style scoped>
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