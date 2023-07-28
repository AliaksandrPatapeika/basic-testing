import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const values = ['a', 'b', 'c'];

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const expected = {
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: {
            next: null,
            value: null,
          },
        },
      },
    };

    const result = generateLinkedList(values);

    expect(result).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });
});
