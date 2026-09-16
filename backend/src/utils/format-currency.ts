// Convert naira to kobo when saving
export function convertToCents(amount: number) {
  return Math.round(amount * 100);
}

// Convert kobo to naira when retrieving
//convertFromCents
export function convertToDollarUnit(amount: number) {
  return amount / 100;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}
