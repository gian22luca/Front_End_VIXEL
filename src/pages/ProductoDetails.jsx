import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductoById } from '../services/productoApi' 
import {crearPedido} from '../services/pedidoApi'

const BASE_IMG_URL = "http://localhost:8000";

export function ProductoDetails() {
  const { productoId } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAdded, setIsAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  // 1) Traer el producto desde el backend
  useEffect(() => {
    async function cargarProducto() {
      try {
        setLoading(true);
        const data = await getProductoById(productoId);
        // Asumo que tu endpoint devuelve un objeto:
        // { id_producto, nombre, descripcion, precio, archivo }
        setProducto(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    }

    cargarProducto();
  }, [productoId]);

  // 2) Agregar a la base de datos "pedidos" (carrito)
  const handleAddToCart = async () => {
  if (!producto) return;

  try {
    setAdding(true);

    const nuevoPedido = {
      producto: producto.id_producto, // o el campo id que uses
      cantidad: 1,
    };

    await crearPedido(nuevoPedido); // POST /api/pedidos/
    setIsAdded(true);
  } catch (err) {
    console.error('Error al crear pedido:', err);
    alert('No se pudo agregar al carrito.');
  } finally {
    setAdding(false);
  }
};


  const agregadoClass = isAdded
    ? 'bg-green-600 text-white border-green-600 hover:brightness-110'
    : 'bg-yellow-300 text-black border-black/60 hover:brightness-105';

  const textoBoton = isAdded ? 'Agregado al carrito' : 'Agregar producto';

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-500">Cargando producto...</p>
      </section>
    );
  }

  if (error || !producto) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Producto no encontrado</h2>
          <p className="mb-4 text-gray-500">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
          >
            Volver
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-12">
      {/* HEADER */}
      <header className="relative">
        <div
          className="h-[280px] sm:h-[360px] bg-cover bg-center"
          style={{
            backgroundImage: `url('${BASE_IMG_URL + producto.archivo}')`,
          }}
          aria-hidden="true"
        ></div>
        <div
          className="pointer-events-none absolute inset-0 bg-slate-900/60"
          aria-hidden="true"
        ></div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h1 className="text-3xl font-semibold sm:text-5xl text-white">
              {producto.nombre}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              {producto.descripcion}
            </p>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="relative my-20">
        <div className="mx-auto max-w-5xl">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg grid gap-6 md:grid-cols-3 md:items-start">
            {/* Imagen */}
            <div className="md:col-span-1 flex items-center justify-center">
              <img
                src={BASE_IMG_URL + producto.archivo}
                alt={`Imagen del producto ${producto.nombre}`}
                className="w-full max-w-xs rounded-lg object-cover shadow-md"
              />
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="mt-3 text-2xl font-bold text-black">
                    {producto.nombre}
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-black">{producto.descripcion}</p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-black">Costo:</p>
                  <p className="text-xl font-bold text-black">
                    ${producto.precio}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="cursor-pointer rounded-lg border border-white/10 bg-white/30 px-4 py-2 text-sm text-white hover:bg-white/40"
                  >
                    ← Volver
                  </button>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAdded || adding}
                    className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold text-white ${agregadoClass} disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {adding ? 'Agregando...' : textoBoton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}