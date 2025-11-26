<template>
  <div class="d-flex" style="min-height: 100vh; background: #0a2e26;">
    <nav class="sidebar text-white d-flex flex-column">
      <div class="sidebar-header text-center py-5">
        <h3 class="fw-bold mb-0 d-flex align-items-center justify-content-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="#E47A73" viewBox="0 0 256 256">
            <path d="M224.13,136a8,8,0,0,1-5.1,7.53l-64,24a8,8,0,0,1-10.17-4.63l-16-40-24,40A8,8,0,0,1,96,168H32a8,8,0,0,1-7.53-10.13l24-64a8,8,0,0,1,4.63-4.63l40-16-40-24A8,8,0,0,1,58.63,34.1l64,24a8,8,0,0,1,4.63,10.17l-16,40,40-16A8,8,0,0,1,160,96h64a8,8,0,0,1,7.53,10.13Z"></path>
          </svg>
          ALMAK
        </h3>
      </div>
      <ul class="nav flex-column flex-grow-1 px-4 pb-4">
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/usuarios">
            <i class="bi bi-people-fill"></i>
            Usuarios
          </RouterLink>
        </li>
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/categorias-productos">
            <i class="bi bi-tag-fill"></i>
            Categorías Productos
          </RouterLink>
        </li>
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/servicios">
            <i class="bi bi-bandaid-fill"></i>
            Servicios
          </RouterLink>
        </li>
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/categorias-servicios">
            <i class="bi bi-scissors"></i>
            Categorías Servicios
          </RouterLink>
        </li>
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/productos">
            <i class="bi bi-basket3-fill"></i>
            Productos
          </RouterLink>
        </li>
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/usuarios/clientes">
            <i class="bi bi-person-vcard-fill"></i>
            Clientes
          </RouterLink>
        </li>
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/citas">
            <i class="bi bi-calendar-check-fill"></i>
            Citas
          </RouterLink>
        </li>

        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/mascotas">
            <i class="bi bi-emoji-heart-eyes" style="font-size: 1.4rem;"></i>
            Mascotas
          </RouterLink>
        </li>

        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/tipos-mascotas">
            <i class="bi bi-layers-fill"></i>
            Tipos de Mascotas
          </RouterLink>
        </li>

        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/razas">
            <i class="bi bi-tags-fill"></i>
            Razas
          </RouterLink>
        </li>
        
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/metodos-pagos">
            <i class="bi bi-credit-card-2-front-fill"></i>
            Métodos de Pago
          </RouterLink>
        </li>

        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/ventas">
            <i class="bi bi-currency-exchange"></i>
            Ventas
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div class="main-content flex-grow-1 d-flex flex-column">
      <header class="topbar d-flex justify-content-between align-items-center px-5 py-4 flex-shrink-0">
        <h4 class="mb-0 fw-bold d-flex align-items-center gap-3 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#E47A73" viewBox="0 0 256 256">
            <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74A80,80,0,0,1,80,168.85A80,80,0,0,1,143.07,204.37a8,8,0,1,0,13.4,8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44,44,0,0,1,40,108Z"></path>
          </svg>
          Panel Administrativo
        </h4>
        <button class="btn-logout d-flex align-items-center gap-3 fw-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
            <path d="M112,80a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8v96a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h88V88H120A8,8,0,0,1,112,80Zm46.66,50.34a8,8,0,0,0,11.32-11.32l-24-24a8,8,0,0,0-11.32,0l-24,24a8,8,0,0,0,11.32,11.32L120,123.31V184a8,8,0,0,0,16,0V123.31l18.66,18.65Z"></path>
          </svg>
          Cerrar sesión
        </button>
      </header>
      <main class="content flex-grow-1 p-5">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
// Lógica sin cambios
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

.sidebar {
  width: 280px;
  position: fixed;
  height: 100vh;
  background: #146B65;
  box-shadow: 12px 0 40px rgba(0, 0, 0, 0.7);
  z-index: 1000;
  flex-shrink: 0;
}
.sidebar-header {
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(164, 189, 198, 0.15);
}
.nav-link {
  color: #A4BDC6;
  padding: 16px 20px;
  border-radius: 16px;
  font-weight: 600;
  transition: all 0.4s ease;
}
.nav-link:hover,
.nav-link.router-link-active {
  background: #f0564a;
  color: white !important;
  transform: translateX(10px);
  box-shadow: 0 10px 25px rgba(26, 107, 86, 0.6);
}
.main-content {
  margin-left: 280px;
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
.topbar {
  background: #146B65;
  border-bottom: 6px solid #E47A73;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}
.btn-logout {
  background: #E47A73;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(228, 122, 115, 0.5);
}
.btn-logout:hover {
  background: #f0564a;
  transform: translateY(-4px);
}
</style>