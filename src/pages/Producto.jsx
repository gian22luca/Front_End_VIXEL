import { ProductCard } from '../components/ProductCard'
import { useEffect, useState } from 'react'
import { getProductos } from '../services/productoApi'

const BASE_IMG_URL = 'http://localhost:8000/'
export function Producto(){
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
        <section className="pb-40">
        {/* HERO: dejá acá exactamente el mismo código que ya tenías */}
        {/* ... */}

        <div className="flex-container flex-col justify-items-center">
            <section className="flex flex-col justify-center items-center text-black my-10 w-8/12 text-center gap-3">
            <h2 className="text-3xl font-bold">Listado de productos</h2>
            <p>
                En esta sección, encontrarás una amplia variedad de productos diseñados para
                satisfacer tus necesidades.
            </p>
            </section>

            {/* Mensajes de carga / error */}
            {loading && (
            <p className="text-white text-center my-4">Cargando productos...</p>
            )}

            {error && (
            <p className="text-red-500 text-center my-4">
                {error}
            </p>
            )}

            {/* Grid solo cuando ya cargó */}
            {!loading && !error && (
            <section className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center w-8/12">
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
            </section>
            )}
        </div>
        </section>
    )
    }







