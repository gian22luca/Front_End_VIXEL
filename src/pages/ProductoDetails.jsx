import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productos from '../data/productos'

export function ProductoDetails() {
    
  const { productoId } = useParams()
  const navigate = useNavigate()
  //filtro del array de cursos en base al id del parametro
  const producto = productos.find(p => p.id === parseInt(productoId))

  const [isAdded, setIsAdded] = useState(() => Boolean(producto?.isAdded))

  if (!producto) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Producto no encontrado</h2>
          <button
            onClick={() => navigate(-1)}
            className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-black hover:bg-indigo-500"
          >
            Volver
          </button>
        </div>
      </section>
    )
  }

  const handleToggle = () => setIsAdded(prev => !prev)

  const agregadoClass = isAdded ?
    "bg-red-500 text-white border-red-500 hover:brightness-110" :
    "bg-yellow-300 text-black border-black/60 hover:brightness-105"

  const textoBoton = isAdded ? "Eliminar producto" : "Agregar producto"

  return (
    <section className="pb-12">

      <header className="relative">
        <div
          className="h-[280px] sm:h-[360px] bg-cover bg-center"
          style={{ backgroundImage: `url('${producto.image}')` }}
          aria-hidden="true"
        ></div>
        <div className="pointer-events-none absolute inset-0 bg-slate-900/60" aria-hidden="true"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h1 className="text-3xl font-semibold sm:text-5xl text-white">{producto.name}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">{producto.description}</p>
          </div>
        </div>
      </header>

      <div className="relative my-20">
        <div className="mx-auto max-w-5xl">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg grid gap-6 md:grid-cols-3 md:items-start">

            <div className="md:col-span-1 flex items-center justify-center">
              <img
                src={producto.image}
                alt={`Imagen del curso ${producto.name}`}
                className="w-full max-w-xs rounded-lg object-cover shadow-md"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="mt-3 text-2xl font-bold text-black">{producto.name}</h2>
                </div>
              </div>

              <p className="mt-4 text-black">{producto.description}</p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-black">Costo:</p>
                  <p className="text-xl font-bold text-black">{producto.cost}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(-1)}                    
                    className="cursor-pointer rounded-lg border border-white/10 bg-white/3 px-4 py-2 text-sm text-white hover:bg-white/5"
                  >
                    ← Volver
                  </button>
                  <button
                    type="button"
                    onClick={handleToggle}
                    className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold text-white ${agregadoClass}`}
                  >
                    {textoBoton}
                    
                  </button>

                  
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}
