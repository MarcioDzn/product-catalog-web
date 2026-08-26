import SelectButton from "../SelectButton"

type Props = {
    id: number
    value: string
    checked: boolean
    onChange: (checked: boolean) => void
}

export default function AccordionSelectionItem({
    id,
    value, 
    checked,
    onChange
}: Props) {
    return (
        <div className="flex items-center gap-2">
            <SelectButton
                checked={checked}
                onChange={onChange}
            />

            <span>{value}</span>
        </div>
    )
}