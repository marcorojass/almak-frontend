<template>
  <div class="d-flex" style="min-height: 100vh;">
    <!-- Sidebar -->
    <nav
      class="bg-success text-white p-3"
      style="width: 240px; position: fixed; height: 100vh;"
    >
      <h4 class="fw-bold mb-4 text-center">🐾 PetVet</h4>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <RouterLink class="nav-link text-white" to="/admin/usuarios">
            👤 Usuarios
          </RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink class="nav-link text-white" to="/admin/categorias-productos">
            🗂️ Categorías
          </RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink class="nav-link text-white" to="/admin/productos">
            📦 Productos
          </RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink class="nav-link text-white" to="/admin/mascotas">
            🐶 Mascotas
          </RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink class="nav-link text-white" to="/admin/ventas">
            💰 Ventas
          </RouterLink>
        </li>
      </ul>
      
    </nav>

    <!-- Contenido principal -->
    <div class="flex-grow-1" style="margin-left: 240px;">
      <header
        class="bg-light shadow-sm p-3 d-flex justify-content-between align-items-center"
      >
        <h5 class="mb-0 text-success">Panel Administrativo</h5>
        <button class="btn btn-outline-danger btn-sm">Cerrar sesión</button>
      </header>

      <main class="p-4">
        <!-- Aquí se cargan las vistas hijas -->
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
// no se necesita lógica todavía
</script>

<style scoped>
.nav-link {
  font-weight: 500;
}
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  transition: 0.3s;
}
</style>
