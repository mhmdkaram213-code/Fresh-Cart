import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 py-4 px-4">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}