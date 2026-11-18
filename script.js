/* =====================================================
   CONFIGURATION : les 3 emplacements à personnaliser
   ===================================================== */
const CONFIG = {
  // 1) COLLEZ ICI le lien de votre Google Forms (laissez vide tant qu'il n'est pas créé)
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScl5ynxDpR5v7mQ5L1dg8FYvHp16_Tc4ezcqIm5lsdi_TAnHQ/viewform?usp=header",

  // 2) Fichier audio : déposez-le dans le dossier "musique" (laissez le même nom ou changez-le ici)
  musique: "musique/musique.mp3",

  // 3) Photos : déposez-les dans le dossier "images" puis ajoutez/retirez des lignes ci-dessous
  photos: [
    "images/photo5.jpg", "images/photo7.jpg", "images/photo4.jpg",
    "images/photo2.jpg", "images/photo11.jpg", "images/photo1.jpg",
    "images/photo8.jpg", "images/photo9.jpg", "images/photo6.jpg",
    "images/photo3.jpg"
  ],

  // Date de l'événement : samedi 12 décembre 2026 à 22 h 00 (heure de Bouaké = UTC)
  date: "2026-12-12T22:00:00Z"
};

const $ = (id) => document.getElementById(id);

/* ---------- Compte à rebours ---------- */
(function countdown() {
  const target = new Date(CONFIG.date).getTime();
  function tick() {
    let diff = target - Date.now();
    if (diff <= 0) {
      $("cd").innerHTML = '<p class="script big">C\'est le grand soir ! 🥂</p>';
      return;
    }
    const d = Math.floor(diff / 864e5); diff %= 864e5;
    const h = Math.floor(diff / 36e5);  diff %= 36e5;
    const m = Math.floor(diff / 6e4);
    const s = Math.floor((diff % 6e4) / 1e3);
    $("cd-d").textContent = d;
    $("cd-h").textContent = String(h).padStart(2, "0");
    $("cd-m").textContent = String(m).padStart(2, "0");
    $("cd-s").textContent = String(s).padStart(2, "0");
    setTimeout(tick, 1000);
  }
  tick();
})();

/* ---------- Galerie + visionneuse ---------- */
(function gallery() {
  const grid = $("grid");
  CONFIG.photos.forEach((src, i) => {
    const fig = document.createElement("figure");
    const img = new Image();
    img.src = src; img.loading = "lazy"; img.alt = "Photo " + (i + 1);
    fig.appendChild(img);
    fig.addEventListener("click", () => { $("lbImg").src = src; $("lb").hidden = false; });
    grid.appendChild(fig);
  });
  const close = () => { $("lb").hidden = true; };
  $("lbClose").addEventListener("click", close);
  $("lb").addEventListener("click", (e) => { if (e.target.id === "lb") close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
})();

/* ---------- RSVP ---------- */
(function rsvp() {
  const btn = $("rsvpBtn"), dlg = $("dlg");
  if (CONFIG.formUrl.trim()) {
    btn.href = CONFIG.formUrl.trim();
  } else {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      $("dlgMsg").textContent = "Le formulaire de confirmation n'est pas encore disponible. Revenez très bientôt !";
      dlg.showModal();
    });
  }
  $("dlgClose").addEventListener("click", () => dlg.close());
})();

/* ---------- Musique (jamais lancée automatiquement) ---------- */
(function music() {
  const audio = $("audio"), play = $("btnPlay"), mute = $("btnMute");
  audio.src = CONFIG.musique; audio.volume = 0.6;
  play.addEventListener("click", async () => {
    if (audio.paused) {
      try { await audio.play(); play.classList.add("on"); play.firstChild.textContent = "❚❚ "; }
      catch (err) {
        $("dlgMsg").textContent = "La musique n'est pas disponible pour le moment.";
        $("dlg").showModal();
      }
    } else {
      audio.pause(); play.classList.remove("on"); play.firstChild.textContent = "♪ ";
    }
  });
  mute.addEventListener("click", () => {
    audio.muted = !audio.muted;
    mute.textContent = audio.muted ? "🔇" : "🔊";
    mute.classList.toggle("on", audio.muted);
  });
})();

/* ---------- Pétales qui tombent ---------- */
(function petals() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const box = $("petals");
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = Math.random() * 100 + "%";
    p.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    p.style.animationDuration = 12 + Math.random() * 14 + "s";
    p.style.animationDelay = -Math.random() * 20 + "s";
    p.style.transform = "scale(" + (0.6 + Math.random() * 0.9) + ")";
    box.appendChild(p);
  }
})();

/* ---------- Apparition au défilement ---------- */
(function reveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
})();
