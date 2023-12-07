const PREFIX = ['%c[cML]', 'color: #ff99ff; font-weight: bold'];

export function log(...args: any[]) {
  console.log(...PREFIX, ...args);
}

export function warn(...args: any[]) {
  console.warn(...PREFIX, ...args);
}

export function error(...args: any[]) {
  console.error(...PREFIX, ...args);
}
