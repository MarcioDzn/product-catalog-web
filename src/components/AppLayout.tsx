import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
    return (
        // 1. flex e flex-col resolvem o colapso de margens
        <div className="flex min-h-screen flex-col">
            <Navbar />

            {/* 2. flex-1 faz o main expandir e empurrar o fundo pro final da tela */}
            <main className="flex-1 w-full">
                <section className="mx-auto w-full max-w-7xl px-4 py-4">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}