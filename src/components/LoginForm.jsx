import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'



export function LoginForm(){
    // Obtenemos la función login del contexto de autenticación
  const { login } = useAuth();
  // Hook para navegar programáticamente
  const navigate = useNavigate();
  // Hook para obtener información de la ubicación actual (útil para redirecciones)
  const location = useLocation();

  // Estado para los campos del formulario
  const [form, setForm] = useState({ username: "", password: "" });
  // Estado para mostrar errores de autenticación
  const [error, setError] = useState("");

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const res = await login(form); // Intenta iniciar sesión con los datos ingresados
      if (res.ok) {
        //Nos permitia hacer una redirección en caso de exito en el login
        const from = "/Producto"; // Redirige a la página de productos después del login
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Error de autenticación')
      }
    })()
  };

  const handle = (e) => {
    // e es el evento del cambio, obtenemos name y value del target (input) que lo disparó    
    const { name, value } = e.target
    // actualizamos el estado del formulario, manteniendo los valores anteriores
    setForm(f => ({ ...f, [name]: value }))
  }


  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-8 text-left">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm">Email</label>
          <input
            id="email" name="username" type="text" placeholder="usuario@vixel.com" value={form.username} onChange={handle}
            className="w-full px-2 py-2 rounded-md border border-gray-300 bg-white text-gray-900
                       placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="password" className="text-sm">Contraseña</label>
            <a href="#" className="text-xs hover:underline text-violet-600">¿Olvidaste tu contraseña?</a>
          </div>
          <input
            id="password" name="password" type="password" placeholder="•••••" value={form.password} onChange={handle}
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900
                       placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <button
          type="submit"
          className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-white hover:bg-violet-500
                     focus:outline-none focus:ring-2 focus:ring-violet-500 "
        >
          Ingresar
        </button>

        <p className="px-6 text-sm text-center text-gray-700">
          ¿No tenés cuenta?
          <a href="/registrarse" className="ml-1 hover:underline text-violet-600">Registrarse</a>.
        </p>
      </div>
    </form>
  );
}

