// --- 0. FORZAR INICIO DESDE ARRIBA AL RECARGAR ---
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// --- 1. CONFIGURACIÓN DEL CONTADOR REGRESIVO ---

// Fecha de los XV Años (Año, Mes (0-indexado), Día, Horas, Minutos, Segundos)
// Abril = indice 3. Usando 2026 para el evento (25 de abril).
const targetDate = new Date(2026, 3, 25, 18, 0, 0).getTime();

const updateCountdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Cálculos matemáticos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Inyectar en el HTML
    document.getElementById("days").textContent = days < 10 ? "0" + days : days;
    document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;

    // Si la cuenta atrás termina
    if (distance < 0) {
        clearInterval(updateCountdown);
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
    }
}, 1000); // 1000ms = 1 segundo


// --- 2. EFECTOS "FADE-IN-UP" AL HACER SCROLL (INTERSECTION OBSERVER) ---

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15 // 15% del elemento visible para activar la animación
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Dejar de observar una vez que animó
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-in-up").forEach((section) => {
    observer.observe(section);
});

// --- 3. REPRODUCTOR DE MÚSICA ---
const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let isPlaying = false;

playBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
        playIcon.classList.add("ml-1"); // Ajuste óptico
    } else {
        audio.play();
        playIcon.classList.remove("fa-play");
        playIcon.classList.remove("ml-1");
        playIcon.classList.add("fa-pause");
    }
    isPlaying = !isPlaying;
});

// Botones para reiniciar la canción
const restartSong = () => {
    audio.currentTime = 0;
    if (!isPlaying) {
        audio.play();
        playIcon.classList.remove("fa-play");
        playIcon.classList.remove("ml-1");
        playIcon.classList.add("fa-pause");
        isPlaying = true;
    }
};

prevBtn.addEventListener("click", restartSong);
nextBtn.addEventListener("click", restartSong);