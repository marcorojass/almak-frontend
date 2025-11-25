<script setup>
import { ref, onMounted } from "vue";
import servicioService from "../../../services/servicio.service";
import categoriaServicioService from "../../../services/categoriaServicio.service";

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
  const resp = await servicioService.listarPorCategoriaYNombre(
    categoriaId.value || 0,
    nombre.value || "",
    page.value,
    size.value
  );

  servicios.value = resp.data.content;
  totalPages.value = resp.data.totalPages;
};


// FILTROS
const aplicarFiltros = () => {
  page.value = 0;
  cargarServicios();
};

const cambiarPagina = (nueva) => {
  page.value = nueva;
  cargarServicios();
};

onMounted(async () => {
  await cargarCategorias();
  await cargarServicios();
});
</script>

<template>
  <h1>Servicios</h1>

  <div class="container-fluid">

<div class="container mb-3">
  <div class="row g-2">
    <!-- FILTRO NOMBRE -->
    <div class="col-md-6">
      <input 
        type="text" 
        class="form-control" 
        v-model="nombre" 
        @input="aplicarFiltros" 
        placeholder="Nombre del servicio"
      />
    </div>

    <!-- FILTRO CATEGORÍA -->
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
</div>


 <router-link class="btn btn-green mb-3" to="/admin/servicios/crear" >
      Crear nuevo <i class="bi bi-plus-square-fill"></i>
    </router-link>

    <!-- TABLA -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Servicio</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in servicios" :key="s.servicioId">
          <td>{{ s.nombreServicio }}</td>
          <td>{{ s.categoriaServicio.nombreCategoriaServicio }}</td>
          <td>{{ s.precio }}</td>
          <td>{{ s.descripcion }}</td>
        </tr>
      </tbody>
    </table>

    <!-- PAGINACIÓN -->
    <nav>
      <ul class="pagination">
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
