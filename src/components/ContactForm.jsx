export function ContactForm() {
    return (
        <article className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-800/60 bg-slate-800/60 p-6 shadow-xl backdrop-blur text-white ">
            <form className="grid gap-6" action="#" method="post" noValidate>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first_name" className="mb-2 block text-sm">Nombre *</label>
                        <input id="first_name" name="first_name" type="text" placeholder="Bonnie"
                            className="block w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="mb-2 block text-sm">Apellido *</label>
                        <input id="last_name" name="last_name" type="text" placeholder="Green"
                            className="block w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500" />
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm">Email *</label>
                        <input id="email" name="email" type="email" placeholder="name@email.com"
                            className="block w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="mb-2 block text-sm">Celular</label>
                        <input id="phone" name="phone" type="tel" placeholder="+12 345 6789"
                            className="block w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500" />
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="mb-2 block text-sm">Mensaje</label>
                    <textarea id="message" name="message" rows="5" placeholder="Escribe tu mensaje..."
                        className="block w-full resize-y rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"></textarea>
                </div>        
                <div>
                    <button 
                        type="button"
                        className="inline-flex items-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={() => {
                                alert('Flujo  todavía no implementado 😅');
                            }}
                        >
                        Enviar mensaje
                    </button>
                </div>
            </form>
        </article>
    )
}