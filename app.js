const STORAGE_KEY = 'proweb_leads';

const form = document.getElementById('leadForm');
const successMessage = document.getElementById('successMessage');
const submitAnotherBtn = document.getElementById('submitAnother');
const leadEmpty = document.getElementById('leadEmpty');
const leadTableWrapper = document.getElementById('leadTableWrapper');
const leadTableBody = document.getElementById('leadTableBody');
const leadCards = document.getElementById('leadCards');

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

function getLeads() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLeads(leads) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function countDigits(phone) {
  return phone.replace(/\D/g, '').length;
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function clearErrors() {
  Object.keys(fields).forEach((key) => {
    fields[key].classList.remove('invalid');
    errors[key].textContent = '';
  });
}

function validate() {
  clearErrors();
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
}

function showForm() {
  form.hidden = false;
  successMessage.hidden = true;
  form.reset();
  clearErrors();
}

function renderLeads() {
  const leads = getLeads();

  if (leads.length === 0) {
    leadEmpty.hidden = false;
    leadTableWrapper.hidden = true;
    leadCards.innerHTML = '';
    return;
  }

  leadEmpty.hidden = true;
  leadTableWrapper.hidden = false;

  leadTableBody.innerHTML = leads
    .map(
      (lead) => `
    <tr data-id="${lead.id}">
      <td>${escapeHtml(lead.name)}</td>
      <td>${escapeHtml(lead.phone)}</td>
      <td>${escapeHtml(lead.service)}</td>
      <td>${escapeHtml(lead.budget)}</td>
      <td class="notes-cell" title="${escapeHtml(lead.notes)}">${escapeHtml(lead.notes)}</td>
      <td>${formatDate(lead.submittedAt)}</td>
      <td><button type="button" class="btn-delete" data-id="${lead.id}">Delete</button></td>
    </tr>
  `
    )
    .join('');

  leadCards.innerHTML = leads
    .map(
      (lead) => `
    <article class="lead-card" data-id="${lead.id}">
      <div class="lead-card-header">
        <span class="lead-card-name">${escapeHtml(lead.name)}</span>
        <span class="lead-card-date">${formatDate(lead.submittedAt)}</span>
      </div>
      <div class="lead-card-row">
        <span class="lead-card-label">Phone</span>
        <span>${escapeHtml(lead.phone)}</span>
      </div>
      <div class="lead-card-row">
        <span class="lead-card-label">Service</span>
        <span>${escapeHtml(lead.service)}</span>
      </div>
      <div class="lead-card-row">
        <span class="lead-card-label">Budget</span>
        <span>${escapeHtml(lead.budget)}</span>
      </div>
      <p class="lead-card-notes">${escapeHtml(lead.notes)}</p>
      <button type="button" class="btn-delete" data-id="${lead.id}">Delete</button>
    </article>
  `
    )
    .join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function deleteLead(id) {
  const leads = getLeads().filter((lead) => lead.id !== id);
  saveLeads(leads);
  renderLeads();
}

function handleSubmit(e) {
  e.preventDefault();

  if (!validate()) return;

  const lead = {
    id: crypto.randomUUID(),
    name: fields.name.value.trim(),
    phone: fields.phone.value.trim(),
    service: fields.service.value,
    budget: fields.budget.value,
    notes: fields.notes.value.trim(),
    submittedAt: new Date().toISOString(),
  };

  const leads = getLeads();
  leads.unshift(lead);
  saveLeads(leads);

  showSuccess();
  renderLeads();
}

function handleDeleteClick(e) {
  if (!e.target.classList.contains('btn-delete')) return;
  const id = e.target.dataset.id;
  if (id) deleteLead(id);
}

form.addEventListener('submit', handleSubmit);
submitAnotherBtn.addEventListener('click', showForm);
leadTableBody.addEventListener('click', handleDeleteClick);
leadCards.addEventListener('click', handleDeleteClick);

Object.keys(fields).forEach((key) => {
  fields[key].addEventListener('input', () => {
    fields[key].classList.remove('invalid');
    errors[key].textContent = '';
  });
});

renderLeads();
