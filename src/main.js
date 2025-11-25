import { createApp } from 'vue'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
// Importa el CSS de Material Symbols
import 'material-symbols/outlined.css'; // O 'round.css', 'sharp.css' si prefieres otro estilo
import App from './App.vue'
import router from './router'


createApp(App).use(router).mount('#app')
