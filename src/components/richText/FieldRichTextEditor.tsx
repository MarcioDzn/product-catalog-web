import RichTextEditor from "./RichTextEditor"

type Props = {
    id: string
    label: string
    value: string,
    onChange: (value: string) => void
}

export default function FieldRichTextEditor({ id, label, value, onChange }: Props) {
    return (
        <div className="flex flex-col gap-2">
            <label 
                htmlFor={id} 
                className="text-sm font-medium text-gray-700">
                    {label}
                
            </label>

            <RichTextEditor 
                value={value}
                onChange={onChange}
            />
        </div>
    )
}