export function isEmpty(obj: unknown): boolean {
  if (typeof obj === 'number') {
    return false;
  }

  if (obj === undefined || obj == null || obj === 'null' || obj === 'undefined') {
    return true;
  }

  const contentStr = typeof obj === 'string' ? obj : JSON.stringify(obj);
  return contentStr.length === 0 || contentStr === '{}' || contentStr === '[]';
}

export function isJson(str: string): boolean {
  if (!str) {
    return false;
  }

  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
