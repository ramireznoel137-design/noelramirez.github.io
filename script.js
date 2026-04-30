const contribution = document.querySelector('#contribution');
const amountText = document.querySelector('#amountText');
const income = document.querySelector('#income');
const age = document.querySelector('#age');
const continueBtn = document.querySelector('#continueBtn');
const nextBtn = document.querySelector('#nextBtn');
const whatsBtn = document.querySelector('#whatsBtn');
const dataPanel = document.querySelector('#dataPanel');
const whatsPanel = document.querySelector('#contacto');
const toast = document.querySelector('#toast');

const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');

// Cambia este número por el WhatsApp real.
// Formato: país + lada + número, sin espacios ni signos.
const WHATSAPP_NUMBER = '5215555555555';

function currency(value) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(Number(value));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function cleanNumber(value) {
  return String(value).replace(/[^0-9]/g, '');
}

contribution.addEventListener('input', () => {
  amountText.textContent = currency(contribution.value)
    .replace('MXN', '')
    .trim();
});

income.addEventListener('blur', () => {
  const number = cleanNumber(income.value);
  income.value = number ? new Intl.NumberFormat('es-MX').format(number) : '';
});

age.addEventListener('blur', () => {
  const number = cleanNumber(age.value);
  age.value = number ? `${number} años` : '';
});

continueBtn.addEventListener('click', () => {
  if (!cleanNumber(income.value) || !cleanNumber(age.value)) {
    showToast('Completa ingreso mensual y edad para continuar.');
    return;
  }

  dataPanel.classList.remove('disabled');
  nameInput.focus();
  dataPanel.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
});

nextBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const phone = cleanNumber(phoneInput.value);
  const email = emailInput.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (name.length < 3) {
    showToast('Escribe tu nombre completo.');
    return;
  }

  if (phone.length < 10) {
    showToast('Escribe un teléfono válido de al menos 10 dígitos.');
    return;
  }

  if (!emailOk) {
    showToast('Escribe un correo electrónico válido.');
    return;
  }

  whatsPanel.classList.remove('disabled');
  whatsBtn.disabled = false;

  whatsPanel.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
});

whatsBtn.addEventListener('click', () => {
  const message = [
    'Hola, quiero agendar una asesoría para el Plan Vida Mujer.',
    `Nombre: ${nameInput.value.trim()}`,
    `Teléfono: ${phoneInput.value.trim()}`,
    `Correo: ${emailInput.value.trim()}`,
    `Ingreso mensual: $${income.value}`,
    `Edad: ${age.value}`,
    `Aportación estimada: ${amountText.textContent} / mes`
  ].join('\n');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});