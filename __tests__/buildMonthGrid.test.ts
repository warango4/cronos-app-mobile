import {buildMonthGrid} from '../src/utils/calendar';

test('septiembre 2026 empieza en martes y tiene 30 días en 5 semanas', () => {
  const weeks = buildMonthGrid(2026, 8); // month is 0-indexed: 8 = September
  const flat = weeks.flat();

  expect(flat.filter(d => d !== null)).toHaveLength(30);
  expect(weeks[0][2]).toBe(1); // Sept 1, 2026 falls on a Tuesday (column index 2)
  expect(weeks[weeks.length - 1].includes(30)).toBe(true);
});

test('cada semana tiene 7 columnas', () => {
  const weeks = buildMonthGrid(2026, 8);
  weeks.forEach(week => expect(week).toHaveLength(7));
});
