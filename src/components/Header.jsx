import { useState, useEffect, useRef } from "react"
import { NavLink} from "react-router-dom";
import logo_vixel from  "../assets/favicon-32x32.png";
import logo_carrito from  "../assets/shoppingcart.ico";
import { ShoppingCard } from './ShoppingCard'; 
import { useAuth } from '../contexts/AuthContext';






export function Header(){
  const [isOpen, setIsOpen] = useState(false);     // menú mobile
  const [cardOpen, setCardOpen] = useState(false); // ⬅️ estado del dropdown
  const [scrolled, setScrolled] = useState(false);
  const cartDesktopRef = useRef(null);
  const cartMobileRef = useRef(null);
  const {isAuthenticated, logout} = useAuth();
  
             

    useEffect(() => {
    function handleClickOutside(e) {
      const desktopBox = cartDesktopRef.current;
      const mobileBox = cartMobileRef.current;

      // Si el click fue dentro de cualquiera de los dos carritos, no cierro
      if (
        (desktopBox && desktopBox.contains(e.target)) ||
        (mobileBox && mobileBox.contains(e.target))
      ) {
        return;
      }

      // Si fue afuera, cierro
      setCardOpen(false);
    }

    function handleEsc(e) {
      if (e.key === "Escape") setCardOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);


  function handleClick(){
    setIsOpen((prev) => !prev);        
  }
  const handleClose = () => {
    setIsOpen(false);   // ⬅️ solo cerramos el menú mobile
  };



    return (
     <header className="fixed top-0 inset-x-0 z-50 m-0 bg-white text-gray-50">
    <div className="container mx-auto flex h-16 items-center px-4">
      {/* COLUMNA IZQUIERDA: LOGO */}
      <div className="flex-1 flex items-center">
        <a href="/" aria-label="Volver al inicio" className="flex items-center p-2">
          <img
            src={logo_vixel}
            alt="Vixel"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl sm:text-2xl md:text-3xl font-bold leading-none tracking-tight">
            ixel
          </span>
        </a>
      </div>

      {/* COLUMNA CENTRAL: NAV DESKTOP CENTRADO */}
      <div className="flex-1 flex justify-center">
        <ul className="hidden lg:flex items-stretch space-x-3">
          <li className="flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "flex items-center px-4 -mb-1 border-b-2 " +
                (isActive ? "border-violet-600 text-violet-600" : "border-transparent")
              }
            >
              Inicio
            </NavLink>
          </li>

          <li className="flex">
            <NavLink
              to="/producto"
              className={({ isActive }) =>
                "flex items-center px-4 -mb-1 border-b-2 " +
                (isActive ? "border-violet-600 text-violet-600" : "border-transparent")
              }
            >
              Productos
            </NavLink>
          </li>

          <li className="flex">
            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                "flex items-center px-4 -mb-1 border-b-2 " +
                (isActive ? "border-violet-600 text-violet-600" : "border-transparent")
              }
            >
              Contacto
            </NavLink>
          </li>
        </ul>
      </div>

      {/* COLUMNA DERECHA: AUTH + CARRITO */}
      <div className="flex-1 flex items-center justify-end gap-3">
        {/* Botones de sesión (solo desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  "inline-block rounded-sm border px-6 py-2 text-sm font-medium " +
                  (isActive
                    ? "border-violet-600 bg-transparent text-white "
                    : "border-indigo-600 bg-black text-white hover:bg-transparent hover:text-white") +
                  " focus:outline-none focus:ring-0 active:scale-100 active:translate-y-0"
                }
                onMouseUp={(e) => e.currentTarget.blur()}
              >
                Ingresar
              </NavLink>

              <NavLink
                to="/registrarse"
                className={({ isActive }) =>
                  "inline-block rounded-sm border px-6 py-2 text-sm font-medium " +
                  (isActive
                    ? "border-violet-600 bg-transparent text-white "
                    : "border-indigo-600 bg-black text-white hover:bg-transparent hover:text-white") +
                  " focus:outline-none focus:ring-0 active:scale-100 active:translate-y-0"
                }
                onMouseUp={(e) => e.currentTarget.blur()}
              >
                Registrarse
              </NavLink>
            </>
          )}

        {isAuthenticated && (
          <button
            type="button"
            onClick={logout}
            className="inline-block rounded-sm border border-red-500 bg-white px-4 py-2 text-sm font-medium text-violet-600 hover:text-white"
          >
            Cerrar sesión
          </button>
        )}

        {/* === CARRITO con DROPDOWN === */}
        <div className="relative" ref={cartDesktopRef}>
          <button
            type="button"
            onClick={() => setCardOpen((v) => !v)}
            onMouseUp={(e) => e.currentTarget.blur()}
            aria-haspopup="menu"
            aria-expanded={cardOpen}
            aria-controls="cart-menu"
            className="inline-flex items-center justify-center rounded-sm border border-indigo-600 bg-black px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none"
          >
            <img src={logo_carrito} alt="Carrito" className="w-5 h-5 object-contain" />
          </button>

          {cardOpen && (
            <div
              id="cart-menu"
              role="menu"
              className="absolute right-0 mt-2 w-80 rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 z-50"
            >
              <ShoppingCard onClose={() => setCardOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </div>

 



    {/* MENÚ MOBILE DROPDOWN */}
<nav
  id="mobile-menu"
  className={`lg:hidden absolute top-16 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-md ${
    isOpen ? "block" : "hidden"
  }`}
>
  <ul className="px-4 py-3 space-y-1">
    <li>
      <NavLink
        to="/"
        end
        onClick={handleClose}
        className="block px-4 py-2 rounded hover:bg-gray-50"
      >
        Inicio
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/producto"
        onClick={handleClose}
        className="block px-4 py-2 rounded hover:bg-gray-50"
      >
        Productos
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/contacto"
        onClick={handleClose}
        className="block px-4 py-2 rounded hover:bg-gray-50"
      >
        Contacto
      </NavLink>
    </li>

    <li className="mt-2 pt-2 border-t border-gray-200 flex gap-2">
      {!isAuthenticated && (
        <>
          <NavLink
            to="/login"
            onClick={handleClose}
            className="flex-1 text-center px-4 py-2 rounded border border-indigo-600 bg-black text-white hover:bg-transparent hover:text-indigo-600"
          >
            Ingresar
          </NavLink>
          <NavLink
            to="/registrarse"
            onClick={handleClose}
            className="flex-1 text-center px-4 py-2 rounded border border-indigo-600 bg-black text-white hover:bg-transparent hover:text-indigo-600"
          >
            Registrarse
          </NavLink>
        </>
      )}
      {isAuthenticated && (
        <button
          type="button"
          onClick={() => {
            logout();
            handleClose();
          }}
          className="flex-1 text-center px-4 py-2 rounded border border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
        >
          Cerrar sesión
        </button>
      )}
    </li>
  </ul>
</nav>

{/* 🔹 ZONA DERECHA MOBILE: HAMBURGUESA + CARRITO (dropdown) */}
<div className="flex items-center gap-2 lg:hidden">
  {/* 1️⃣ Botón hamburguesa (izquierda) */}
  <button
    type="button"
    onClick={handleClick}
    aria-controls="mobile-menu"
    aria-expanded={isOpen}
    className="p-2 rounded-md border border-gray-200 bg-white text-gray-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={
          isOpen
            ? "M6 18L18 6M6 6l12 12" // icono X cuando está abierto
            : "M4 6h16M4 12h16M4 18h16" // 3 rayas cuando está cerrado
        }
      />
    </svg>
  </button>

  {/* 2️⃣ Carrito con dropdown (derecha del menú hamburguesa) */}
  <div className="relative" ref={cartMobileRef}>
    <button
      type="button"
      onClick={() => setCardOpen((v) => !v)}
      aria-haspopup="menu"
      aria-expanded={cardOpen}
      aria-controls="cart-menu-mobile"
      className="inline-flex items-center justify-center rounded-full border border-indigo-600 bg-black p-2 text-white hover:bg-transparent hover:text-indigo-600"
    >
      <img
        src={logo_carrito}
        alt="Carrito"
        className="w-5 h-5 object-contain"
      />
    </button>

    {cardOpen && (
      <div
        id="cart-menu-mobile"
        role="menu"
        className="absolute right-0 mt-2 w-80 rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 z-50"
      >
        <ShoppingCard onClose={() => setCardOpen(false)} />
      </div>
    )}
  </div>
</div>
</div>
</header>
    )
}
