const API_BASE = 'http://localhost:8000';

// Fetch all model metadata
export const fetchMetadata = async () => {
  const res = await fetch(`${API_BASE}/admin/metadata`);
  if (!res.ok) throw new Error('Failed to fetch metadata');
  return res.json();
};

// GET list with pagination, search, sorting
// export const fetchList = async (model, params = {}) => {
//   const { page = 1, per_page = 20, search = '', sort = '', order = 'asc' } = params;
//   const query = new URLSearchParams({
//     page,
//     per_page,
//     search,
//     sort,
//     order
//   }).toString();
//   const res = await fetch(`${API_BASE}/api/${model.toLowerCase()}?${query}`);
//   if (!res.ok) throw new Error('Failed to fetch list');
//   return res.json(); // expected: { items, total, page, per_page }
// };

// export const fetchList = async (model, params = {}) => {
//   const { page = 1, per_page = 20, search = '', sort = '', order = 'asc' } = params;
//   const query = new URLSearchParams({
//     page,
//     per_page,
//     search,
//     sort,
//     order
//   }).toString();
//   const url = `${API_BASE}/api/${model.toLowerCase()}?${query}`;
//   console.log('🔗 Fetching:', url);
//   const res = await fetch(url);
//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`HTTP ${res.status}: ${text}`);
//   }
//   return res.json();
// };


export const fetchList = async (model, params = {}) => {
  const { page = 1, per_page = 10, search = '', sort = '', order = 'asc', ...filters } = params;
  // Build URLSearchParams with all key/value pairs
  const query = new URLSearchParams({
    page,
    per_page,
    sort,
    order,
    ...(search && { search }), // if search exists (we still support global search)
    ...filters, // spread all filter fields
  }).toString();
  const url = `${API_BASE}/api/${model.toLowerCase()}?${query}`;
  console.log('🔗 Fetching:', url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

// Other CRUD functions remain unchanged...



// POST create
export const createItem = async (model, data) => {
  const res = await fetch(`${API_BASE}/api/${model.toLowerCase()}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Failed to create');
  }
  return res.json();
};


// export const updateItem = async (model, id, data) => {
//   const res = await fetch(`${API_BASE}/api/${model.toLowerCase()}/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error('Failed to update');
//   return res.json();
// };


export const updateItem = async (model, id, data) => {
  const res = await fetch(`${API_BASE}/api/${model.toLowerCase()}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update');
  return res.json();
};


// DELETE delete
export const deleteItem = async (model, id) => {
  const res = await fetch(`${API_BASE}/api/${model.toLowerCase()}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete');
  return res.json();
};


// POST /api/admin/create-superuser
export const createSuperuser = async (username, email, password) => {
  const res = await fetch(`${API_BASE}/api/admin/create-superuser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Failed to create superuser.');
  }
  return res.json();
};