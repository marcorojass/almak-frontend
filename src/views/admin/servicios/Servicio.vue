<script setup>
import { ref, onMounted } from "vue";
import servicioService from "../../../services/servicio.service";
import categoriaServicioService from "../../../services/categoriaServicio.service";
import Swal from "sweetalert2"; 

let servicios = ref([]);
let categoriasServicios = ref([]);

let categoriaId = ref(""); 
let nombre = ref("");

let page = ref(0);
let size = ref(10);
let totalPages = ref(0);

const cargarCategorias = async () => {
  let resp = await categoriaServicioService.listar();
  categoriasServicios.value = resp.data;
};

const cargarServicios = async () => {
  try {
    const resp = await servicioService.listarPorCategoriaYNombre(
      categoriaId.value || 0,
      nombre.value || "",
      page.value,
      size.value
    );
    servicios.value = resp.data.content;
    totalPages.value = resp.data.totalPages;
  } catch (error) {
    console.error("Error cargando servicios", error);
  }
};

const aplicarFiltros = () => {
  page.value = 0;
  cargarServicios();
};

const cambiarPagina = (nueva) => {
  page.value = nueva;
  cargarServicios();
};

const eliminarServicio = (id) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esta acción",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#146b65', 
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      servicioService.eliminar(id)
        .then(() => {
          Swal.fire('Eliminado', 'El servicio ha sido eliminado.', 'success');
          cargarServicios(); 
        })
        .catch((error) => {
          console.error(error);
          Swal.fire('Error', 'No se pudo eliminar el servicio.', 'error');
        });
    }
  });
};

onMounted(async () => {
  await cargarCategorias();
  await cargarServicios();
});
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="text-success fw-bold mb-0">Gestión de Servicios</h2>
        <p class="text-muted mb-0">Catálogo de prestaciones</p>
      </div>
      <router-link class="btn btn-green shadow-sm" to="/admin/servicios/crear">
        <i class="bi bi-plus-lg"></i> Nuevo Servicio
      </router-link>
    </div>

    <div class="row g-2 mb-4">
      <div class="col-md-6">
        <input 
          type="text" 
          class="form-control" 
          v-model="nombre" 
          @input="aplicarFiltros" 
          placeholder="Nombre del servicio"
        />
      </div>

      <div class="col-md-6">
        <select 
          class="form-select" 
          v-model="categoriaId" 
          @change="aplicarFiltros"
        >
          <option value="">-- Todas las categorías --</option>
          <option 
            v-for="cat in categoriasServicios" 
            :key="cat.categoriaServicioId" 
            :value="cat.categoriaServicioId"
          >
            {{ cat.nombreCategoriaServicio }}
          </option>
        </select>
      </div>
    </div>

    <div class="card shadow-sm border-0 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle mb-0">
            <thead class="table-success text-white">
              <tr>
                <th class="py-3 ps-4">Servicio</th>
                <th class="py-3">Categoría</th>
                <th class="py-3">Precio</th>
                <th class="py-3">Descripción</th>
                <th class="py-3 text-center" style="width: 150px;">Acciones</th> 
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in servicios" :key="s.servicioId">
                <td class="ps-4 fw-bold">{{ s.nombreServicio }}</td>
                <td>{{ s.categoriaServicio.nombreCategoriaServicio }}</td>
                <td class="fw-bold text-success">{{ s.precio }} Bs.</td> 
                <td class="text-muted text-truncate" style="max-width: 300px;">{{ s.descripcion }}</td>
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <router-link 
                      :to="`/admin/servicios/editar/${s.servicioId}`" 
                      class="btn btn-warning btn-sm text-white"
                      title="Editar"
                    >
                      <i class="bi bi-pen-fill"></i>
                    </router-link>
                    
                    <button 
                      @click="eliminarServicio(s.servicioId)" 
                      class="btn btn-danger btn-sm"
                      title="Eliminar"
                    >
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
               <tr v-if="servicios.length === 0">
                 <td colspan="5" class="text-center py-5 text-muted">
                   <i class="bi bi-clipboard2-pulse fs-1 d-block mb-2 opacity-50"></i>
                   No se encontraron servicios.
                 </td>
               </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <nav class="mt-4">
      <ul class="pagination justify-content-center">
        <li :class="['page-item', {disabled: page === 0}]">
          <button class="page-link" @click="cambiarPagina(page - 1)">Anterior</button>
        </li>
        <li 
          class="page-item" 
          v-for="n in totalPages" 
          :key="n" 
          :class="{active: n - 1 === page}"
        >
          <button class="page-link" @click="cambiarPagina(n - 1)">{{ n }}</button>
        </li>
        <li :class="['page-item', {disabled: page === totalPages - 1}]">
          <button class="page-link" @click="cambiarPagina(page + 1)">Siguiente</button>
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