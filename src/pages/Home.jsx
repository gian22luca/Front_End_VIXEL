
import { ProductCard } from '../components/ProductCard'
import { ContactForm } from '../components/ContactForm'
import { useEffect, useState } from 'react'
import { getProductos } from '../services/productoApi'

const BASE_IMG_URL = 'http://localhost:8000/'



export function Home(){
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function cargarProductos(){
            try{
                setLoading(true)
                const resp= await getProductos()
                setProductos(Array.isArray(resp?.data) ? resp.data : [])
            } catch(err){
                console.error(err)
                setError(err.message || 'Error al cargar los productos')
            } finally{
                setLoading(false)
            }
        }
        cargarProductos()
    }, [])

    return (
        
        <div className="bg-slate-800 text-slate-100 ">
            {/* HERO SECTION */}
           <section className="bg-white dark:text-gray-800">
	<div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
		<h1 className="text-4xl font-bold leading-none sm:text-5xl">Soluciones
			<span className="dark:text-violet-600"> a medida</span> para tu negocio
		</h1>
		<p className="px-8 mt-8 mb-12 text-lg">Fabricacion e instalacion de Pantallas LED a medida</p>
		<div className="flex flex-wrap justify-center">
            <a href="#contact">
			<button className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Contactanos</button>
			</a>
		</div>
	</div>
</section>
           
            {/* PROD */}
            <section className="mx-auto max-w-7xl px-4 py-16 bg-white">
                <div className="mx-auto max-w-3xl text-center b">
                    <p className="text-black text-xs font-semibold tracking-widest uppercase">Nuestros productos</p>
                    <h3 className="mt-3 text-3xl font-semibold sm:text-4xl text-black">Productos destacados</h3>
                    <p className="mt-4 text-black">
                        En esta sección, encontrarás los productos más populares y mejor valorados por nuestra comunidad.                        
                    </p>
                </div>

               

                {/* Grid de piezas */}
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-black">
                    {productos.map((producto) => (
                    <ProductCard
                        key={producto.id_producto}
                        id={producto.id_producto}
                        name={producto.nombre}
                        description={producto.descripcion}
                        cost={`$${producto.precio}`}
                        image={BASE_IMG_URL +producto.archivo} 
                    />
                    ))}
                </div>
            </section>
            {/* SECCION CONTACTO */}
            <section id="contact" className="mx-auto max-w-7xl px-4 py-16 bg-white">
                <div className="mx-auto max-w-3xl text-center pb-5">
                    <p className="text-black text-xs font-semibold tracking-widest uppercase">Contáctanos</p>
                    <h3 className="mt-3 text-3xl font-semibold sm:text-4xl text-black">¿Cómo Podemos Ayudarte?</h3>
                    <p className="mt-4 text-black">
                        Por cualquier consulta, no dudes en contactarnos.
                    </p>
                </div>
            
                <ContactForm />
            </section>
        </div>
            
    )
}