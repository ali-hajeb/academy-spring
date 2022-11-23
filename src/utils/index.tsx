export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function debounce(fn: Function, delay: number) {
  let timerId: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}
