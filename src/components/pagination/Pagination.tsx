import PaginationNumber from "./PaginationNumber"
import PaginationArrow from "./PaginationArrow"

type Props = {
    pageQuantity: number
    maxVisiblePages: number
    currentPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({ pageQuantity, maxVisiblePages, currentPage, onPageChange }: Props) {
    const visiblePageQuantity = Math.min(
        pageQuantity,
        maxVisiblePages
    )

    const startPage = Math.max(
        1,
        Math.min(
            currentPage - Math.floor(maxVisiblePages / 2),
            pageQuantity - visiblePageQuantity + 1
        )
    )

    const endPage = startPage + visiblePageQuantity - 1

    const visiblePages = Array.from(
        { length: visiblePageQuantity },
        (_, index) => startPage + index
    )

    return (
        <div className="flex flex-row gap-2 w-fit">
            <PaginationArrow 
                direction="left" 
                currentPageNumber={currentPage} 
                isDisabled={currentPage === 1}
                onSelect={onPageChange}
            />
            {
                (startPage > 1 || pageQuantity === 0) &&
                <PaginationNumber
                    key={1}
                    pageNumber={1}
                    selected={currentPage === 1}
                    onSelect={onPageChange}
                />
            }

            {
                startPage > 1 &&
                <span>...</span>
            }

            {visiblePages.map((pageNumber) => (
                <PaginationNumber
                    key={pageNumber}
                    pageNumber={pageNumber}
                    selected={currentPage === pageNumber}
                    onSelect={onPageChange}
                />
            ))}

            {
                endPage < pageQuantity &&
                <>
                    <span>...</span>
                    <PaginationNumber
                        key={pageQuantity}
                        pageNumber={pageQuantity}
                        selected={currentPage === pageQuantity}
                        onSelect={onPageChange}
                    />
                </>
            }
            <PaginationArrow 
                direction="right" 
                currentPageNumber={currentPage} 
                isDisabled={currentPage === pageQuantity || pageQuantity === 0}
                onSelect={onPageChange}
            />
        </div>
    )
}