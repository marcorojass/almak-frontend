<template>
  <div class="home-root">

    <!-- STICKY NAVBAR -->
    <header class="navbar-sticky">
      <nav class="navbar nav-style">
        <div class="container nav-inner">
          <a class="brand" href="#">🐾 ALMAK</a>
          <ul class="nav-links">
            <li><a href="#home">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#beneficios">Beneficios</a></li>
            <li><a href="#testimonios">Testimonios</a></li>
            <li><button class="btn login-btn">Ingresar</button></li>
          </ul>
          <button class="nav-toggle" @click="toggleMenu" aria-label="toggle menu">
            ☰
          </button>
        </div>
      </nav>

      <!-- mobile menu -->
      <div v-if="menuOpen" class="mobile-menu">
        <a href="#home" @click="menuOpen=false">Inicio</a>
        <a href="#servicios" @click="menuOpen=false">Servicios</a>
        <a href="#beneficios" @click="menuOpen=false">Beneficios</a>
        <a href="#testimonios" @click="menuOpen=false">Testimonios</a>
        <a class="btn login-btn" href="#" @click="menuOpen=false">Ingresar</a>
      </div>
    </header>

    <!-- HERO con CARRUSEL + PARALLAX -->
    <section id="home" class="hero-section" :style="heroStyle">
      <div class="hero-overlay">
        <div class="container hero-content">
          <h1 class="hero-title reveal">Bienvenidos a ALMAK</h1>
          <p class="hero-subtitle reveal">Cuidamos a tus mejores amigos con amor y profesionalismo 🐶🐱💚</p>

          <div class="hero-controls reveal">
            <a class="btn-primary big" href="#servicios">Ver servicios</a>
            <a class="btn-outline big" href="#contacto">Agendar cita</a>
          </div>
        </div>

        <!-- Carrusel de mascotas (custom, reactivo) -->
        <div class="carousel-wrap">
          <div class="carousel">
            <div
              v-for="(img, i) in carouselImages"
              :key="i"
              class="carousel-item"
              :class="{ active: i === carouselIndex }"
              @mouseenter="pauseCarousel"
              @mouseleave="startCarousel"
            >
              <img :src="img.src" :alt="img.alt" class="carousel-img" />
              <div class="carousel-caption">
                <p>{{ img.caption }}</p>
              </div>
            </div>
          </div>

          <div class="carousel-nav">
            <button @click="prevSlide" aria-label="prev">‹</button>
            <div class="dots">
              <button
                v-for="(img, i) in carouselImages"
                :key="'dot'+i"
                :class="{ dot: true, active: i === carouselIndex }"
                @click="goTo(i)"
                :aria-label="'Go to slide '+(i+1)"
              ></button>
            </div>
            <button @click="nextSlide" aria-label="next">›</button>
          </div>
        </div>
      </div>
    </section>


    <!-- SERVICIOS (click en imagen abre lightbox) -->
    <section id="servicios" class="section reveal-group">
      <div class="container section-inner">
        <h2 class="section-title">Nuestros Servicios</h2>
        <p class="section-subtitle">En ALMAK cuidamos a tus mascotas como parte de nuestra familia 🐾💚</p>

        <div class="grid-services">
          <article
            v-for="(s, idx) in services"
            :key="s.title"
            class="service-card reveal"
            @click="openLightbox(s.img)"
            role="button"
            tabindex="0"
            @keydown.enter="openLightbox(s.img)"
          >
            <div class="img-wrap">
              <img :src="s.img" :alt="s.title" />
            </div>
            <div class="service-body">
              <h3>{{ s.title }}</h3>
              <p>{{ s.desc }}</p>
              <div class="service-actions">
                <button class="btn-action" @click.stop="verMas(s)">Ver más</button>
                <button class="btn-secondary" @click.stop="reservar()">Reservar</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- BENEFICIOS -->
    <section id="beneficios" class="section light reveal-group">
      <div class="container section-inner">
        <h2 class="section-title">¿Por qué elegir ALMAK?</h2>
        <p class="section-subtitle">Profesionales, amor por los animales y atención completa.</p>

        <div class="grid-benefits">
          <div class="benefit-card reveal">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 2L2 7v7c0 5 5 9 10 9s10-4 10-9V7L12 2z"/></svg>
            <h4>Profesionales certificados</h4>
            <p>Veterinarios con experiencia y certificados.</p>
          </div>

          <div class="benefit-card reveal">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 2a5 5 0 100 10 5 5 0 000-10zM2 22a10 10 0 1020 0H2z"/></svg>
            <h4>Atención personalizada</h4>
            <p>Planes de salud según la edad y necesidades.</p>
          </div>

          <div class="benefit-card reveal">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 1l3 7h7l-5.5 4 2 8L12 16 5.5 20 7.5 12 2 8h7z"/></svg>
            <h4>Emergencias 24/7</h4>
            <p>Soporte y atención rápida en casos urgentes.</p>
          </div>

          <div class="benefit-card reveal">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 21c4-3 7-6 7-10a7 7 0 10-14 0c0 4 3 7 7 10z"/></svg>
            <h4>Productos de calidad</h4>
            <p>Alimentos y accesorios seleccionados con cuidado.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIOS -->
    <section id="testimonios" class="section reveal-group">
      <div class="container section-inner">
        <h2 class="section-title">Lo que dicen de nosotros</h2>

        <div class="testimonials">
          <div class="testi-card" v-for="(t, i) in testimonials" :key="i" :class="{ show: i === testiIndex }">
            <p class="quote">“{{ t.quote }}”</p>
            <div class="person">
              <img :src="t.img" :alt="t.name" />
              <div>
                <strong>{{ t.name }}</strong>
                <div class="stars">⭐︎⭐︎⭐︎⭐︎⭐︎</div>
              </div>
            </div>
          </div>

          <div class="testi-nav">
            <button @click="prevTesti">‹</button>
            <button @click="nextTesti">›</button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section reveal">
      <div class="container cta-inner">
        <div>
          <h3>Listo para darle a tu mascota el mejor cuidado?</h3>
          <p>Reserva una cita ahora o contáctanos por WhatsApp.</p>
        </div>
        <div class="cta-actions">
          <a class="btn-primary" href="#contacto">Agendar cita</a>
          <a class="btn-whatsapp" :href="whatsappLink" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </section>

    <!-- FOOTER PROFESIONAL -->
    <footer class="footer">
      <div class="container footer-inner">
        <div class="col">
          <h4>ALMAK</h4>
          <p>Clínica veterinaria dedicada al bienestar animal.</p>
        </div>
        <div class="col">
          <h5>Servicios</h5>
          <ul>
            <li>Consultas</li><li>Baños</li><li>Tienda</li><li>Urgencias</li>
          </ul>
        </div>
        <div class="col">
          <h5>Contacto</h5>
          <p>Tel: +591 7X XXX XXX<br/>Cochabamba - Bolivia</p>
        </div>
        <div class="col">
          <h5>Síguenos</h5>
          <div class="socials">
            <a href="#" aria-label="facebook">fb</a>
            <a href="#" aria-label="instagram">ig</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">© 2025 ALMAK - Cuidamos lo que amas 💚</div>
    </footer>

    <!-- LIGHTBOX -->
    <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
      <button class="lb-close" @click="closeLightbox">✕</button>
      <img :src="lightboxImg" alt="preview" />
    </div>

    <!-- WHATSAPP FLOATER -->
    <a :href="whatsappLink" class="whatsapp-float" target="_blank" rel="noopener" aria-label="WhatsApp">
      💬
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

/* -------------------------
  Config / imágenes (usa public/img/)
  ------------------------- */

const carouselImages = [
  { src: '/img/perrito1.jpg', alt: 'perrito 1', caption: '¡Bienvenidos!' },
  { src: '/img/gatito1.jpg', alt: 'gatito', caption: 'Amor felino' },
  { src: '/img/perrito2.jpg', alt: 'perrito 2', caption: 'Cuidado y cariño' }
]

const services = [
  {
    title: 'Consultas Veterinarias',
    desc: 'Diagnóstico profesional y seguimiento para mantenerlos sanos.',
    img: '/img/servicio_consulta.jpg'
  },
  {
    title: 'Baños y Estética',
    desc: 'Grooming, baños medicados y cortes personalizados.',
    img: '/img/servicio_bano.jpg'
  },
  {
    title: 'Tienda Pet Shop',
    desc: 'Alimentos, juguetes y accesorios de calidad.',
    img: '/img/servicio_tienda.jpg'
  }
]

const testimonials = [
  { name: 'Mariana R.', quote: 'La mejor atención para mi perrita Luli. ¡Recomendados!', img: '/img/perrito1.jpg' },
  { name: 'Carlos D.', quote: 'Profesionales y muy cariñosos. Mi gato está feliz.', img: '/img/gatito1.jpg' },
  { name: 'Lucía P.', quote: 'Siempre pendientes. Excelente servicio y trato.', img: '/img/perrito2.jpg' }
]

/* -------------------------
  Reactive state
  ------------------------- */

const carouselIndex = ref(0)
let carouselInterval = null

function startCarousel() {
  stopCarousel()
  carouselInterval = setInterval(() => {
    carouselIndex.value = (carouselIndex.value + 1) % carouselImages.length
  }, 4000)
}
function stopCarousel() {
  if (carouselInterval) { clearInterval(carouselInterval); carouselInterval = null }
}
function pauseCarousel() { stopCarousel() }
function nextSlide() { carouselIndex.value = (carouselIndex.value + 1) % carouselImages.length }
function prevSlide() { carouselIndex.value = (carouselIndex.value - 1 + carouselImages.length) % carouselImages.length }
function goTo(i){ carouselIndex.value = i }

/* Lightbox */
const lightboxOpen = ref(false)
const lightboxImg = ref('')
function openLightbox(src){ lightboxImg.value = src; lightboxOpen.value = true }
function closeLightbox(){ lightboxOpen.value = false; lightboxImg.value = '' }

/* Testimonials */
const testiIndex = ref(0)
let testiInterval = null
function startTesti() {
  stopTesti()
  testiInterval = setInterval(()=> { testiIndex.value = (testiIndex.value + 1) % testimonials.length }, 5000)
}
function stopTesti(){ if(testiInterval){ clearInterval(testiInterval); testiInterval=null } }
function nextTesti(){ testiIndex.value = (testiIndex.value + 1) % testimonials.length }
function prevTesti(){ testiIndex.value = (testiIndex.value - 1 + testimonials.length) % testimonials.length }

/* Navbar mobile */
const menuOpen = ref(false)
function toggleMenu(){ menuOpen.value = !menuOpen.value }

/* WhatsApp link - reemplaza con tu número (código país sin +, ejemplo 591XXXXXXXX) */
const whatsappNumber = '59171234567'
const whatsappLink = computed(()=> `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola ALMAK, quiero reservar una cita.')}`)

/* Parallax hero style */
const heroBg = '/img/fondo_veterinaria.jpg'
const heroPos = ref(50)
const heroStyle = computed(()=> ({
  backgroundImage: `linear-gradient(rgba(17,69,57,0.65), rgba(17,69,57,0.65)), url(${heroBg})`,
  backgroundPosition: `center ${heroPos.value}%`
}))

/* Scroll reveal */
let observer = null
onMounted(()=>{
  startCarousel()
  startTesti()

  // intersection observer for reveal
  observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible')
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal, .reveal-group .reveal').forEach(el => observer.observe(el))

  // parallax movement
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(()=>{
  stopCarousel()
  stopTesti()
  if(observer) observer.disconnect()
  window.removeEventListener('scroll', onScroll)
})

function onScroll(){
  const sc = window.scrollY || window.pageYOffset
  // hero shift between 40% and 60% based on scroll (subtle)
  heroPos.value = Math.max(30, Math.min(70, 50 + sc / 30))
}

/* small helpers */
function verMas(s){ alert(`${s.title}\n\n${s.desc}`) }
function reservar(){ window.location.href = '#contacto' }

</script>

<style scoped>
/* ============ Variables de paleta ============ */
:root{
  --verde-oscuro: #114539;
  --verde: #1A6B56;
  --azul-g: #A4BDC6;
  --coral: #E47A73;
  --bg-soft: #F6FBFB;
}

/* ===== global reset (local) ===== */
.home-root { font-family: Inter, system-ui, Arial; color:#0b2b23; background:var(--bg-soft); }

/* ===== NAVBAR sticky ===== */
.navbar-sticky { position:sticky; top:0; z-index:80; backdrop-filter: blur(6px); }
.nav-style { background: var(--verde-oscuro); color: #fff; padding: 10px 0; box-shadow: 0 6px 20px rgba(0,0,0,0.12); }
.nav-inner { display:flex; align-items:center; justify-content:space-between; gap: 1rem; max-width:1200px; margin:0 auto; padding:0 16px; }
.brand { color: #fff; font-weight:800; font-size:1.25rem; text-decoration:none; }
.nav-links { display:flex; gap: 14px; align-items:center; }
.nav-links a { color: rgba(255,255,255,0.92); text-decoration:none; padding:8px 10px; border-radius:8px; transition: 0.25s; }
.nav-links a:hover { background: rgba(255,255,255,0.06); color: var(--coral); transform: translateY(-2px); }
.btn.login-btn { background: var(--coral); border:none; color:white; padding:8px 12px; border-radius:8px; font-weight:700; cursor:pointer; }
.nav-toggle { display:none; background:transparent; border:none; color:white; font-size:20px; }

/* mobile menu */
.mobile-menu { display:none; background: white; box-shadow: 0 6px 20px rgba(0,0,0,0.08); padding: 12px; }
.mobile-menu a { display:block; padding:8px 0; color: var(--verde-oscuro); text-decoration:none; }

/* ===== HERO ===== */
.hero-section { min-height: 520px; background-size:cover; background-attachment: fixed; position:relative; display:flex; align-items:center; justify-content:center; }
.hero-overlay { width:100%; background: linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.0)); padding:36px 12px 46px; }
.hero-content { max-width:1100px; margin: 0 auto; text-align:center; color: #fff; position:relative; z-index:2; }
.hero-title { font-size:2.6rem; margin:0 0 8px; color:#fff; text-shadow: 0 6px 18px rgba(0,0,0,0.45); }
.hero-subtitle { margin-bottom:18px; opacity:0.95; }
.hero-controls { display:flex; gap:12px; justify-content:center; margin-top:8px; }

/* buttons */
.btn-primary.big { background: var(--verde); color:#fff; padding:12px 18px; border-radius:10px; text-decoration:none; font-weight:700; box-shadow: 0 6px 18px rgba(26,107,86,0.2); }
.btn-outline.big { background: transparent; border: 2px solid rgba(255,255,255,0.16); color: #fff; padding:10px 16px; border-radius:10px; }

/* ===== CAROUSEL ===== */
.carousel-wrap { max-width:1100px; margin: 20px auto 0; position:relative; z-index:3; }
.carousel { position:relative; overflow:hidden; border-radius:14px; }
.carousel-item { position:absolute; inset:0; opacity:0; transition: opacity .6s ease, transform .6s ease; transform: scale(1.02); display:flex; align-items:center; justify-content:center; }
.carousel-item.active { opacity:1; transform: scale(1); position:relative; }
.carousel-img { width:100%; height:350px; object-fit:cover; display:block; }
.carousel-caption { position:absolute; left:18px; bottom:18px; color:#fff; background: linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0.2)); padding:10px 12px; border-radius:8px; backdrop-filter: blur(4px); }

/* nav */
.carousel-nav { display:flex; align-items:center; justify-content:center; gap:12px; margin-top:10px; }
.carousel-nav button { background: rgba(0,0,0,0.5); color:#fff; border:none; width:36px; height:36px; border-radius:8px; font-size:18px; cursor:pointer; }
.dots { display:flex; gap:6px; }
.dot { width:10px; height:10px; border-radius:50%; background: rgba(0,0,0,0.25); border:none; }
.dot.active { background: var(--coral); box-shadow: 0 4px 12px rgba(228,122,115,0.2); }

/* ===== SECTIONS ===== */
.section { padding:70px 16px; }
.container { max-width:1100px; margin:0 auto; }
.section-inner { text-align:center; }
.section-title { color: var(--coral); font-size:1.9rem; margin-bottom:6px; font-weight:800; }
.section-subtitle { color: var(--verde-oscuro); margin-bottom:24px; opacity:0.9; }

/* ===== GRID SERVICES ===== */
.grid-services { display:grid; grid-template-columns: repeat(3,1fr); gap:18px; align-items:stretch; }
.service-card { background:#fff; border-radius:14px; overflow:hidden; box-shadow: 0 8px 28px rgba(0,0,0,0.08); cursor:pointer; display:flex; flex-direction:column; transition: transform .35s cubic-bezier(.2,.9,.3,1), box-shadow .35s; }
.service-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 18px 38px rgba(0,0,0,0.14); }
.img-wrap { height:200px; overflow:hidden; }
.img-wrap img { width:100%; height:100%; object-fit:cover; transition: transform .6s ease; }
.service-body { padding:16px; text-align:left; flex:1; display:flex; flex-direction:column; }
.service-body h3 { color: var(--coral); margin:0 0 8px; }
.service-body p { color: #264b40; margin:0 0 12px; flex:1; }
.service-actions { display:flex; gap:8px; }

/* action buttons inside card */
.btn-action { background: var(--coral); color:#fff; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; }
.btn-secondary { background: transparent; border: 1px solid var(--verde); color: var(--verde); padding:8px 10px; border-radius:8px; }

/* ===== BENEFITS ===== */
.grid-benefits { display:grid; grid-template-columns: repeat(4,1fr); gap:18px; margin-top:20px; }
.benefit-card { background:#fff; border-radius:12px; padding:18px; text-align:center; box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
.benefit-card .icon { width:48px; height:48px; fill: var(--verde); margin-bottom:10px; opacity:0.95; }

/* ===== TESTIMONIOS ===== */
.testimonials { position:relative; margin-top:18px; }
.testi-card { display:none; background:#fff; padding:20px; border-radius:12px; box-shadow: 0 8px 26px rgba(0,0,0,0.08); max-width:720px; margin:0 auto; }
.testi-card.show { display:block; }
.quote { font-style:italic; color:#2b4b43; margin-bottom:14px; }
.person { display:flex; gap:12px; align-items:center; }
.person img { width:56px; height:56px; object-fit:cover; border-radius:50%; }

/* nav small for testi */
.testi-nav { display:flex; gap:8px; justify-content:center; margin-top:10px; }
.testi-nav button { background:var(--verde-oscuro); color:#fff; border:none; padding:8px 12px; border-radius:8px; }

/* ===== CTA ===== */
.cta-section { background: linear-gradient(90deg, rgba(20,69,54,0.05), rgba(228,122,115,0.02)); border-radius:12px; margin: 28px 16px; padding:18px; }
.cta-inner { display:flex; align-items:center; justify-content:space-between; gap:16px; max-width:1100px; margin:0 auto; }
.cta-actions { display:flex; gap:12px; }
.btn-primary { background: var(--verde); color:#fff; border:none; padding:10px 16px; border-radius:10px; font-weight:700; text-decoration:none; }
.btn-whatsapp { background: #25D366; color:#fff; padding:10px 16px; border-radius:10px; text-decoration:none; }

/* ===== FOOTER ===== */
.footer { background: var(--verde-oscuro); color:#fff; padding:28px 16px; margin-top:26px; }
.footer-inner { display:grid; grid-template-columns: repeat(4,1fr); gap:16px; max-width:1100px; margin:0 auto 12px; }
.footer .col h4, .footer .col h5 { margin:0 0 8px; }
.footer-bottom { text-align:center; padding-top:12px; opacity:0.9; }

/* ===== LIGHTBOX ===== */
.lightbox { position:fixed; inset:0; background: rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:200; padding:20px; }
.lightbox img { max-width:95%; max-height:85%; border-radius:10px; box-shadow: 0 12px 40px rgba(0,0,0,0.6); }
.lb-close { position:absolute; top:18px; right:18px; background:transparent; color:white; border:none; font-size:22px; }

/* ===== WHATSAPP FLOAT ===== */
.whatsapp-float { position:fixed; right:18px; bottom:18px; background:#25D366; color:#fff; width:56px; height:56px; border-radius:999px; display:flex; align-items:center; justify-content:center; font-size:22px; z-index:120; box-shadow: 0 8px 24px rgba(37,211,102,0.25); text-decoration:none; }

/* ===== Reveal anima (IntersectionObserver) ===== */
.reveal { opacity:0; transform: translateY(20px); transition: opacity .8s ease, transform .8s cubic-bezier(.2,.9,.3,1); }
.reveal.visible { opacity:1; transform: translateY(0); }

/* reveal groups children */
.reveal-group .reveal { transition-delay: 0.08s; }

/* ===== Responsive ===== */
@media (max-width: 992px){
  .grid-services { grid-template-columns: repeat(2,1fr); }
  .grid-benefits { grid-template-columns: repeat(2,1fr); }
  .testimonial, .testi-card { max-width: 92%; }
  .hero-title { font-size: 2.1rem; }
  .nav-links { display:none; }
  .nav-toggle { display:block; }
  .mobile-menu { display:block; }
  .hero-section { min-height:420px; background-attachment: scroll; }
}

@media (max-width: 576px){
  .grid-services { grid-template-columns: 1fr; }
  .grid-benefits { grid-template-columns: 1fr; }
  .footer-inner { grid-template-columns: 1fr; text-align:left; }
  .cta-inner { flex-direction:column; align-items:flex-start; gap:12px; }
}
</style>
