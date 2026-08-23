type Props = {
    direction: "left" | "right"
    currentPageNumber: number
    isDisabled: boolean
    onSelect: (pageNumber: number) => void
}

export default function PaginationArrow({
    direction,
    currentPageNumber,
    isDisabled,
    onSelect
}: Props) {

    return (
        <div
            onClick={() => {
                if (isDisabled) return

                onSelect(
                    direction === "left"
                        ? currentPageNumber - 1
                        : currentPageNumber + 1
                )
            }}
            className={`flex justify-center items-center w-8 h-8 rounded-md border select-none
                ${
                    isDisabled
                        ? "cursor-not-allowed border-gray-200 bg-gray-100"
                        : "cursor-pointer border-gray-300 bg-white hover:bg-gray-50"
                }
            `}
        >
            <span
                className={`text-sm ${
                    isDisabled ? "text-gray-300" : "text-gray-800"
                }`}
            >
                {direction === "left" ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                )}
            </span>
        </div>
    )
}