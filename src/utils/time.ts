export function to24h(hour: number, minute: number, meridiem: 'AM' | 'PM') {
  const h = (hour % 12) + (meridiem === 'PM' ? 12 : 0);
  return `${String(h).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

// Sugerencia para un nuevo horario: una hora después del último ('' si no es válido).
export function nextHour(time: string) {
  const [h, m] = time.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) {
    return '';
  }
  return `${String((h + 1) % 24).padStart(2, '0')}:${String(m).padStart(
    2,
    '0',
  )}`;
}
