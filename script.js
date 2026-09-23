const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hearts = document.getElementById('hearts');
function createHeart() {
  if (reducedMotion) return;
  const heart = document.createElement('span');
  heart.className = 'heart-particle';
  heart.textContent = Math.random() > .5 ? '♥' : '♡';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 18}px`;
  heart.style.animationDuration = `${3 + Math.random() * 3}s`;
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 6200);
}
if (!reducedMotion) setInterval(createHeart, 1300);
function burst(count = 40) {
  if (reducedMotion) return;
  for (let i = 0; i < count; i++) setTimeout(createHeart, i * 32);
}
document.querySelectorAll('[data-scroll]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({behavior: reducedMotion ? 'instant' : 'smooth'});
  });
});
document.getElementById('wishBtn').addEventListener('click', () => {
  document.getElementById('wishMessage').textContent = '¿Estar juntos para toda la vida? Ten por seguro que así será ❤️.';
  burst(65);
});
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .08});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}

const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');
function updateMusicButton() {
  const playing = !music.paused;
  musicBtn.setAttribute('aria-pressed', String(playing));
  musicBtn.setAttribute('aria-label', playing ? 'Pausar música' : 'Activar música');
  musicBtn.querySelector('span').textContent = playing ? 'Pausar música' : 'Activar música';
}
async function startMusic() {
  try { await music.play(); updateMusicButton(); }
  catch { updateMusicButton(); }
}
musicBtn.addEventListener('click', () => {
  if (music.paused) startMusic();
  else { music.pause(); updateMusicButton(); }
});
// Los navegadores pueden exigir un gesto del visitante antes de reproducir audio.
// Se intenta al cargar y se vuelve a intentar con el primer toque si fue bloqueado.
window.addEventListener('load', startMusic, {once:true});
function startOnFirstGesture(event) {
  if (event.target === musicBtn || musicBtn.contains(event.target)) return;
  if (music.paused) startMusic();
  document.removeEventListener('pointerdown', startOnFirstGesture);
  document.removeEventListener('keydown', startOnFirstGesture);
}
document.addEventListener('pointerdown', startOnFirstGesture);
document.addEventListener('keydown', startOnFirstGesture);
