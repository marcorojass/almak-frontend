<script setup>
import { ref, onMounted } from "vue";
import servicioService from "../../../services/servicio.service";
import categoriaServicioService from "../../../services/categoriaServicio.service";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

let servicios = ref([]);
let categoriasServicios = ref([]);

let categoriaId = ref(""); 
let nombreCategoriaSerivio = ref("");
let precio = ref(0.0);

let descripcion = ref("");



const cargarCategorias = async () => {
  let resp = await categoriaServicioService.listar();
  categoriasServicios.value = resp.data;
};

onMounted(async () => {
  await cargarCategorias();
});

async function crearServicio() {
    const datos = {
        nombreServicio: nombreCategoriaSerivio.value,
        categoriaServicio: { categoriaServicioId: categoriaId.value },
        precio:precio.value,
        descripcion: descripcion.value
    };

    try {
        await servicioService.guardar(datos);

        Swal.fire({
            icon: 'success',
            title: '¡Servicio registrado!',
            text: 'El servicio se guardó correctamente',
            confirmButtonColor: '#f0564a'
        }).then(() => {
            router.push('/admin/servicios'); 
        });

        nombreCategoriaSerivio.value = '';
        categoriaId.value = "";
        descripcion.value = "";

    } catch (error) {
        console.error(error);
        let mensaje = "Error al guardar servicio. Intenta nuevamente.";
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
  <h1>Crear Servicio</h1>

  <div class="container-fluid">
    <form @submit.prevent="crearServicio">

        <div class="mb-3">
            <label class="form-label">Nombre del servicio</label>
            <input type="text" class="form-control" v-model="nombreCategoriaSerivio" />
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
    />
</div>


        <div class="mb-3">
            <label class="form-label">Categoría</label>
            <select class="form-select" v-model="categoriaId">
                <option value="">-- Seleccione categoría --</option>
                <option v-for="cat in categoriasServicios" :key="cat.categoriaServicioId" :value="cat.categoriaServicioId">
                    {{ cat.nombreCategoriaServicio }}
                </option>
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Descripción</label>
            <input type="text" class="form-control" v-model="descripcion" />
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-green">Registrar</button>
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
