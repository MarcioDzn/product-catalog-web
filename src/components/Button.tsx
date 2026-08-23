import type { MouseEventHandler } from "react"

type Props = {
    text: string
    type: "button" | "submit"
    onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ text, type, onClick }: Props) {
    return (
        <button 
            type={type}
            onClick={onClick}
            className="border border-transparent cursor-pointer bg-black py-2.5 px-4 font-medium text-white rounded-lg text-sm hover:bg-gray-700">
                {text}
        </button>
    )
}