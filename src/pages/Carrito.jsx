// src/pages/Carrito.jsx
import { useEffect, useState } from 'react';
import { getPedidos, updatePedidoItem, deletePedidoItem } from '../services/pedidoApi';

const BASE_IMG_URL = 'http://127.0.0.1:8000/media/';

export function Carrito() {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function cargarPedido() {
      try {
        const data = await getPedidos();
        console.log('Respuesta /api/pedidos/:', data);
        // El backend devuelve UN solo pedido (el carrito)
        setPedido(data);
      } catch (err) {
        console.error('Error obteniendo pedido:', err);
        setErrorMsg('Hubo un problema al cargar el carrito.');
      } finally {
        setLoading(false);
      }
    }

    cargarPedido();
  }, []);

  const items = pedido?.items ?? [];

  const totalCalculado = items.reduce((acc, item) => {
    const price = Number(item.precio_producto);
    return acc + price * item.cantidad;
  }, 0);

  // Si tu backend ya calcula precio_total, podés usar eso:
  const total = pedido?.precio_total ?? totalCalculado;

  // 🟢 Aumentar cantidad
  const handleIncrement = async (itemId) => {
    const item = items.find((it) => it.id === itemId);
    if (!item) return;

    const nuevaCantidad = item.cantidad + 1;

    // Actualización optimista en el front
    setPedido((prev) => ({
      ...prev,
      items: prev.items.map((it) =>
        it.id === itemId ? { ...it, cantidad: nuevaCantidad } : it
      ),
    }));

    try {
      // Ajustá esto para que pegue al endpoint correcto de PedidoItem
      await updatePedidoItem(itemId, { cantidad: nuevaCantidad });
    } catch (err) {
      console.error('Error al aumentar cantidad:', err);
      setErrorMsg('No se pudo actualizar la cantidad.');

      // Si querés: recargar el carrito desde el backend:
      // const data = await getPedidos();
      // setPedido(data);
    }
  };

  // 🔻 Disminuir cantidad (si llega a 0, lo elimina)
  const handleDecrement = async (itemId) => {
    const item = items.find((it) => it.id === itemId);
    if (!item) return;

    const nuevaCantidad = item.cantidad - 1;

    if (nuevaCantidad <= 0) {
      // si llega a 0, directamente lo quitamos
      return handleRemove(itemId);
    }

    setPedido((prev) => ({
      ...prev,
      items: prev.items.map((it) =>
        it.id === itemId ? { ...it, cantidad: nuevaCantidad } : it
      ),
    }));

    try {
      await updatePedidoItem(itemId, { cantidad: nuevaCantidad });
    } catch (err) {
      console.error('Error al disminuir cantidad:', err);
      setErrorMsg('No se pudo actualizar la cantidad.');
    }
  };

  // 🗑️ Eliminar un item del carrito
  const handleRemove = async (itemId) => {
    // guardo el estado anterior por si quiero volver atrás
    const prevPedido = pedido;

    // lo saco del front
    setPedido((prev) => ({
      ...prev,
      items: prev.items.filter((it) => it.id !== itemId),
    }));

    try {
      await deletePedidoItem(itemId);
    } catch (err) {
      console.error('Error al eliminar item:', err);
      setErrorMsg('No se pudo eliminar el producto del carrito.');
      // rollback si falla
      setPedido(prevPedido);
    }
  };

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-200">Cargando carrito...</p>
      </section>
    );
  }

  if (errorMsg) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-400">{errorMsg}</p>
      </section>
    );
  }

  if (!pedido || items.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-200">No tenés productos en el carrito.</p>
      </section>
    );
  }

  return (
    <section className="min-h-[60vh] bg-slate-900 text-slate-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-6">Tu carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-slate-800/80 rounded-lg p-4 border border-slate-700"
              >
                {/* Imagen */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={`${BASE_IMG_URL}${item.archivo}`}
                    alt={item.nombre_producto}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="font-medium text-lg">
                    {item.nombre_producto}
                  </h2>
                  <p className="text-sm text-slate-300">
                    Precio unitario: ${item.precio_producto}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-sm">Cantidad:</span>

                    {/* Controles de cantidad */}
                    <div className="inline-flex items-center rounded-md border border-slate-700 bg-slate-900/60">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="px-2 py-1 text-lg leading-none hover:bg-slate-700"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="px-2 py-1 text-lg leading-none hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal + quitar */}
                <div className="flex flex-col items-end justify-between">
                  <p className="font-semibold">
                    ${Number(item.precio_producto) * item.cantidad}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <aside className="bg-slate-800/90 rounded-lg p-4 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Resumen</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>

            <div className="border-t border-slate-700 mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <button
              className="mt-6 w-full bg-emerald-500 hover:bg-emerald-400 text-violet-600 font-semibold py-2 rounded-md transition"
              onClick={() => {
                alert('Flujo de checkout todavía no implementado 😅');
              }}
            >
              Finalizar compra
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
