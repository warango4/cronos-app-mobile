import {nextHour, to24h} from '../src/utils/time';

test('convierte 12 h a 24 h incluyendo los casos borde de las 12', () => {
  expect(to24h(6, 30, 'AM')).toBe('06:30');
  expect(to24h(12, 0, 'AM')).toBe('00:00');
  expect(to24h(12, 5, 'PM')).toBe('12:05');
  expect(to24h(7, 45, 'PM')).toBe('19:45');
});

test('nextHour suma una hora, da la vuelta a medianoche y tolera texto inválido', () => {
  expect(nextHour('19:00')).toBe('20:00');
  expect(nextHour('23:30')).toBe('00:30');
  expect(nextHour('abc')).toBe('');
});
