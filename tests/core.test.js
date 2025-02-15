import { beforeEach, describe, expect, it } from "vitest";
import {
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  Stack,
  validateUserInput,
} from "../src/core";

describe("getCoupons", () => {
  it("should return an array of coupons", () => {
    const coupons = getCoupons();

    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBe(2);
  });

  it("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy();
    });
  });

  it("should return an array with valid discounts ", () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe("calculateDiscount", () => {
  it("should discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("should handle non-numeric price", () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle negative price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle non-string discount", () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount(10, "INVALID")).toBe(10);
  });
});

describe("validateUserInput", () => {
  it("should return success message", () => {
    const result = validateUserInput("safir", 18);

    expect(result).toMatch(/success/i);
  });

  it("should return invalid if username length is less than 3", () => {
    const result = validateUserInput("aa", 18);

    expect(result).toMatch(/invalid/i);
  });

  it("should return invalid if username length is greater than 255", () => {
    const result = validateUserInput("A".repeat(256), 18);

    expect(result).toMatch(/invalid/i);
  });

  it("should return invalid if username is non-string", () => {
    const result = validateUserInput(12345, 18);

    expect(result).toMatch(/invalid/i);
  });

  it("should return invalid if age is less than 18", () => {
    const result = validateUserInput("safir", 16);

    expect(result).toMatch(/invalid/i);
  });

  it("should return invalid if age is greater than 100", () => {
    const result = validateUserInput("safir", 101);

    expect(result).toMatch(/invalid/i);
  });

  it("should return invalid if age is non-numeric", () => {
    const result = validateUserInput("safir", "18");

    expect(result).toMatch(/invalid/i);
  });

  it("should return success message if error length is equal to 0", () => {
    const result = validateUserInput("safir", 18);

    expect(result).toMatch(/success/i);
  });

  it("should return invalid messages if error length is greater than 0", () => {
    const result = validateUserInput("safir", 18);

    expect(result).toMatch(/success/i);
  });

  it("should return an error if both username and age is invalid", () => {
    const result = validateUserInput("", 0);

    expect(result).toMatch(/invalid username/i);
    expect(result).toMatch(/invalid age/i);
  });
});

describe("isPriceInRange", () => {
  it.each([
    { scenario: "price < min", price: -10, result: false },
    { scenario: "price = min", price: 1, result: true },
    { scenario: "price between min and max", price: 50, result: true },
    { scenario: "price = max", price: 100, result: true },
    { scenario: "price > max", price: 200, result: false },
  ])("should return $result when $scenario", ({ price, result }) => {
    expect(isPriceInRange(price, 1, 100)).toBe(result);
  });
});

describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;

  it("should return false if username is too short", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBe(false);
  });

  it("should return false if username is too long", () => {
    expect(isValidUsername("a".repeat(maxLength + 1))).toBe(false);
  });

  it("should return true if username is at the min or max", () => {
    expect(isValidUsername("a".repeat(minLength))).toBe(true);
    expect(isValidUsername("a".repeat(maxLength))).toBe(true);
  });

  it("should return true if username is within the length constraints", () => {
    expect(isValidUsername("a".repeat(maxLength - 1))).toBe(true);
    expect(isValidUsername("a".repeat(minLength + 1))).toBe(true);
  });

  it("should return false for invalid input types", () => {
    expect(isValidUsername(null)).toBe(false);
  });

  it("should return false for invalid input types", () => {
    expect(isValidUsername()).toBe(false);
  });
});

describe("canDrive", () => {
  it.each([
    { age: 15, country: "US", result: false },
    { age: 16, country: "US", result: true },
    { age: 17, country: "US", result: true },
    { age: 16, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
    { age: 18, country: "UK", result: true },
  ])("should return $result for $age, $country", ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });

  it("should return error for invalid country code", () => {
    expect(canDrive(20, "FR")).toMatch(/invalid/i);
  });
});

describe("fetchData", () => {
  it("should return a promise that will resolve to an array of numbers", async () => {
    try {
      const result = await fetchData();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toHaveProperty("reason");
      expect(error.reason).toMatch(/fail/i);
    }
  });
});

describe("Stack", () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it("push should add an item to the stack", () => {
    stack.push(1);

    expect(stack.size()).toBe(1);
  });

  it("pop should remove and return the top item from the stack", () => {
    stack.push(1);
    stack.push(2);

    const poppedItem = stack.pop();

    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });

  it("pop should throw an error if stack is empty", () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });

  it("peek should return the top item from the stack without removing it", () => {
    stack.push(1);
    stack.push(2);

    const peekedItem = stack.peek();

    expect(peekedItem).toBe(2);
    expect(stack.size()).toBe(2);
  });

  it("peek should throw an error if stack is empty", () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });

  it("isEmpty should return true if stack is empty", () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it("isEmpty should return false if stack is not empty", () => {
    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  it("size should return the number of items in the stack", () => {
    stack.push(1);
    stack.push(2);

    expect(stack.size()).toBe(2);
  });

  it("clear should remove all items from the stack", () => {
    stack.push(1);
    stack.push(2);

    stack.clear();

    expect(stack.size()).toBe(0);
  });
});
