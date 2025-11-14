// Modal behavior and subscribe handler
// Provides accessible open/close controls, focus management, and button wiring.

// Cache DOM elements used by the modal and triggers
const overlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeModal');
const okBtn = document.getElementById('okBtn');
const openWelcome = document.getElementById('openWelcome');
const openImageInfo = document.getElementById('openImageInfo');
const modalContent = document.getElementById('modalContent');
const subscribeForm = document.getElementById('subscribeForm');

// Track last focused element to restore focus when the modal closes
let lastFocused = null;

// Open the modal, optionally replacing its content
function openModal(html){
  if (typeof html === 'string') modalContent.innerHTML = `<p>${html}</p>`;
  // Remember current focus and reveal the dialog
  lastFocused = document.activeElement;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden','false');
  // Move focus inside the dialog for accessibility (non-blocking)
  setTimeout(() => (okBtn?.focus()), 0);
}

// Close the modal and restore focus back to the invoker
function closeModal(){
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
  if(lastFocused && typeof lastFocused.focus === 'function'){
    lastFocused.focus();
  }
}

// Expose a global function to open the modal from inline handlers or other scripts
window.showModal = openModal;

// Wire triggers from any "Open Pop‑up" buttons inside article cards
document.querySelectorAll('[data-open-modal]').forEach(btn => btn.addEventListener('click', () => {
  openModal('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.');
}));

// Header nav button: opens a welcome message
openWelcome?.addEventListener('click', () => {
  openModal('Welcome! This is a sample pop-up filled with lorem ipsum to demonstrate a simple modal.');
});

// Hero action: explains the origin of lorem ipsum
openImageInfo?.addEventListener('click', () => {
  openModal('“Lorem ipsum” originates from Cicero\'s De Finibus. It has been used as placeholder text since the 1500s.');
});

// Dialog controls: close via buttons, overlay click, or Escape key
closeBtn?.addEventListener('click', closeModal);
okBtn?.addEventListener('click', closeModal);
overlay?.addEventListener('click', (e) => {
  if(e.target === overlay) closeModal();
});
window.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});

// Subscribe form handler (replaces inline onsubmit)
// Prevents page reload and shows a confirmation inside the modal
subscribeForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  openModal('Thanks for subscribing! Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
});
