import { isInvalidParam } from '../src/helpers/is-invalid-param';

describe('Test isEmptyParam helper method', () => {
  it('number is valid', () => {
    expect(isInvalidParam(Infinity)).toBe(false);
    expect(isInvalidParam(-Infinity)).toBe(false);
    expect(isInvalidParam(Number.MAX_SAFE_INTEGER)).toBe(false);
    expect(isInvalidParam(Number.MIN_SAFE_INTEGER)).toBe(false);
    expect(isInvalidParam(0)).toBe(false);
    expect(isInvalidParam(9999)).toBe(false);
  });

  it('empty string is not valid', () => {
    expect(isInvalidParam('')).toBe(true);
  });

  it('any boolean value is invalid', () => {
    expect(isInvalidParam(true)).toBe(true);
    expect(isInvalidParam(false)).toBe(true);
  });

  it('empty object is invalid', () => {
    expect(isInvalidParam({})).toBe(true);
  });

  it('empty array is invalid', () => {
    expect(isInvalidParam([])).toBe(true);
  });

  it('null or undefined or their stringify are both invalid', () => {
    expect(isInvalidParam(undefined)).toBe(true);
    expect(isInvalidParam('undefined')).toBe(true);
    expect(isInvalidParam(null)).toBe(true);
    expect(isInvalidParam('null')).toBe(true);
  });
});
