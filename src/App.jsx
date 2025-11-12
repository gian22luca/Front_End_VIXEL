import {Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { Producto } from './pages/Producto'
import { ProductoDetails } from './pages/ProductoDetails'
import { MainLayout } from './layouts/MainLayouts'
import { Servicios } from './pages/Servicios'
import { Carrito } from './pages/Carrito'
import { ShoppingCard } from './components/ShoppingCard'
import { Login } from './pages/Login'
import { Registrarse } from './pages/Registrarse'
import ProtectedRoute from './components/ProtectedRoute'



import './App.css'

function App() {
  
  return (
    <Routes>
        {/* RUTAS ANIDADAS */}
        <Route element={<MainLayout />}>
          <Route index element={<Home/>}/> {/* es lo mismo que to='/' */}
          <Route path='contacto' element={<Contact />}/>
          <Route path='login' element={<Login />}/>
          <Route path='registrarse' element={<Registrarse />}/>
          <Route path='servicios' element={<Servicios />}/>
          <Route path='carrito' element={<Carrito />}/>
          <Route path='shoppingcard' element={<ShoppingCard />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Registrarse />} />
          {/* Privadas */ }
         <Route element={<ProtectedRoute/>}>
             <Route path='producto' element={<Producto/>}/>
             <Route path='producto/:productoId' element={<ProductoDetails/>}/>
         </Route>
        </Route>

        
        {/* Públicas fuera del layout (si querés, podés meterlas dentro también) */}
       

        <Route path='*' element={<h1 className='text-white text-8xl'>404 Not Found</h1>}/>
      
    </Routes>    
  )
}

export default App
