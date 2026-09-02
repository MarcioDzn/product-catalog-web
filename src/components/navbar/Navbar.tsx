import { Outlet, useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput";
import { useState, type ReactElement } from "react";
import type { User } from "../../types/Users";

type Props = {
    children?: React.ReactNode
}

export default function Navbar({ children }: Props) {
    const [user, setUser] = useState<User>({
        id: 1,
        name: "Fulano",
        email:"fulano@gmail.com",
        created_at: "19"
    })

    return (
        <>
            <nav className="sticky top-0 z-50 w-full h-20 border-b border-gray-300 bg-white">
                <div className="w-full h-full flex justify-between items-center px-8">
                    <div>
                        <span className="font-extrabold text-xl">
                            CatalogWeb
                        </span>
                    </div>

                    {children}

                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center rounded-lg bg-lime-400 w-8 h-8 cursor-pointer">
                            <span>
                                {user.name[0].toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            </nav> 

            <Outlet />
        </>
    )
}