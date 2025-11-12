import { NavLink } from "react-router";
import { useState } from "react";
import productos from '../data/productos'
export function ShoppingCard({ onClose }) {
    const [mostrar, setMostrar] = useState(true);
    const cerrarComponente = () => {
    setMostrar(false);
    };
  return (
    <div
      role="menu"
      className="w-80 max-h-[70vh] overflow-y-auto rounded-md border border-gray-200 bg-white p-4 shadow-lg"
    >
      {/* Cerrar */}
     
      <button
        type="button"
        onClick={cerrarComponente}
        className="absolute right-3 top-3 text-gray-600 hover:scale-110 transition"
        aria-label="Cerrar carrito"
      >
        {/* Si tu Tailwind no soporta size-5, usá h-5 w-5 */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      

      <p className="mb-3 text-sm font-semibold text-gray-700">Tu carrito</p>

      <ul className="space-y-4">
        <li className="flex items-center gap-3">
          <img
            src={productos[1].image}
            alt="" className="h-12 w-12 rounded object-cover"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-900">{productos[1].name}</p>
            <p className="mt-1 text-xs text-gray-600">{productos[1].cost}</p>
            
          </div>
          <input
            type="number"
            min="1"
            defaultValue="1"
            className="h-8 w-12 rounded border border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-700 focus:outline-none"
          />
          <button
            type="button"
            className="text-gray-500 hover:text-red-600"
            aria-label="Quitar ítem"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9M9 5h6m1 0h3m-3 0l-.405 12.243A2 2 0 0 1 13.6 19H10.4a2 2 0 0 1-1.995-1.757L8 5"/>
            </svg>
          </button>
        </li>

        {/* ...repetí más items si querés... */}
      </ul>

      <div className="mt-4 space-y-2">
      <NavLink to="/carrito"
           className="block rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
          Ver mi carrito (2)
        </NavLink>
        <NavLink to="/carrito"
           className="block rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800">
          Finalizar compra
        </NavLink>
       <NavLink to="/producto">
        <button
          type="button"
          onClick={onClose}
          className="inline-block text-sm text-gray-500 underline underline-offset-4 hover:text-gray-700"
        >
          Seguir comprando
        </button>
         </NavLink>
    
      </div>
    </div>
  );
}
