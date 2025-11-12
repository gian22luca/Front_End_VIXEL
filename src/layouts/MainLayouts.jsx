import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Outlet } from 'react-router-dom'

export function MainLayout(){
    return (
         <div className="min-h-screen flex flex-col ">
            <Header/>
            <main className="flex-1 pt-20 md:pt-24">
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}