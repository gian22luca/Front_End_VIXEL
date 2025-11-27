import instagram from '../assets/instagram.png'
import gmail from '../assets/gmail.png'
import { NavLink, Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-black text-white">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col p-4 md:p-8 lg:flex-row">
        <ul className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
          <li><NavLink
              to="/"
              end
              className={({ isActive }) =>
                "flex items-center px-4 -mb-1 border-b-2 " +
                (isActive ? "border-violet-600 text-violet-600" : "border-transparent")
              }
            >
              Inicio
            </NavLink></li>
          <li><NavLink
              to="/producto"
              className={({ isActive }) =>
                "flex items-center px-4 -mb-1 border-b-2 " +
                (isActive ? "border-violet-600 text-violet-600" : "border-transparent")
              }
            >
              Productos
            </NavLink></li>
       
          <li><NavLink
              to="/contacto"
              className={({ isActive }) =>
                "flex items-center px-4 -mb-1 border-b-2 " +
                (isActive ? "border-violet-600 text-violet-600" : "border-transparent")
              }
            >
              Contacto
            </NavLink></li>
        </ul>

        <div className="flex items-center justify-center gap-4 pt-6 lg:pt-0">
          <a href="https://www.instagram.com/" title="Instagram" className="flex items-center justify-center w-10 h-10">
            <img src={instagram} alt="Instagram" className="w-8 h-8 object-contain" />
          </a>
          <a href="https://mail.google.com/" title="Gmail" className="flex items-center justify-center w-10 h-10">
            <img src={gmail} alt="Gmail" className="w-8 h-8 object-contain" />
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 pt-0 text-sm">
		<span className="dark:text-gray-600">© Copyright Vixel. All Rights Reserved.</span>
	</div>
    </footer>
  )
}
