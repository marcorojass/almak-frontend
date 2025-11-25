<script setup>
import { ref, onMounted } from "vue";
import productoService from "../../../services/producto.service";
import categoriaProductoService from "../../../services/categoriaProducto.service";
import Swal from "sweetalert2";

let productos = ref([]);
let categorias = ref([]);

let nombre = ref("");
let categoriaId = ref("");
let stockMayor = ref(null);
let stockMenor = ref(null);
let stockIgual = ref(null);

let page = ref(0);
let size = ref(10);
let totalPages = ref(0);

// Cargar categorías al iniciar
const cargarCategorias = async () => {
  try {
    const resp = await categoriaProductoService.listar();
    categorias.value = resp.data;
  } catch (error) {
    console.error("Error cargando categorías:", error);
  }
};

const cargarProductos = async () => {
  try {
    const resp = await productoService.filtrar({
      nombre: nombre.value || undefined,
      categoriaId: categoriaId.value || undefined,
      stockMayor: stockMayor.value || undefined,
      stockMenor: stockMenor.value || undefined,
      stockIgual: stockIgual.value || undefined,
      page: page.value,
      size: size.value,
      sort: "productoId,desc" // <--- orden descendente
    });

    productos.value = resp.data.content
  .slice() // crea copia para no mutar el original
  .sort((a, b) => b.productoId - a.productoId); // descendente
totalPages.value = resp.data.totalPages;


  } catch (error) {
    console.error("Error cargando productos:", error);
  }
};



// Aplicar filtros
const aplicarFiltros = () => {
  page.value = 0;
  cargarProductos();
};

// Cambiar página
const cambiarPagina = (nueva) => {
  page.value = nueva;
  cargarProductos();
};
async function eliminarProducto(id) {
  const resultado = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f0564a',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (resultado.isConfirmed) {
    try {
      await productoService.eliminar(id);
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'El producto ha sido eliminado.',
        confirmButtonColor: '#146b65'
      });
      cargarProductos(); // refresca la tabla
    } catch (error) {
      console.error("Error eliminando producto:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el producto.',
        confirmButtonColor: '#f0564a'
      });
    }
  }
}


onMounted(async () => {
  await cargarCategorias();
  await cargarProductos();
});
</script>

<template>
  <div class="container-fluid">
    <h1>Productos</h1>

    <div class="row mb-3">
      <div class="col-md-3 mb-2">
        <input
          type="text"
          class="form-control"
          placeholder="Nombre del producto"
          v-model="nombre"
          @input="aplicarFiltros"
        />
      </div>

      <div class="col-md-3 mb-2">
        <select
          class="form-select"
          v-model="categoriaId"
          @change="aplicarFiltros"
        >
          <option value="">-- Todas las categorías --</option>
          <option
            v-for="cat in categorias"
            :key="cat.categoriaProductoId"
            :value="cat.categoriaProductoId"
          >
            {{ cat.nombreCategoriaProducto }}
          </option>
        </select>
      </div>

      <div class="col-md-2 mb-2">
        <input
          type="number"
          class="form-control"
          placeholder="Stock mayor a"
          v-model.number="stockMayor"
          @input="aplicarFiltros"
        />
      </div>

      <div class="col-md-2 mb-2">
        <input
          type="number"
          class="form-control"
          placeholder="Stock menor a"
          v-model.number="stockMenor"
          @input="aplicarFiltros"
        />
      </div>

      <div class="col-md-2 mb-2">
        <input
          type="number"
          class="form-control"
          placeholder="Stock igual a"
          v-model.number="stockIgual"
          @input="aplicarFiltros"
        />
      </div>
    </div>

    <router-link class="btn btn-green mb-3" to="/admin/productos/crear">
      Crear nuevo <i class="bi bi-plus-square-fill"></i>
    </router-link>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th>Precio Costo</th>
          <th>Precio Venta</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.productoId">
          <td>{{ p.nombreProducto }}</td>
          <td>{{ p.categoriaProducto.nombreCategoriaProducto }}</td>
          <td>{{ p.stock }}</td>
          <td>{{ p.precioCosto.toFixed(2) }}</td>
          <td>{{ p.precioVenta.toFixed(2) }}</td>
          <td>{{ p.descripcion }}</td>
          <td>
            <div class="d-flex gap-2">
  <router-link
    :to="`/admin/productos/editar/${p.productoId}`"
    class="btn btn-warning btn-sm d-flex align-items-center justify-content-center"
  >
    <i class="bi bi-pen-fill me-1"></i>
  </router-link>

  <button
    class="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
    @click="eliminarProducto(p.productoId)"
  >
    <i class="bi bi-trash-fill me-1"></i> 
  </button>
</div>

          </td>
        </tr>
      </tbody>
    </table>

    <nav>
      <ul class="pagination">
        <li :class="['page-item', { disabled: page === 0 }]">
          <button class="page-link" @click="cambiarPagina(page - 1)">
            Anterior
          </button>
        </li>

        <li
          v-for="n in totalPages"
          :key="n"
          :class="['page-item', { active: n - 1 === page }]"
        >
          <button class="page-link" @click="cambiarPagina(n - 1)">
            {{ n }}
          </button>
        </li>

        <li :class="['page-item', { disabled: page === totalPages - 1 }]">
          <button class="page-link" @click="cambiarPagina(page + 1)">
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
/* opcional: estilos bootstrap ya cubren la mayoría */
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

.btn-green:active {
  background-color: #0b3d3a;
  border-color: #0b3d3a;
  color: #fff;
}
</style>
