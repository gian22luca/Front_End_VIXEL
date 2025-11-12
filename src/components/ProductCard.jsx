import { Link } from 'react-router-dom'

export function ProductCard({
  id = 0,
  name = 'Nombre del prodcucto',
  image = '',
  description = 'Breve descripción del producto',
  cost = '$100k',
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      {/* Portada */}
      <Link to={`/producto/${id}`} className="block aspect-[16/9] w-full">
        <img
          src={image}
          alt={`Portada del producto ${name}`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Cuerpo */}
      <div className="grid gap-2 p-4 text-black">
        <h4 className="text-lg font-bold leading-snug sm:text-xl">{name}</h4>
        <p className="text-sm sm:text-[0.95rem]">{description}</p>

        <hr className="my-1 border-t border-slate-300/50" />

        {/* Solo costo */}
        <div className="flex items-center justify-between text-sm">
          <span className="opacity-0 select-none">.</span>{/* separador mínimo */}
          <p className="font-bold">{cost}</p>
        </div>

        {/* Solo el link */}
        <div className="pt-1 flex justify-end">
          <Link
            to={`/producto/${id}`}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Ver Detalles →
          </Link>
        </div>
      </div>
    </article>
  )
}
