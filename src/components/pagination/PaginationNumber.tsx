type Props = {
    pageNumber: number
    selected: boolean
    onSelect: (pageNumber: number) => void
}

export default function PaginationNumber({ pageNumber, selected, onSelect }: Props) {
    return (
        <div 
            onClick={() => onSelect(pageNumber)}
            className={`flex justify-center items-center w-8 h-8 cursor-pointer rounded-md border border-gray-300 ${selected ? "bg-black" : "bg-white"}`}>
            <span 
                className={`text-sm  ${selected ? "text-white" : "text-gray-800"}`}>
                {pageNumber}
            </span>
        </div>
    )
}