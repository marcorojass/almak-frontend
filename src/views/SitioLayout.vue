<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #2e7d32;">
      <div class="container">
        <a class="navbar-brand fw-bold text-light" href="#">🐾 PetVet</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><RouterLink class="nav-link" to="/">Inicio</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/nosotros">Acerca de</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/contacto">Contáctanos</RouterLink></li>
            <li class="nav-item">
              <RouterLink class="btn text-light ms-2" style="background-color: #ff8a65;" to="/login">Ingresar</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  
    <div>
        <RouterView></RouterView>
    </div>

    <!-- Footer -->
    <footer class="text-center py-3" style="background-color: #2e7d32; color: white;">
      <p class="mb-0">© 2025 PetVet - Cuidamos lo que amas 💚</p>
    </footer>
  </div>
</template>

<script setup>
// no necesitas lógica por ahora
</script>

<style scoped>
body {
  background-color: #fff;
}
.card:hover {
  transform: translateY(-5px);
  transition: 0.3s;
}
</style>
