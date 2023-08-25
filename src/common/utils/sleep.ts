export function sleep(timeout: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, timeout);
  });
}
