import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Props = {
    children?: React.ReactNode;
};

export default function Navbar({ children }: Props) {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <>
            <nav className="sticky top-0 z-50 w-full min-h-20 border-b border-gray-300 bg-white py-3 md:py-0 flex items-center">
                <div className="w-full h-full flex flex-wrap md:flex-nowrap justify-between items-center gap-4 px-8">

                    <div>
                        <span className="font-extrabold text-xl">
                            CatalogWeb
                        </span>
                    </div>

                    <div className="order-last md:order-none w-full md:flex-1">
                        {children}
                    </div>

                    <div className="flex justify-between items-center">
                        {isAuthenticated && user ? (
                            <div
                                className="flex justify-center items-center rounded-lg bg-lime-400 w-8 h-8 cursor-pointer"
                                onClick={logout}
                            >
                                <span>
                                    {user.name[0].toUpperCase()}
                                </span>
                            </div>
                        ) : (
                            <a
                                href="/admin"
                                className="text-sm font-medium"
                            >
                                Entrar
                            </a>
                        )}
                    </div>

                </div>
            </nav>

            <Outlet />
        </>
    );
}
