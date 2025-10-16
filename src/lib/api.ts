import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('PetMate_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export async function loginApi(username: string, password: string) {
  const { data } = await api.post('/users/login/', { username, password });
  return data;
}

export async function registerApi(payload: {
  username?: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}) {
  const { data } = await api.post('/users/users/', payload);
  return data;
}

// Pets
export async function fetchPetsApi(params?: Record<string, string | number | boolean>) {
  const { data } = await api.get('/pets/pets/', { params });
  return data;
}

// Accessories
export async function fetchAccessoriesApi(params?: Record<string, string | number | boolean>) {
  const { data } = await api.get('/accessories/accessories/', { params });
  return data;
}

// Categories
export async function fetchCategoriesApi() {
  const { data } = await api.get('/accessories/categories/');
  return data;
}

// Pet adoption
export async function adoptPetApi(petId: number | string) {
  const { data } = await api.post(`/pets/pets/${petId}/adopt/`);
  return data;
}

// Carts
export async function getMyCartApi() {
  const { data } = await api.get('/carts/carts/my_cart/');
  return data;
}

export async function addCartItemApi(cartId: number | string, payload: { accessory_id: number | string; quantity: number; }) {
  const { data } = await api.post(`/carts/carts/${cartId}/add_item/`, payload);
  return data;
}

export async function updateCartItemApi(cartId: number | string, payload: { item_id: number | string; quantity: number; }) {
  const { data } = await api.patch(`/carts/carts/${cartId}/update_item/`, payload);
  return data;
}

export async function removeCartItemApi(cartId: number | string, payload: { item_id: number | string; }) {
  const { data } = await api.delete(`/carts/carts/${cartId}/remove_item/`, { data: payload });
  return data;
}

export async function clearCartApi(cartId: number | string) {
  const { data } = await api.delete(`/carts/carts/${cartId}/clear_cart/`);
  return data;
}

// Addresses
export async function listAddressesApi() {
  const { data } = await api.get('/addresses/addresses/');
  return data;
}

export async function createAddressApi(payload: any) {
  const { data } = await api.post('/addresses/addresses/', payload);
  return data;
}

export async function updateAddressApi(id: number | string, payload: any) {
  const { data } = await api.put(`/addresses/addresses/${id}/`, payload);
  return data;
}

export async function deleteAddressApi(id: number | string) {
  const { data } = await api.delete(`/addresses/addresses/${id}/`);
  return data;
}

// Orders
export async function listOrdersApi() {
  const { data } = await api.get('/orders/orders/');
  return data;
}

export async function createOrderApi(payload: { cart: number | string; shipping_address: number | string; billing_address: number | string; }) {
  const { data } = await api.post('/orders/orders/', payload);
  return data;
}

export async function cancelOrderApi(id: number | string) {
  const { data } = await api.post(`/orders/orders/${id}/cancel_order/`);
  return data;
}

// Payments
export async function createPaymentApi(payload: { order: number | string; payment_method: 'UPI' | 'Card' | 'Cash'; }) {
  const { data } = await api.post('/payments/payments/', payload);
  return data;
}

export async function processPaymentApi(id: number | string) {
  const { data } = await api.post(`/payments/payments/${id}/process_payment/`);
  return data;
}

// Contacts
export async function createContactApi(payload: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const { data } = await api.post('/contacts/contacts/', payload);
  return data;
}


