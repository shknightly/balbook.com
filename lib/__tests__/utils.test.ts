import { describe, it, expect } from 'vitest';
import { validateBDPhone } from '@/lib/utils';

describe('Bangladesh Phone Number Validation', () => {
  it('should return true for valid phone numbers', () => {
    expect(validateBDPhone('+8801712345678')).toBe(true);
    expect(validateBDPhone('8801987654321')).toBe(true);
    expect(validateBDPhone('01512345678')).toBe(false); // Does not start with 1
    expect(validateBDPhone('1712345678')).toBe(true);
  });

  it('should return false for invalid phone numbers', () => {
    expect(validateBDPhone('12345')).toBe(false);
    expect(validateBDPhone('+88012345678')).toBe(false); // Invalid operator
    expect(validateBDPhone('017123456789')).toBe(false); // Too long
    expect(validateBDPhone('+880171234567')).toBe(false); // Too short
  });
});