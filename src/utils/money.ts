export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d,-]/g, "").replace(",", ".");
  const parsed = Number(cleaned);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function maskCurrencyInput(raw: string): { text: string; numeric: number } {
  const digitsOnly = raw.replace(/\D/g, "");
  const cents = digitsOnly ? parseInt(digitsOnly, 10) : 0;
  const numeric = cents / 100;
  return { text: formatCurrency(numeric), numeric };
}