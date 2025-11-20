<template>
  <div class="login-container">
    <!-- Background con elementos temáticos de veterinaria -->
    <div class="background-elements">
      <div class="pet-paw paw-1"></div>
      <div class="pet-paw paw-2"></div>
      <div class="pet-paw paw-3"></div>
      <div class="pet-paw paw-4"></div>
      <div class="floating-heart heart-1">❤</div>
      <div class="floating-heart heart-2">❤</div>
      <div class="floating-bone bone-1">🦴</div>
      <div class="floating-bone bone-2">🦴</div>
    </div>
    
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
      <div class="login-card">
        <!-- Header con logo -->
        <div class="login-header text-center mb-4">
          <div class="logo-section">
            <div class="logo-container">
              <!-- Reemplaza con la ruta correcta de tu logo -->
              <img :src="logoPath" alt="Logo Veterinaria Almak" class="logo-img" @error="handleImageError">
            </div>
            <h1 class="clinic-name">Veterinaria Almak</h1>
            <p class="clinic-tagline">Cuidando a tus mejores amigos</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- Email/Usuario -->
          <div class="form-group mb-4">
            <div class="input-container">
              <i class="bi bi-person-circle input-icon"></i>
              <input
                type="text"
                class="form-control form-control-lg"
                id="email"
                v-model="form.email"
                placeholder="Usuario o Ci"
                required
              />
            </div>
          </div>

          <!-- Contraseña -->
          <div class="form-group mb-4">
            <div class="input-container">
              <i class="bi bi-shield-lock input-icon"></i>
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control form-control-lg"
                id="password"
                v-model="form.password"
                placeholder="Contraseña"
                required
              />
              <button
                type="button"
                class="btn btn-toggle-password"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>

          <!-- Options -->
          <div class="form-options d-flex justify-content-between align-items-center mb-4">
            <div class="form-check remember-me">
              <input
                type="checkbox"
                class="form-check-input"
                id="remember"
                v-model="form.remember"
              />
              <label class="form-check-label" for="remember">
                Recordar sesión
              </label>
            </div>
            <router-link to="/forgot-password" class="forgot-password">
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>

          <!-- Botón Login -->
          <button
            type="submit"
            class="btn btn-primary btn-lg w-100 mb-4 login-button"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">
              <i class="bi bi-shield-check"></i> Iniciar sesión
            </span>
            <span v-else>
              <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              Verificando...
            </span>
          </button>

          <!-- Register -->
          <div class="register-section text-center">
            <p class="register-text">¿Primera vez en nuestro sistema?</p>
            <router-link to="/registro" class="register-link">
              <i class="bi bi-person-plus"></i> Registrarse
            </router-link>
          </div>
        </form>

        <!-- Alert -->
        <transition name="fade">
          <div v-if="error" class="alert alert-danger mt-4" role="alert">
            <div class="alert-content">
              <i class="bi bi-exclamation-triangle"></i>
              <div>
                <strong>Error de acceso</strong>
                <p class="mb-0">{{ error }}</p>
              </div>
            </div>
          </div>
        </transition>
        
        <transition name="fade">
          <div v-if="success" class="alert alert-success mt-4" role="alert">
            <div class="alert-content">
              <i class="bi bi-check-circle"></i>
              <div>
                <strong>¡Éxito!</strong>
                <p class="mb-0">{{ success }}</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Footer -->
    <div class="login-footer text-center">
      <p>&copy; 2024 Veterinaria Almak. Todos los derechos reservados.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'VeterinaryLogin',
  setup() {
    const router = useRouter()
    const showPassword = ref(false)
    const isLoading = ref(false)
    const error = ref('')
    const success = ref('')
    
    // Ruta del logo - AJUSTA ESTA RUTA A LA DE TU LOGO REAL
    const logoPath = ref('/src/assets/logo.png') // Cambia esta ruta

    const form = ref({
      email: '',
      password: '',
      remember: false
    })

    const handleLogin = async () => {
      error.value = ''
      success.value = ''

      if (!form.value.email || !form.value.password) {
        error.value = 'Por favor completa todos los campos requeridos'
        return
      }

      isLoading.value = true

      try {
        // Simulación de login
        setTimeout(() => {
          success.value = 'Credenciales verificadas correctamente'
          isLoading.value = false
          // router.push('/dashboard')
        }, 1500)
      } catch (err) {
        error.value = err.message || 'Error en el proceso de autenticación'
        isLoading.value = false
      }
    }

    // Manejar error de carga de imagen
    const handleImageError = (event) => {
      console.warn('No se pudo cargar el logo, usando alternativa')
      // Si no hay logo, mostrar un ícono en su lugar
      event.target.style.display = 'none'
      event.target.parentElement.innerHTML = '<i class="bi bi-paw logo-fallback"></i>'
    }

    return {
      form,
      showPassword,
      isLoading,
      error,
      success,
      logoPath,
      handleLogin,
      handleImageError
    }
  }
}
</script>

<style scoped>
/* Paleta de colores profesional para veterinaria */
:root {
  --primary-dark: #0d3528;
  --primary: #1a6b56;
  --primary-light: #2a8d6f;
  --primary-soft: rgba(26, 107, 86, 0.1);
  --accent: #e47a73;
  --accent-light: #f8a8a3;
  --accent-soft: rgba(228, 122, 115, 0.1);
  --neutral: #a4bdc6;
  --neutral-light: #e8f1f3;
  --text-dark: #1a3c32;
  --text-light: #6b8c85;
  --white: #ffffff;
  --shadow: rgba(13, 53, 40, 0.15);
  --shadow-strong: rgba(13, 53, 40, 0.25);
}

.login-container {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Elementos de fondo animados */
.background-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.pet-paw {
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--accent-soft);
  border-radius: 50%;
  opacity: 0.6;
  animation: float 8s ease-in-out infinite;
}

.pet-paw::before,
.pet-paw::after {
  content: '';
  position: absolute;
  background: var(--accent-soft);
  border-radius: 50%;
}

.pet-paw::before {
  width: 20px;
  height: 20px;
  top: -10px;
  left: 10px;
}

.pet-paw::after {
  width: 15px;
  height: 15px;
  top: 5px;
  left: -8px;
}

.paw-1 {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.paw-2 {
  top: 25%;
  right: 15%;
  animation-delay: 2s;
}

.paw-3 {
  bottom: 20%;
  left: 15%;
  animation-delay: 4s;
}

.paw-4 {
  bottom: 30%;
  right: 10%;
  animation-delay: 6s;
}

.floating-heart,
.floating-bone {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.3;
  animation: float 10s ease-in-out infinite;
}

.heart-1 {
  top: 20%;
  right: 20%;
  animation-delay: 1s;
}

.heart-2 {
  bottom: 25%;
  left: 20%;
  animation-delay: 5s;
}

.bone-1 {
  top: 30%;
  left: 20%;
  animation-delay: 3s;
}

.bone-2 {
  bottom: 15%;
  right: 25%;
  animation-delay: 7s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(5deg);
  }
  66% {
    transform: translateY(10px) rotate(-5deg);
  }
}

.login-card {
  background: var(--white);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px var(--shadow-strong);
  position: relative;
  z-index: 10;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: cardEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes cardEntrance {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(to right, var(--accent), var(--primary-light));
  border-radius: 20px 20px 0 0;
}

/* Header con logo */
.logo-section {
  margin-bottom: 1.5rem;
}

.logo-container {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, var(--primary-light), var(--primary));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px var(--shadow);
  border: 4px solid var(--white);
  position: relative;
  overflow: hidden;
}

.logo-container::after {
  content: '';
  position: absolute;
  width: 150%;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(-45deg);
  top: -10px;
  left: -25%;
}

.logo-img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  z-index: 2;
  object-fit: contain;
}

/* Ícono de respaldo si no hay logo */
.logo-fallback {
  font-size: 2.5rem;
  color: white;
  z-index: 2;
}

.clinic-name {
  color: var(--text-dark);
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.clinic-tagline {
  color: var(--text-light);
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0;
}

/* Formulario */
.login-form {
  margin-top: 2rem;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--primary);
  font-size: 1.2rem;
  z-index: 2;
}

.form-control,
.form-control-lg {
  border: 2px solid var(--neutral-light);
  border-radius: 12px;
  padding: 0.85rem 1rem 0.85rem 3rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: var(--text-dark);
  background: var(--white);
  font-weight: 500;
  width: 100%;
}

.form-control::placeholder {
  color: var(--neutral);
  font-weight: 400;
}

.form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 0.2rem var(--primary-soft);
  outline: none;
  background: var(--white);
}

.btn-toggle-password {
  position: absolute;
  right: 1rem;
  background: transparent;
  border: none;
  color: var(--text-light);
  font-size: 1.1rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  z-index: 2;
}

.btn-toggle-password:hover {
  background: var(--primary-soft);
  color: var(--primary);
}

/* Opciones del formulario */
.form-options {
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
}

.form-check-input {
  border: 2px solid var(--neutral);
  border-radius: 4px;
  width: 1.2em;
  height: 1.2em;
  cursor: pointer;
  margin-right: 0.5rem;
}

.form-check-input:checked {
  background-color: var(--primary);
  border-color: var(--primary);
}

.form-check-label {
  color: var(--text-dark);
  font-weight: 500;
  cursor: pointer;
}

.forgot-password {
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.forgot-password:hover {
  color: var(--accent);
  text-decoration: underline;
}

/* Botón de login */
.login-button {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border: none;
  font-weight: 600;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  transition: all 0.4s ease;
  color: var(--white);
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s;
}

.login-button:hover:not(:disabled)::before {
  left: 100%;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px var(--shadow-strong);
}

.login-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

/* Sección de registro */
.register-section {
  padding-top: 1.5rem;
  border-top: 1px solid var(--neutral-light);
}

.register-text {
  color: var(--text-light);
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.register-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.register-link:hover {
  color: var(--primary-dark);
  background: var(--primary-soft);
  text-decoration: none;
}

/* Alertas */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.alert {
  border-radius: 12px;
  border: none;
  padding: 1rem 1.25rem;
  box-shadow: 0 5px 15px var(--shadow);
}

.alert-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.alert i {
  font-size: 1.3rem;
  margin-top: 0.1rem;
}

.alert-danger {
  background: rgba(228, 122, 115, 0.1);
  color: #b71c1c;
  border-left: 4px solid var(--accent);
}

.alert-success {
  background: rgba(26, 107, 86, 0.1);
  color: var(--primary-dark);
  border-left: 4px solid var(--primary);
}

.alert strong {
  display: block;
  margin-bottom: 0.25rem;
}

/* Footer */
.login-footer {
  position: absolute;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
}

/* Responsive */
@media (max-width: 576px) {
  .login-card {
    padding: 2rem 1.5rem;
    margin: 1rem;
    border-radius: 16px;
  }
  
  .clinic-name {
    font-size: 1.7rem;
  }
  
  .logo-container {
    width: 80px;
    height: 80px;
  }
  
  .logo-img {
    width: 50px;
    height: 50px;
  }
  
  .logo-fallback {
    font-size: 2rem;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .forgot-password {
    align-self: flex-end;
  }
  
  .pet-paw,
  .floating-heart,
  .floating-bone {
    display: none;
  }
}

/* Animación spinner */
.spinner-border {
  width: 1rem;
  height: 1rem;
  border-width: 0.15em;
}
</style>