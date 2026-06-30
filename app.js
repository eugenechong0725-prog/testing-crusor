// ============================================================
// Leads are sent to this email (private — customers never see them).
// Get your free access key at https://web3forms.com
// Enter LEAD_EMAIL there, then paste the access key below.
// Works on GitHub Pages, Vercel, and custom domains — no per-domain activation.
// ============================================================
const LEAD_EMAIL = 'eugenechong0725@gmail.com';
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

const form = document.getElementById('leadForm');
const successMessage = document.getElementById('successMessage');
const submitAnotherBtn = document.getElementById('submitAnother');
const submitBtn = document.getElementById('submitBtn');
const formError = document.getElementById('formError');

const fields = {
  name: document.getElementById('name'),
  phone: document.getElementById('phone'),
  service: document.getElementById('service'),
  budget: document.getElementById('budget'),
  notes: document.getElementById('notes'),
};

const errors = {
  name: document.getElementById('nameError'),
  phone: document.getElementById('phoneError'),
  service: document.getElementById('serviceError'),
  budget: document.getElementById('budgetError'),
  notes: document.getElementById('notesError'),
};

function countDigits(phone) {
  return phone.replace(/\D/g, '').length;
}

function clearErrors() {
  Object.keys(fields).forEach((key) => {
    fields[key].classList.remove('invalid');
    errors[key].textContent = '';
  });
}

function clearFormError() {
  formError.textContent = '';
  formError.hidden = true;
}

function showFormError(message) {
  formError.textContent = message;
  formError.hidden = false;
}

function validate() {
  clearErrors();
  clearFormError();
  let valid = true;

  const name = fields.name.value.trim();
  if (!name) {
    fields.name.classList.add('invalid');
    errors.name.textContent = 'Please enter your name.';
    valid = false;
  }

  const phone = fields.phone.value.trim();
  if (!phone) {
    fields.phone.classList.add('invalid');
    errors.phone.textContent = 'Please enter your phone number.';
    valid = false;
  } else if (countDigits(phone) < 8) {
    fields.phone.classList.add('invalid');
    errors.phone.textContent = 'Phone number must contain at least 8 digits.';
    valid = false;
  }

  if (!fields.service.value) {
    fields.service.classList.add('invalid');
    errors.service.textContent = 'Please select a service.';
    valid = false;
  }

  if (!fields.budget.value) {
    fields.budget.classList.add('invalid');
    errors.budget.textContent = 'Please select a budget range.';
    valid = false;
  }

  const notes = fields.notes.value.trim();
  if (!notes) {
    fields.notes.classList.add('invalid');
    errors.notes.textContent = 'Please add some notes about your project.';
    valid = false;
  }

  return valid;
}

function showSuccess() {
  form.hidden = true;
  successMessage.hidden = false;
  clearFormError();
}

function showForm() {
  form.hidden = false;
  successMessage.hidden = true;
  form.reset();
  clearErrors();
  clearFormError();
}

function setSubmitting(isSubmitting) {
  submitBtn.disabled = isSubmitting;
  submitBtn.textContent = isSubmitting ? 'Submitting...' : 'Submit Request';
}

function buildLeadPayload() {
  return {
    name: fields.name.value.trim(),
    phone: fields.phone.value.trim(),
    service: fields.service.value,
    budget: fields.budget.value,
    notes: fields.notes.value.trim(),
  };
}

async function sendToEmail(payload) {
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
    throw new Error('Web3Forms access key is not configured.');
  }

  const response = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Lead: ${payload.name} — ProWeb Studio`,
      from_name: 'ProWeb Studio Website',
      name: payload.name,
      phone: payload.phone,
      service: payload.service,
      budget: payload.budget,
      message: payload.notes,
    }),
  });

  if (!response.ok) {
    throw new Error('Email submission failed');
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || 'Email submission failed');
  }
}

async function handleSubmit(e) {
  e.preventDefault();

  if (!validate()) return;

  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
    showFormError('Form is not configured yet. Please add your Web3Forms access key in app.js.');
    return;
  }

  const payload = buildLeadPayload();

  setSubmitting(true);
  clearFormError();

  try {
    await sendToEmail(payload);
    showSuccess();
  } catch {
    showFormError('Something went wrong. Please try again or contact us directly.');
  } finally {
    setSubmitting(false);
  }
}

form.addEventListener('submit', handleSubmit);
submitAnotherBtn.addEventListener('click', showForm);

Object.keys(fields).forEach((key) => {
  fields[key].addEventListener('input', () => {
    fields[key].classList.remove('invalid');
    errors[key].textContent = '';
  });
});
