// main.js — interações específicas da página Voltix

// Menu de navegação em telas menores
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Modal demonstrativo de solicitação de orçamento
const demoModal = document.querySelector('.demo-modal');
const openModalButtons = document.querySelectorAll('.demo-action');
const closeModalButtons = document.querySelectorAll('.close, .close-secondary');

function openDemoModal() {
  if (!demoModal) return;

  demoModal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
  if (!demoModal) return;

  demoModal.hidden = true;
  document.body.style.overflow = '';
}

openModalButtons.forEach((button) => {
  button.addEventListener('click', openDemoModal);
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', closeDemoModal);
});

if (demoModal) {
  demoModal.addEventListener('click', (event) => {
    if (event.target === demoModal) closeDemoModal();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDemoModal();
});
