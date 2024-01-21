export function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatNumber(numero: number, small = true) {
  if (small === false) {
    return numero.toLocaleString('pt-BR');
  }

  return numero.toLocaleString('pt-BR', {
    notation: 'compact',
    compactDisplay: 'long',
    maximumFractionDigits: 1,
  });
}
