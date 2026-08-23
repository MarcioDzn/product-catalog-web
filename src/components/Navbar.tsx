import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useState } from "react";


export default function Navbar() {
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

    const handleSearch = (
        e: React.SubmitEvent<HTMLFormElement>, 
        search: string
    ) => {
        e.preventDefault()

        navigate(
            `/products?search=${encodeURIComponent(search)}`
        );
    }

    return (
        <>
            <nav className="sticky top-0 z-50 w-full h-20 border-b border-gray-300 bg-white">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-full flex max-w-2xl">
                        <SearchInput value={search} placeholder="Buscar produtos..." onChange={setSearch} handleSearch={handleSearch}/>
                    </div>
                </div>
            </nav> 
        </>
    )
}