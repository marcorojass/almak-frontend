<template>
  <div class="d-flex" style="min-height: 100vh; background: #0a2e26;">
    <!-- Sidebar -->
    <nav class="sidebar text-white d-flex flex-column">
      <div class="sidebar-header text-center py-5">
        <h3 class="fw-bold mb-0 d-flex align-items-center justify-content-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="#E47A73" viewBox="0 0 256 256">
            <path d="M224.13,136a8,8,0,0,1-5.1,7.53l-64,24a8,8,0,0,1-10.17-4.63l-16-40-24,40A8,8,0,0,1,96,168H32a8,8,0,0,1-7.53-10.13l24-64a8,8,0,0,1,4.63-4.63l40-16-40-24A8,8,0,0,1,58.63,34.1l64,24a8,8,0,0,1,4.63,10.17l-16,40,40-16A8,8,0,0,1,160,96h64a8,8,0,0,1,7.53,10.13Z"></path>
          </svg>
          PetVet
        </h3>
      </div>

      <ul class="nav flex-column flex-grow-1 px-4 pb-4">
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/usuarios">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.79,40.31,185.67,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
            Usuarios
          </RouterLink>
        </li>
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/categorias-productos">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M225.86,102.82a16,16,0,0,0-12.5-5.77l-39.56-1.63-15.27-36.1A16,16,0,0,0,143.73,48h-31.46a16,16,0,0,0-14.8,11.32L82.2,95.42,42.64,97.05a16,16,0,0,0-12.5,5.77,16.13,16.13,0,0,0-3.49,13.9l12,36.44-27.64,24.93a16,16,0,0,0-4.69,15.26,15.85,15.85,0,0,0,10.92,10.92l35.54,9.52,9.52,35.54a16,16,0,0,0,15.26,4.69c5.16-.92,9.72-4.83,11.73-9.85l24.93-27.64,36.44,12a16.13,16.13,0,0,0,13.9-3.49,16,16,0,0,0,5.77-12.5l1.63-39.56,36.1-15.27a16.13,16.13,0,0,0,3.49-13.9A16,16,0,0,0,225.86,102.82Z"></path></svg>
            Categorías
          </RouterLink>
        </li>
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/productos">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v72.18L193.83,122A16,16,0,0,0,168,129.83L145.83,152,128,134.17,72.18,190H40V72Zm0,128H94.17L152,142.17,174.17,160,216,118.18Z"></path></svg>
            Productos
          </RouterLink>
        </li>
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/mascotas">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M108,144a20,20,0,1,1-20-20A20,20,0,0,1,108,144Zm20-64a20,20,0,1,0-20-20A20,20,0,0,0,128,80Zm-8,72a20,20,0,1,0,20,20A20,20,0,0,0,120,152Zm88-92c-28.11,0-44.73,25.48-48.72,48.83A60.11,60.11,0,0,0,152,128c-32.48,0-48.38,23.31-52.41,44.71a44,44,0,1,0,56.82,0C159.9,156.94,176,136,208,136a44,44,0,0,0,0-88Zm0,64c-14.86,0-25.2,19.34-30.63,35.33C181.23,155.19,185,136,208,136A28,28,0,1,1,180,92c0-18.36,11.41-36,28-36s28,17.64,28,36S226.86,124,208,124Z"></path></svg>
            Mascotas
          </RouterLink>
        </li>
        <li class="nav-item mb-3">
          <RouterLink class="nav-link d-flex align-items-center gap-3" to="/admin/ventas">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M240,94c0,70-103.79,126.66-224,131.9V200a8,8,0,0,1,16,0v16.93C152.41,211.48,240,155.05,240,94A48,48,0,0,0,144,46V16a8,8,0,0,1,16,0V46A48,48,0,0,0,240,94Zm-72.08,6.84a8,8,0,0,1,0,14.32l-24,16a8,8,0,0,1-8.92-13.32l18.08-12-18.08-12a8,8,0,0,1,8.92-13.32Zm-56,0a8,8,0,0,1,8.92,13.32L78.76,136l18.08,12a8,8,0,0,1-8.92,13.32l-24-16a8,8,0,0,1,0-14.32ZM136,176a8,8,0,0,1-4.92,7.37l-24,8A8,8,0,0,1,96,184V144a8,8,0,0,1,16,0v24.63l12-4A8,8,0,0,1,136,176Z"></path></svg>
            Ventas
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Contenido principal - AHORA OCUPA TODO EL ANCHO -->
    <div class="main-content flex-grow-1 d-flex flex-column">
      <!-- Header fijo que llega hasta el final -->
      <header class="topbar d-flex justify-content-between align-items-center px-5 py-4 flex-shrink-0">
        <h4 class="mb-0 fw-bold d-flex align-items-center gap-3 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#E47A73" viewBox="0 0 256 256"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74A80,80,0,0,1,80,168.85A80,80,0,0,1,143.07,204.37a8,8,0,1,0,13.4,8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44,44,0,0,1,40,108Z"></path></svg>
          Panel Administrativo
        </h4>
        <button class="btn-logout d-flex align-items-center gap-3 fw-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256"><path d="M112,80a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8v96a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h88V88H120A8,8,0,0,1,112,80Zm46.66,50.34a8,8,0,0,0,11.32-11.32l-24-24a8,8,0,0,0-11.32,0l-24,24a8,8,0,0,0,11.32,11.32L120,123.31V184a8,8,0,0,0,16,0V123.31l18.66,18.65Z"></path></svg>
          Cerrar sesión
        </button>
      </header>

      <!-- Main que ocupa todo el resto del espacio -->
      <main class="content flex-grow-1 p-5">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
// Sin tocar lógica
</script>

<style scoped>
/* COLORES */
.sidebar {
  width: 280px;
  position: fixed;
  height: 100vh;
  background: linear-gradient(180deg, #0b3329 0%, #114539 100%);
  box-shadow: 12px 0 40px rgba(0, 0, 0, 0.7);
  z-index: 1000;
  flex-shrink: 0; /* Importante: evita que se comprima */
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
  background: #1A6B56;
  color: white;
  transform: translateX(10px);
  box-shadow: 0 10px 25px rgba(26, 107, 86, 0.6);
}

/* CONTENIDO PRINCIPAL - AHORA OCUPA TODO */
.main-content {
  margin-left: 280px;           /* Exactamente el ancho del sidebar */
  min-height: 100vh;
  background: #0d362d;
  color: #A4BDC6;
  display: flex;
  flex-direction: column;
}

/* Header que llega hasta el borde derecho */
.topbar {
  background: #2d3f47;
  border-bottom: 6px solid #E47A73;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  width: 100%;
  flex-shrink: 0;
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

/* Contenido que se expande al 100% */
.content {
  background: #0d362d;
  color: #A4BDC6;
  width: 100%;
  flex-grow: 1;
}

/* Forzar dark mode en todo el contenido hijo */
.content ::v-deep(*) {
  background: transparent !important;
  color: #A4BDC6 !important;
}

.content ::v-deep(.card, .table, .modal-content, .form-control) {
  background: rgba(17, 69, 57, 0.3) !important;
  border: 1px solid rgba(164, 189, 198, 0.2) !important;
  color: #A4BDC6 !important;
}

.content ::v-deep(h1, h2, h3, h4, h5, h6) {
  color: #E47A73 !important;
}

.content ::v-deep(.btn-primary) {
  background: #E47A73 !important;
  border-color: #E47A73 !important;
}
</style>