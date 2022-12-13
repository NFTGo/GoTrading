export function isInvalidParam(param: unknown) {
  if (typeof param === 'number') {
    return false;
  }

  if (param === undefined || param == null || param === 'null' || param === 'undefined' || typeof param === 'boolean') {
    return true;
  }

  const contentStr = typeof param === 'string' ? param : JSON.stringify(param);

  return contentStr.length === 0 || contentStr === '{}' || contentStr === '[]';
}
