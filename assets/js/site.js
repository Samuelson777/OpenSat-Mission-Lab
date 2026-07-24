
const $ = (s, scope=document) => scope.querySelector(s);
const $$ = (s, scope=document) => [...scope.querySelectorAll(s)];

const navToggle = $('.nav-toggle');
const navLinks = $('.nav-links');
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
$$('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks?.classList.remove('open')));

const observer = new IntersectionObserver(entries => entries.forEach(e => {
  if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); }
}), {threshold:.08});
$$('.fade').forEach(el => observer.observe(el));

$$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  const target = document.getElementById(button.dataset.copy);
  try { await navigator.clipboard.writeText(target.innerText); button.textContent='Copied'; }
  catch { button.textContent='Select & copy'; }
  setTimeout(() => button.textContent='Copy', 1500);
}));

const modal = $('#image-modal');
const modalImg = $('#modal-image');
$$('[data-full]').forEach(card => card.addEventListener('click', () => {
  if(!modal || !modalImg) return;
  modalImg.src = card.dataset.full;
  modalImg.alt = card.querySelector('img')?.alt || 'Expanded engineering evidence';
  modal.showModal();
}));
$('.modal-close')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', e => { if(e.target === modal) modal.close(); });

// Derive the repository URL automatically when hosted on GitHub Pages.
const host = location.hostname;
let repoUrl = 'https://github.com/YOUR-USERNAME/opensat-mission-lab';
if(host.endsWith('.github.io')) {
  const owner = host.split('.')[0];
  const repo = location.pathname.split('/').filter(Boolean)[0];
  repoUrl = repo ? `https://github.com/${owner}/${repo}` : `https://github.com/${owner}/${owner}.github.io`;
}
$$('[data-repo-link]').forEach(a => a.href = repoUrl);
$$('[data-repo-text]').forEach(el => el.textContent = repoUrl.replace('https://github.com/',''));

const year = $('#year'); if(year) year.textContent = new Date().getFullYear();
