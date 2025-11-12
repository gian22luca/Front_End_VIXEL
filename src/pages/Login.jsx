import { LoginForm } from '../components/LoginForm';

export function Login() {
  
  return (
    <section className=" bg-gray-900 text-gray-900 border-25 border-gray-900">
      <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
        <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-white">
          <span className="block mb-2 text-violet-600">Ingreso</span>
          <h1 className="text-5xl font-extrabold">Vixel</h1>

          <LoginForm
            
          />
        </div>

        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?auto=format&fit=crop&w=1908&q=80"
          alt=""
          className="object-cover w-full rounded-md xl:col-span-3 bg-gray-200"
        />
      </div>
    </section>
  );
}
