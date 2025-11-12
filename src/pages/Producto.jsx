import { ProductCard } from '../components/ProductCard'
import productos from '../data/productos'

export function Producto(){
    return (
        <section className="pb-40">
            {/* HERO */}
            <header className="relative">
                <div
                className="h-[380px] sm:h-[440px] bg-cover bg-center"
                style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/002/207/821/small/dark-blue-modern-technology-background-free-vector.jpg')" }}
                aria-hidden="true"
                ></div>
                <div className="pointer-events-none absolute inset-0 bg-slate-900/70" aria-hidden="true"></div>

                <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-5xl px-4 text-center">
                    <h1 className="text-4xl font-semibold sm:text-6xl text-white">Productos</h1>
                    <p className="mx-auto mt-3 max-w-2xl text-slate-300">
                    Explora nuestra variedad de productos diseñados para satisfacer tus necesidades.
                    </p>
                </div>
                </div>
            </header>
            <div className='flex-container flex-col justify-items-center'>
                <section className='flex flex-col justify-center items-center text-black my-10 w-8/12 text-center gap-3'>
                    <h2 className='text-3xl font-bold'>Listado de productos</h2>
                    <p>En esta sección, encontrarás una amplia variedad de productos diseñados para satisfacer tus necesidades.</p>
                </section>
                <section className='grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center w-8/12'>
                    {productos.map(producto => (
                        <ProductCard key={producto.id} 
                            id={producto.id}
                            image={producto.image}
                            name={producto.name}
                            description={producto.description}
                            cost={producto.cost}
                        />
                    ))
                    }
                </section>            
            </div>
        </section>
    )
}