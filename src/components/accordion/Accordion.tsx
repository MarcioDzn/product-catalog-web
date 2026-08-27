import { useState } from "react"
import AccordionSelectionItem from "./AccordionSelectionItem"

type Item = {
    id: number
    text: string
}

type Props = {
    title: string
    items: Item[]
    selectedItems: number[]
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    onChange: (id: number) => void
}

export default function Accordion({ 
    title, 
    items, 
    selectedItems, 
    isOpen,
    setIsOpen,
    onChange
}: Props) {
    const handleItemSelect = (itemId: number) => {
        onChange(itemId)
    }

    return (
        <div className="flex flex-col gap-2 items-start w-full">
            <div 
                className="flex justify-between items-center gap-2 w-full cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold">{title}</span>

                {
                    isOpen ? 
                    <div 
                        className="cursor-pointer"
                        
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-5"
                        >
                                <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="m4.5 15.75 7.5-7.5 7.5 7.5" 
                            />
                        </svg>
                    </div>
                    :
                    <div 
                        className="cursor-pointer"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-5"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="m19.5 8.25-7.5 7.5-7.5-7.5" 
                            />
                        </svg>
                    </div>
                }
            </div>

            {
                isOpen &&
                <div>
                    {
                        items.map((item) => (
                            <AccordionSelectionItem 
                                key={item.id}
                                id={item.id}
                                value={item.text}
                                checked={selectedItems.includes(item.id)}
                                onChange={handleItemSelect}
                            />
                        ))
                    }
                </div>
            }
        </div>
    )
}