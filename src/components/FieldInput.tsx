import Input from "./Input"

type Props = {
    id: string
    label: string
    value: string,
    placeholder: string,
    mode?: "integer" | "float" | "currency"
    onChange: (value: string) => void
}

export default function FieldInput({ 
    id, 
    label, 
    value, 
    placeholder, 
    mode, 
    onChange 
}: Props) {
    return (
        <div className="flex flex-col gap-2">
            <label 
                htmlFor={id} 
                className="text-sm font-medium text-gray-700">
                    {label}
                
            </label>

            
            <Input 
                id={id} 
                value={value} 
                placeholder={placeholder} 
                mode={mode}
                onChange={onChange}
                className="rounded-lg px-2 py-2 border border-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            />
        </div>
    )
}