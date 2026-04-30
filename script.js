const contribution = document.querySelector('#contribution');
const amountText = document.querySelector('#amountText');
const annualAmount = document.querySelector('#annualAmount');
const totalAmount = document.querySelector('#totalAmount');

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

const stepTitles = document.querySelectorAll('.step-title');
const stepDots = document.querySelectorAll('.step-dot');


const WHATSAPP_NUMBER = '5215530537788';

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

function updateEstimate() {
  const monthly = Number(contribution.value);
  const annual = monthly * 12;
  const total20Years = annual * 20;

  amountText.textContent = currency(monthly).replace('MXN', '').trim();
  annualAmount.textContent = currency(annual).replace('MXN', '').trim();
  totalAmount.textContent = currency(total20Years).replace('MXN', '').trim();
}

function setStep(stepNumber) {
  stepTitles.forEach((title, index) => {
    title.classList.toggle('active', index < stepNumber);
  });

  stepDots.forEach((dot, index) => {
    dot.classList.toggle('active', index < stepNumber);
  });
}

contribution.addEventListener('input', updateEstimate);

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
  setStep(2);

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
  setStep(3);

  whatsPanel.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
});

whatsBtn.addEventListener('click', () => {
  const message = [
    'Hola, quiero agendar una asesoría personalizada para el Plan Vida Mujer.',
    '',
    `Nombre: ${nameInput.value.trim()}`,
    `Teléfono: ${phoneInput.value.trim()}`,
    `Correo: ${emailInput.value.trim()}`,
    `Ingreso mensual: $${income.value}`,
    `Edad: ${age.value}`,
    `Aportación estimada: ${amountText.textContent} / mes`,
    '',
    'Me interesa conocer cómo funciona la protección, el ahorro a 20 años y los beneficios en vida.'
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

updateEstimate();
setStep(1);