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
      sort: "productoId,desc" 
    });

    productos.value = resp.data.content
  .slice() 
  .sort((a, b) => b.productoId - a.productoId); 
totalPages.value = resp.data.totalPages;


  } catch (error) {
    console.error("Error cargando productos:", error);
  }
};

const aplicarFiltros = () => {
  page.value = 0;
  cargarProductos();
};

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
      cargarProductos(); 
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
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="text-success fw-bold mb-0">Gestión de Productos</h2>
        <p class="text-muted mb-0">Inventario general</p>
      </div>
      <router-link class="btn btn-green shadow-sm" to="/admin/productos/crear">
        <i class="bi bi-plus-lg"></i> Nuevo Producto
      </router-link>
    </div>

    <div class="row g-2 mb-4">
      <div class="col-md-3">
        <input type="text" class="form-control" placeholder="Nombre" v-model="nombre" @input="aplicarFiltros" />
      </div>
      <div class="col-md-3">
        <select class="form-select" v-model="categoriaId" @change="aplicarFiltros">
          <option value="">-- Categoría --</option>
          <option v-for="cat in categorias" :key="cat.categoriaProductoId" :value="cat.categoriaProductoId">
            {{ cat.nombreCategoriaProducto }}
          </option>
        </select>
      </div>
      <div class="col-md-2">
        <input type="number" class="form-control" placeholder="Stock >" v-model.number="stockMayor" @input="aplicarFiltros" />
      </div>
      <div class="col-md-2">
        <input type="number" class="form-control" placeholder="Stock <" v-model.number="stockMenor" @input="aplicarFiltros" />
      </div>
      <div class="col-md-2">
        <input type="number" class="form-control" placeholder="Stock =" v-model.number="stockIgual" @input="aplicarFiltros" />
      </div>
    </div>

    <div class="card shadow-sm border-0 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle mb-0">
            <thead class="table-success text-white">
              <tr>
                <th class="py-3 ps-4">Nombre</th>
                <th class="py-3">Categoría</th>
                <th class="py-3 text-center">Stock</th>
                <th class="py-3 text-end">Costo</th>
                <th class="py-3 text-end">Venta</th>
                <th class="py-3">Descripción</th>
                <th class="py-3 text-center" style="width: 150px;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in productos" :key="p.productoId">
                <td class="ps-4 fw-bold">{{ p.nombreProducto }}</td>
                <td>{{ p.categoriaProducto.nombreCategoriaProducto }}</td>
                <td class="text-center">
                    <span class="badge bg-secondary rounded-pill">{{ p.stock }}</span>
                </td>
                <td class="text-end">{{ p.precioCosto.toFixed(2) }}</td>
                <td class="text-end fw-bold text-success">{{ p.precioVenta.toFixed(2) }}</td>
                <td class="text-muted text-truncate" style="max-width: 200px;">{{ p.descripcion }}</td>
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <router-link
                      :to="`/admin/productos/editar/${p.productoId}`"
                      class="btn btn-warning btn-sm text-white"
                      title="Editar"
                    >
                      <i class="bi bi-pen-fill"></i>
                    </router-link>
                    <button class="btn btn-danger btn-sm" @click="eliminarProducto(p.productoId)" title="Eliminar">
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="productos.length === 0">
                 <td colspan="7" class="text-center py-5 text-muted">
                   <i class="bi bi-box-seam fs-1 d-block mb-2 opacity-50"></i>
                   No se encontraron productos.
                 </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <nav class="mt-4">
      <ul class="pagination justify-content-center">
        <li :class="['page-item', { disabled: page === 0 }]">
          <button class="page-link" @click="cambiarPagina(page - 1)">Anterior</button>
        </li>
        <li
          v-for="n in totalPages"
          :key="n"
          :class="['page-item', { active: n - 1 === page }]"
        >
          <button class="page-link" @click="cambiarPagina(n - 1)">{{ n }}</button>
        </li>
        <li :class="['page-item', { disabled: page === totalPages - 1 }]">
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