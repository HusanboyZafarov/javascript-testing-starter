import { describe, test, it, expect } from 'vitest';
import { calculateAverage, factorial, fizzBuzz, max } from '../src/intro';

describe('max', () => {
  it('should return the FIRST argument if it is GREATER', () => {
    expect(max(2, 1)).toBe(2);
  });

  it('should return the SECOND argument if it is GREATER', () => {
    expect(max(1, 2)).toBe(2);
  });

  it('should return the FIRST argument if arguments are EQUAL', () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe('fizzBuzz', () => {
  it('should return FizzBuzz if arg is devisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });

  it('should return the fizz if arg is only devisible by 3', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
  });

  it('should return the buzz if arg is only devisible by 5', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
  });

  it('should return StringV of argument if arg is not devisible 5 and 3', () => {
    expect(fizzBuzz(1)).toBe('1');
  });
});

describe('calculateAverage', () => {
  it('should return NaN if given an emplty array', () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it('should calculate the average of an Array with a single element', () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it('should calculate the average of an Array with two elements', () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  it('should calculate the average of an Array with three elements', () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });

  it('should calculate the average of an Array with four elements', () => {
    expect(calculateAverage([1, 2, 3, 4])).toBe(2.5);
  });
});

describe('factorial', () => {
  it('should return 1 if given 0', () => {
    expect(factorial(0)).toBe(1);
  });

  it('should return 1 if given 1', () => {
    expect(factorial(1)).toBe(1);
  });

  it('should return 2 if given 2', () => {
    expect(factorial(2)).toBe(2);
  });

  it('should return 6 if given 3', () => {
    expect(factorial(3)).toBe(6);
  });

  it('should return 24 if given 4', () => {
    expect(factorial(4)).toBe(24);
  });

  it('should return undefined if given a negative number', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
