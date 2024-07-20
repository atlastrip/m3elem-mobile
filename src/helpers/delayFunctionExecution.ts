export function delayFunctionExecution(func: () => void, delaySeconds: number) {
  const timeoutId = setTimeout(() => {
    func();
  }, delaySeconds * 1000);

  return () => clearTimeout(timeoutId);
}