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
