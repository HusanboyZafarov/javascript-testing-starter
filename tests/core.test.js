import { it, expect, describe, beforeEach } from 'vitest';
import {
  calculateDiscount,
  canDrive,
  createProduct,
  fetchData,
  getCoupons,
  isPriceInRange,
  isStrongPassword,
  isValidUsername,
  Stack,
  validateUserInput
} from '../src/core';

// Exercise: Writing good assertions
describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons();

    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should return an array with valid coupon codes ', () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy();
    });
  });

  it('should return an array of valid discounts', () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThanOrEqual(1);
    });
  });
});

// Lesson: Positive and negative testing
describe('calculateDiscount', () => {
  it('should return discounted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  it('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 20)).toMatch(/invalid/i);
  });

  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
});

// Exercise: Positive and negative testing
describe('validateUserInput', () => {
  it('should return success if no errors', () => {
    expect(validateUserInput('safir', 20)).toMatch(/success/i);
  });

  it('should return an error if username is non-string', () => {
    expect(validateUserInput(12121, 20)).toMatch(/invalid/i);
  });

  it('should return an error if username is less than 3 chars', () => {
    expect(validateUserInput('us', 20)).toMatch(/invalid/i);
  });

  it('should return ar error if username is longer than 255 chars', () => {
    expect(validateUserInput('A'.repeat(256), 20)).toMatch(/invalid/i);
  });

  it('should return an error if age is non-string', () => {
    expect(validateUserInput('safir', '20')).toMatch(/invalid/i);
  });

  it('should return ar error if age is less than 18', () => {
    expect(validateUserInput('safir', 16)).toMatch(/invalid/i);
  });

  it('should return ar error if age is greater than 100', () => {
    expect(validateUserInput('safir', 101)).toMatch(/invalid/i);
  });

  it('should return ar error if both username and age are invalid', () => {
    expect(validateUserInput('', 0)).toMatch(/invalid username/i);
    expect(validateUserInput('', 0)).toMatch(/invalid age/i);
  });
});

// Lesson: Boundary testing && Parametrized Tests
describe('isPriceInRange', () => {
  it.each([
    { scenario: 'price < min', price: -10, result: false },
    { scenario: 'price = min', price: 0, result: true },
    { scenario: 'price between min and max', price: 50, result: true },
    { scenario: 'price = max', price: 100, result: true },
    { scenario: 'price > max', price: 200, result: false }
  ])('should return $result when $scenario', ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });
});

// Exercise: Boundary testing
describe('isValidUsername', () => {
  const minLength = 5;
  const maxLength = 15;

  it('should return false if username is too short', () => {
    expect(isValidUsername('a'.repeat(minLength - 1))).toBe(false);
  });

  it('should return false if username is too long', () => {
    expect(isValidUsername('a'.repeat(maxLength + 1))).toBe(false);
  });

  it('should return true if username is at min or max length', () => {
    expect(isValidUsername('a'.repeat(minLength))).toBe(true);
    expect(isValidUsername('a'.repeat(maxLength))).toBe(true);
  });

  it('should return true if username is within the length constraint', () => {
    expect(isValidUsername('a'.repeat(minLength + 1))).toBe(true);
    expect(isValidUsername('a'.repeat(maxLength - 1))).toBe(true);
  });

  it('should return false for invalid input types', () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});

// Exercise: Boundary testing
describe('canDrive', () => {
  it('should return error for invalid country code', () => {
    expect(canDrive(20, 'UZ')).toMatch(/invalid/i);
    expect(canDrive(0, 'US')).toMatch(/invalid/i);
  });

  it.each([
    { age: 15, country: 'US', result: false },
    { age: 16, country: 'US', result: true },
    { age: 17, country: 'US', result: true },
    { age: 16, country: 'UK', result: false },
    { age: 17, country: 'UK', result: true },
    { age: 18, country: 'UK', result: true }
  ])('should return $result for $age, $country', ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });
});

// Lesson: Testing asynchronous code
describe('fetchData', () => {
  it('should return a promise that will resolve to an array of numbers', async () => {
    const result = await fetchData();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});

// Lesson: Setup and teardown
describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('push should add an item to the stack', () => {
    stack.push(1);

    expect(stack.size()).toBe(1);
  });

  it('pop should remove and return top item from the stack', () => {
    stack.push(1);
    stack.push(2);

    const poppedItem = stack.pop();

    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });

  it('pop should throw an error if stack is empty', () => {
    expect(() => stack.pop()).toThrowError(/empty/i);
  });

  it('peek should return top item from the stack', () => {
    stack.push(1);
    stack.push(2);

    const peekedItem = stack.peek();

    expect(peekedItem).toBe(2);
    expect(stack.size()).toBe(2);
  });

  it('peek should throw an error if stack is empty', () => {
    expect(() => stack.peek()).toThrowError(/empty/i);
  });

  it('should empty return true if stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it('should empty return false if stack is not empty', () => {
    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  it('size should return a number of items in the stack', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.size()).toBe(2);
  });

  it('clear should remove all items from the stack', () => {
    stack.push(1);
    stack.push(2);

    stack.clear();

    expect(stack.size()).toBe(0);
  });
});

// Exercise: createProduct
describe('createProduct', () => {
  it('should return success if both name and price is given', () => {
    const product = {
      name: 'Soap',
      price: 1
    };

    const result = createProduct(product);

    expect(result.success).toBe(true);
    expect(result).toHaveProperty('message');
    expect(result.message).toMatch(/success/i);
  });

  it('should handle an error if name is not given', () => {
    const product = {
      name: '',
      price: 1
    };

    const result = createProduct(product);

    expect(result.success).toBe(false);
    expect(result.error).toHaveProperty('code');
    expect(result.error).toHaveProperty('message');
    expect(result.error.code).toMatch(/invalid/i);
    expect(result.error.message).toMatch(/miss/i);
  });

  it('should handle an error if price is equal or less than 0', () => {
    const product = {
      name: 'Soap',
      price: 0
    };

    const result = createProduct(product);

    expect(result.success).toBe(false);
    expect(result.error).toHaveProperty('code');
    expect(result.error).toHaveProperty('message');
    expect(result.error.code).toMatch(/invalid/i);
    expect(result.error.message).toMatch(/miss/i);
  });
});

// Exercise: isStrongPassword
describe('isStrongPassword', () => {
  it.each([
    {
      scenario: 'password is less than 8 characters',
      password: 'A'.repeat(7),
      result: false
    },
    {
      scenario: 'password is not contains uppercase letter',
      password: 'a'.repeat(9),
      result: false
    },
    {
      scenario: 'password is not contains lowercase letter',
      password: 'A'.repeat(9),
      result: false
    },
    {
      scenario: 'password is not contains any digit number',
      password: 'HusanboyZafarov',
      result: false
    },
    {
      scenario: 'password is has all criterias',
      password: 'Aa1'.repeat(3),
      result: true
    }
  ])('should return $result when $scenario', ({ password, result }) => {
    expect(isStrongPassword(password)).toBe(result);
  });
});
