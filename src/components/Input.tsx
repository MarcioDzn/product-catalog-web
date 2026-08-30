import { twMerge } from "tailwind-merge"

type Props = {
    id?: string
    value: string
    placeholder: string
    onChange: (value: string) => void
    className?: string
    onBlur?: () => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function Input({ id, value, placeholder, onChange, className, onBlur, onKeyDown }: Props) {
    return (
        <input
            id={id}
            className={twMerge(
                "w-full pr-18 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder-gray-500 focus:border-black [&::-webkit-search-cancel-button]:appearance-none",
                className
            )}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        />
    )
}