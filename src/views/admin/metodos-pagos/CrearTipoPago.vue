<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import metodoPagoService from "../../../services/metodoPago.service.js"; // Ajusta la ruta

const router = useRouter();
const nombre = ref("");
const descripcion = ref("");
const cargando = ref(false);

const notification = ref({ visible: false, title: '', message: '', type: '', icon: '' });

function showToast(title, msg, type = 'success') {
  notification.value = { visible: true, title, message: msg,
    type: type === 'success' ? 'notify-success' : 'notify-error',
    icon: type === 'success' ? 'bi bi-check-lg' : 'bi bi-x-circle'
  };
  setTimeout(() => notification.value.visible = false, 3000);
}

async function guardar() {
  if (!nombre.value.trim()) {
    showToast("ERROR", "El nombre es obligatorio", "error");
    return;
  }

  cargando.value = true;
  try {
    const payload = {
      nombreMetodoPago: nombre.value.trim(),
      descripcion: descripcion.value.trim() || null
    };

    await metodoPagoService.guardar(payload);
    showToast("¡REGISTRADO!", "Método de pago creado", "success");
    setTimeout(() => router.push("/admin/metodos-pagos"), 1500);

  } catch (error) {
    console.error(error);
    showToast("ERROR", "No se pudo registrar", "error");
  } finally {
    cargando.value = false;
  }
}
</script>

<template>
  <div class="container mt-4">
    <transition name="pop">
      <div v-if="notification.visible" class="notification-overlay">
        <div class="custom-notification" :class="notification.type">
          <div class="icon-circle"><i :class="notification.icon"></i></div>
          <div class="content"><h4>{{ notification.title }}</h4><p>{{ notification.message }}</p></div>
        </div>
      </div>
    </transition>

    <div class="card shadow-lg border-0" style="border-radius: 15px; overflow: hidden; max-width: 600px; margin: 0 auto;">
      <div class="card-header text-white text-center py-4" style="background: linear-gradient(135deg, #1a6b56, #114539);">
        <h3 class="mb-0 fw-bold"><i class="bi bi-credit-card-2-front-fill me-2"></i> Nuevo Método</h3>
      </div>

      <div class="card-body p-4 p-lg-5 bg-light">
        <form @submit.prevent="guardar">
          <div class="mb-4">
            <label class="form-label fw-bold text-success">Nombre del Método</label>
            <input type="text" class="form-control form-control-lg shadow-sm" v-model="nombre" required placeholder="Ej: Efectivo" autocomplete="off">
          </div>

          <div class="mb-4">
            <label class="form-label fw-bold text-success">Descripción</label>
            <textarea class="form-control shadow-sm" rows="3" v-model="descripcion" placeholder="Opcional"></textarea>
          </div>

          <div class="d-flex flex-column flex-sm-row gap-3 mt-5">
            <button type="submit" class="btn btn-white text-success fw-bold py-3 shadow-sm flex-fill border" :disabled="cargando">
              {{ cargando ? 'Guardando...' : 'Registrar' }}
            </button>
            <router-link to="/admin/metodos-pagos" class="btn btn-outline-danger fw-bold py-3 shadow-sm flex-fill">Cancelar</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 10000; display: flex; justify-content: center; align-items: center; }
.custom-notification { background: white; padding: 30px; border-radius: 20px; text-align: center; border-top: 8px solid; min-width: 350px; }
.notify-success { border-color: #00E676; } .notify-error { border-color: #FF1744; }
.icon-circle { font-size: 35px; margin-bottom: 20px; }
.btn-white { background: white; transition: all 0.3s; }
.btn-white:hover { background: #e8f5e9; }
</style>