const API_URL = '/api'

export async function getAllProducts(search?: string) {
  const url = search
    ? `${API_URL}/products?search=${encodeURIComponent(search)}&limit=1000`
    : `${API_URL}/products?limit=1000`
  const res = await fetch(url, { cache: 'no-store' })
  const data = await res.json()
  return data.products
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' })
  const data = await res.json()
  return data.product
}

export async function getBestSellers() {
  const res = await fetch(`${API_URL}/products/best-sellers`, { cache: 'no-store' })
  const data = await res.json()
  return data.products
}

export async function getAdminStats(token: string) {
  const res = await fetch(`${API_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function getAllOrders() {
  const res = await fetch(`${API_URL}/orders`, { cache: 'no-store' })
  const data = await res.json()
  return data.orders
}

export async function updateOrderStatus(orderId: string, status: string) {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  return res.json()
}

export async function submitContactForm(data: { name: string; email: string; subject: string; message: string }) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function getAllContactMessages() {
  const res = await fetch(`${API_URL}/contact`, { cache: 'no-store' })
  const data = await res.json()
  return data.contacts
}

export async function subscribeToNewsletter(email: string) {
  const res = await fetch(`${API_URL}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  return res.json()
}

export async function getAllSubscribers() {
  const res = await fetch(`${API_URL}/newsletter`, { cache: 'no-store' })
  const data = await res.json()
  return data.subscribers
}


export async function getProductsByCategory(category: string, limit: number = 5) {
  const res = await fetch(`${API_URL}/products?category=${encodeURIComponent(category)}&limit=${limit}`, { cache: 'no-store' })
  const data = await res.json()
  return data.products
}