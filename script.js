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
  document.getElementById('wishMessage').textContent = 'Mi deseo ya se cumplió: encontrarte a ti. ❤️';
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
