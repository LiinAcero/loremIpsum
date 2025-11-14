// Modal behavior and subscribe handler

const overlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeModal');
const okBtn = document.getElementById('okBtn');
const openWelcome = document.getElementById('openWelcome');
const openImageInfo = document.getElementById('openImageInfo');
const modalContent = document.getElementById('modalContent');
const subscribeForm = document.getElementById('subscribeForm');
let lastFocused = null;

function openModal(html){
  if (typeof html === 'string') modalContent.innerHTML = `<p>${html}</p>`;
  lastFocused = document.activeElement;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden','false');
  // Focus the first button for accessibility
  setTimeout(() => (okBtn?.focus()), 0);
}

function closeModal(){
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
  if(lastFocused && typeof lastFocused.focus === 'function'){
    lastFocused.focus();
  }
}

// expose for potential external triggers
window.showModal = openModal;

// Wire triggers from article buttons
document.querySelectorAll('[data-open-modal]').forEach(btn => btn.addEventListener('click', () => {
  openModal('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.');
}));

openWelcome?.addEventListener('click', () => {
  openModal('Welcome! This is a sample pop-up filled with lorem ipsum to demonstrate a simple modal.');
});

openImageInfo?.addEventListener('click', () => {
  openModal('“Lorem ipsum” originates from Cicero\'s De Finibus. It has been used as placeholder text since the 1500s.');
});

closeBtn?.addEventListener('click', closeModal);
okBtn?.addEventListener('click', closeModal);
overlay?.addEventListener('click', (e) => {
  if(e.target === overlay) closeModal();
});
window.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});

// Subscribe form handler (replaces inline onsubmit)
subscribeForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  openModal('Thanks for subscribing! Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
});
