const main = require('../main');
const {formatDisplay} = main;

describe('formatDisplay', () => {
  test('exists', () => {
    expect(formatDisplay).toBeDefined();
  });
  
  test('should return a value', () => {
    expect(formatDisplay(30)).toBeTruthy();
  });

  test('should format a small value correctly', () => {
    expect(formatDisplay(30)).toEqual('00:30');
  });

  test('should format a medium value correctly', () => {
    expect(formatDisplay(95)).toEqual('01:35');
  });

  test('should format a large value correctly', () => {
    expect(formatDisplay(1500)).toEqual('25:00');
  });
});
