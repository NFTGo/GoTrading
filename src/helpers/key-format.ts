export function camel(data: any): any {
  if (typeof data != 'object' || !data) return data;
  if (Array.isArray(data)) {
    return data.map((item) => camel(item));
  }

  const newData: any = {};
  for (let key in data) {
    let newKey = key.replace(/_([a-z])/g, (p, m) => m.toUpperCase());
    newData[newKey] = camel(data[key]);
  }
  return newData;
}

export function underline(data: any): any {
  if (typeof data != 'object' || !data) return data;
  if (Array.isArray(data)) {
    return data.map((item) => underline(item));
  }

  const newData: any = {};
  for (let key in data) {
    let newKey = key.replace(/([A-Z])/g, (p, m) => `_${m.toLowerCase()}`);
    newData[newKey] = underline(data[key]);
  }
  return newData;
}
