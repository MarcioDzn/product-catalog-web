export type InputMaskMode = "integer" | "float" | "currency"

export function filterInteger(inputValue: string): string {
    return inputValue.replace(/\D/g, "")
}

export function filterFloat(inputValue: string, maxDecimals = 2): string {
    let clean = inputValue.replace(".", ",").replace(/[^0-9,]/g, "")

    const [intPart, ...rest] = clean.split(",")
    if (rest.length === 0) return intPart

    const decimalPart = rest.join("").slice(0, maxDecimals)
    return `${intPart},${decimalPart}`
}

export function filterCurrency(inputValue: string): string {
    const digits = inputValue.replace(/\D/g, "")
    if (!digits) return ""

    return (Number(digits) / 100).toFixed(2)
}

export function applyMask(mode: InputMaskMode | undefined, value: string): string {
    switch (mode) {
        case "integer":
            return filterInteger(value)
        case "float":
            return filterFloat(value)
        case "currency":
            return filterCurrency(value)
        default:
            return value
    }
}

export function getInputModeFor(mode: InputMaskMode | undefined): "numeric" | "decimal" | "text" {
    if (mode === "integer") return "numeric"
    if (mode === "float" || mode === "currency") return "decimal"
    return "text"
}