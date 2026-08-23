import { Plus } from "lucide-react"
import { useRef } from "react"

type Props = {
    description: string
    isDisabled: boolean
    onChange: (values: string[]) => void
}

export default function ImagePicker({ description, isDisabled, onChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (!files) return

        const readers = Array.from(files).map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader()

                reader.onload = () => {
                    resolve(reader.result as string)
                }

                reader.onerror = reject

                reader.readAsDataURL(file)
            })
        })

        Promise.all(readers).then(images => {
            onChange(images)
        })

        event.target.value = ""
    }

    return (
        <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col gap-2 items-center justify-center rounded-lg w-full h-full p-2 border border-dashed border-gray-400 cursor-pointer"
        >
            <Plus className="w-[30%] h-auto text-gray-400" />
            {
                description &&
                <span className="block text-sm text-gray-400 text-center">{description}</span>
            }
            

            <input 
                disabled={isDisabled}
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                multiple
                className="hidden" 
            />
        </div>
    )
}