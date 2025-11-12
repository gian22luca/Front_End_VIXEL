import { useState, useEffect, useRef } from "react"
import { NavLink, Link } from "react-router-dom";
import logo_vixel from  "../assets/favicon-32x32.png";
import logo_carrito from  "../assets/shoppingcart.ico";
import { ShoppingCard } from './ShoppingCard'; 
import { useAuth } from '../contexts/AuthContext';






export function Header(){
  const [isOpen, setIsOpen] = useState(false);     // menú mobile
  const [cardOpen, setCardOpen] = useState(false); // ⬅️ estado del dropdown
  const [scrolled, setScrolled] = useState(false);
  const cartRef = useRef(null);                    // ⬅️ para click afuera

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // cerrar el dropdown al click fuera o ESC
  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCardOpen(false);
      }
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
    setIsOpen(!isOpen);        
  }



    return (
       <header className="fixed top-0 inset-x-0 z-50 m-0 bg-white text-gray-50">
	<div className="container mx-auto flex h-16 justify-between px-4">
    <a href="/" aria-label="Volver al inicio" className="flex items-center p-2">
      <img
        src={logo_vixel}     
        alt="Vixel"
        className="w-8 h-8 object-contain"
      /><span className="text-xl sm:text-2xl md:text-3xl font-bold leading-none tracking-tight">
        ixel
      </span>
    </a>
		<ul className="items-stretch hidden space-x-3 lg:flex">
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
      to="/servicios"
      className={({ isActive }) =>
        "flex items-center px-4 -mb-1 border-b-2 " +
        (isActive ? "border-violet-600 text-violet-600" : "border-transparent")
      }
    >
      Servicios
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
		<div className="items-center flex-shrink-0 hidden lg:flex gap-3">   
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
    >      Ingresar 
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
    >      Registrarse 
    </NavLink>
    
    {/* === CARRITO con DROPDOWN === */}
          <div className="relative" ref={cartRef}>
            {/* mejor usar button; si insistís con NavLink, hacé preventDefault en onClick */}
            <button
              type="button"
              onClick={() => setCardOpen(v => !v)}
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
                {/* Contenido del dropdown: usá tu componente */}
                <ShoppingCard />
              </div>
            )}
         
        </div>

		</div>
 



    <nav
    id="mobile-menu"
    className={`lg:hidden absolute top-16 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-md ${
      isOpen ? "block" : "hidden"
    }`}
  >
    <ul className="px-4 py-3 space-y-1">
      <li>
        <NavLink to="/" end className="block px-4 py-2 rounded hover:bg-gray-50">
          Inicio
        </NavLink>
      </li>
      <li>
        <NavLink to="/producto" className="block px-4 py-2 rounded hover:bg-gray-50">
          Productos
        </NavLink>
      </li>
      <li>
        <NavLink to="/servicios" className="block px-4 py-2 rounded hover:bg-gray-50">
          Servicios
        </NavLink>
      </li>
      <li>
        <NavLink to="/contacto" className="block px-4 py-2 rounded hover:bg-gray-50">
          Contacto
        </NavLink>
      </li>

      <li className="mt-2 pt-2 border-t border-gray-200 flex gap-2">
        <NavLink
          to="/login"
          className="flex-1 text-center px-4 py-2 rounded border border-indigo-600 bg-black text-white hover:bg-transparent hover:text-indigo-600"
        >
          Ingresar
        </NavLink>
        <NavLink
          to="/registrarse"
          className="flex-1 text-center px-4 py-2 rounded border border-indigo-600 bg-black text-white hover:bg-transparent hover:text-indigo-600"
        >
          Registrarse
        </NavLink>
         <NavLink
          to="/shoppingcard"
          className="flex-1 text-center px-0.4 py-2 rounded border border-indigo-600 bg-black text-white hover:bg-transparent hover:text-indigo-600"
        ><img
        src={logo_carrito}     
        alt="Vixel"
        className="w-5 h-5 object-contain mx-auto"
      />
        </NavLink>
      </li>
    </ul>
  </nav>
		<button type="button" onClick={handleClick}  aria-controls="mobile-menu" aria-expanded={isOpen} className="p-4 lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>
</header>    
    )
}