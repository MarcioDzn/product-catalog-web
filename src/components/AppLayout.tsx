import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

export default function AppLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 w-full">
                <section className="mx-auto w-full max-w-7xl px-4 py-4">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}