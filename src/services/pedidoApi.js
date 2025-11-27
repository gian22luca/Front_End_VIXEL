import * as tokenService from '../services/tokenService'


const BASE_URL = 'https://gian22luca.pythonanywhere.com/api/pedidos/';
//  'http://127.0.0.1:8000/api/pedidos/';
const BASE_URL_PEDIDO_ITEMS = 'https://gian22luca.pythonanywhere.com/api/pedidoItemView/';
 //'http://127.0.0.1:8000/api/pedidoItemView/';


async function request(path = '', options = {}) {
  const url = path ? `${BASE_URL}${path}/` : BASE_URL;

  const token = localStorage.getItem('auth_token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  const res = await fetch(url, {
    headers,
    ...options
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Request failed ${res.status}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }

  const content = await res.text();
  try {
    return content ? JSON.parse(content) : null;
  } catch {
    return content;
  }
}


async function requestWithRefresh(baseUrl, path = '', options = {}, isRetry = false) {
  const url = path ? `${baseUrl}${path}/` : baseUrl;

  const token = tokenService.getAccessToken();
  console.log('Token actual: ', token);

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  try {
    const response = await fetch(url, {
      headers,
      ...options
    });

    if (response.ok) {
      const text = await response.text();
      if (!text) return null;
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    }

  
    if ((response.status === 403 || response.status === 401) && !isRetry) {
      const renewResult = await tokenService.renewAccessToken();

      if (renewResult.success) {
        console.log('Token renovado exitosamente, reintentando petición');
        return requestWithRefresh(baseUrl, path, options, true);
      } else {
        console.log('No se pudo renovar el token');
        tokenService.clearTokens();
        const error = new Error('Sesion expirada, por favor inicie sesión nuevamente');
        error.status = 401;
        error.needsLogin = true;
        throw error;
      }
    }

    const text = await response.text().catch(() => '');
    const err = new Error(`Request failed ${response.status}`);
    err.status = response.status;
    err.body = text;
    throw err;
  } catch (e) {
    if (e.name === 'TypeError') {
      const netError = new Error('Error de conexión');
      throw netError;
    }
    throw e;
  }
}

/* ───────────── PEDIDOS (carrito) ───────────── */

export function getPedidos() {
  return requestWithRefresh(BASE_URL);
}

export function getPedido(id) {
  return requestWithRefresh(BASE_URL, String(id));
}

export function crearPedido(pedido) {
  const options = { method: 'POST', body: JSON.stringify(pedido) };
  return requestWithRefresh(BASE_URL, '', options);
}

export function updatePedido(id, updates) {
  const options = { method: 'PUT', body: JSON.stringify(updates) };
  return requestWithRefresh(BASE_URL, String(id), options);
}

export function deletePedido(id) {
  const options = { method: 'DELETE' };
  return requestWithRefresh(BASE_URL, String(id), options);
}

/* ───────────── PEDIDO ITEMS (ViewSet) ───────────── */

/**
 * Actualizar un item del pedido (cambiar cantidad)
 * @param {number} idItem
 * @param {object} updates 
 */
export function updatePedidoItem(idItem, updates) {
  const options = { method: 'PUT', body: JSON.stringify(updates) };
  
  return requestWithRefresh(BASE_URL_PEDIDO_ITEMS, String(idItem), options);
}

/**
 * Eliminar un item del pedido
 * @param {number} idItem
 */
export function deletePedidoItem(idItem) {
  const options = { method: 'DELETE' };
  return requestWithRefresh(BASE_URL_PEDIDO_ITEMS, String(idItem), options);
}
