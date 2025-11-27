// src/components/ShoppingCard.jsx
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getPedidos } from "../services/pedidoApi";

const BASE_IMG_URL = "http://127.0.0.1:8000/media/";

export function ShoppingCard({ onClose }) {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = useState(true);


  useEffect(() => {
    async function cargarPedido() {
      try {
        const data = await getPedidos();
        console.log("Mini carrito /api/pedidos/:", data);
        setPedido(data);
      } catch (err) {
        console.error("Error obteniendo pedido para mini carrito:", err);
        setErrorMsg("No se pudo cargar el carrito.");
      } finally {
        setLoading(false);
      }
    }

    cargarPedido();
  }, []);

  const items = pedido?.items ?? [];

  const total = items.reduce((acc, item) => {
    const price = Number(item.precio_producto);
    return acc + price * item.cantidad;
  }, 0);

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  const handleClose = () => {
    setVisible(false);      // se oculta a sí mismo
    if (onClose) onClose(); // y si el padre mandó callback, también lo llama
  };

  if (!visible) return null;

  return (
    <div
      role="menu"
      className="relative w-80 max-h-[70vh] overflow-y-auto rounded-md border border-gray-200 bg-white p-4 shadow-lg"
    >
      {/* Botón cerrar */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-3 top-3 text-gray-600 hover:scale-110 transition"
        aria-label="Cerrar carrito"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <p className="mb-3 text-sm font-semibold text-gray-700">Tu carrito</p>

      {loading && <p className="text-xs text-gray-500">Cargando carrito...</p>}

      {errorMsg && !loading && (
        <p className="text-xs text-red-500">{errorMsg}</p>
      )}

      {!loading && !errorMsg && items.length === 0 && (
        <p className="text-xs text-gray-500">No tenés productos en el carrito.</p>
      )}

      {!loading && !errorMsg && items.length > 0 && (
        <>
          <ul className="space-y-4">
            {items.slice(0, 3).map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <img
                  src={`${BASE_IMG_URL}${item.archivo}`}
                  alt={item.nombre_producto}
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    {item.nombre_producto}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    ${item.precio_producto} x {item.cantidad}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-gray-800">
                    Subtotal: ${Number(item.precio_producto) * item.cantidad}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {items.length > 3 && (
            <p className="mt-2 text-[11px] text-gray-500">
              + {items.length - 3} producto(s) más en el carrito...
            </p>
          )}
        </>
      )}

      <div className="mt-4 space-y-2 border-t border-gray-200 pt-3">
        <div className="flex justify-between text-sm text-gray-700">
          <span>Productos</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold text-gray-900">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <NavLink
          to="/carrito"
          onClick={handleClose}
          className="block rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-center"
        >
          Ver mi carrito ({totalItems})
        </NavLink>

        <NavLink
          to="/carrito"
          onClick={handleClose}
          className="block rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 text-center"
        >
          Finalizar compra
        </NavLink>

        <NavLink to="/producto">
          <button
            type="button"
            onClick={handleClose}
            className="mt-1 inline-block text-sm text-gray-500 underline underline-offset-4 hover:text-gray-700"
          >
            Seguir comprando
          </button>
        </NavLink>
      </div>
    </div>
  );
}
