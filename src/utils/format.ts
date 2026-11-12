export function formatINR(amount: number): string {
  return '₹' + Number(amount).toLocaleString('en-IN');
}
