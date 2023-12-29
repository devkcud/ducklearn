export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

export function formatNumber(numero: number, small = true) {
  if (!small) {
    return numero.toLocaleString('pt-BR');
  }

  if (numero < 1000) {
    return numero.toString();
  } else if (numero < 1000000) {
    return (numero / 1000).toFixed(1) + ' mil';
  } else if (numero < 1000000000) {
    const mill = (numero / 1000000).toFixed(1);
    if (mill === '1.0') {
      return (numero / 1000000).toFixed(1) + ' milhão';
    }

    return (numero / 1000000).toFixed(1) + ' milhões';
  } else {
    const bil = (numero / 1000000000).toFixed(1);

    if (bil === '1.0') {
      return (numero / 1000000000).toFixed(1) + ' bilhão';
    }
    return (numero / 1000000000).toFixed(1) + ' bilhões';
  }
}
