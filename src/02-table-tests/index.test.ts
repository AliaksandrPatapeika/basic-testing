import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 7, b: 2, action: Action.Multiply, expected: 14 },
  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 9, b: 2, action: Action.Multiply, expected: 18 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 11, b: 2, action: Action.Divide, expected: 5.5 },
  { a: 12, b: 2, action: Action.Divide, expected: 6 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform $action operation with $a and $b and return $expected',
    ({ action, a, b, expected }) => {
      const result = simpleCalculator({ action, a, b });
      expect(result).toBe(expected);
    },
  );

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: 'invalid' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '2', b: 3, action: Action.Add });
    expect(result).toBeNull();
  });
});
