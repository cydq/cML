const PREFIX = ["%c[cML]", "color: #ff99ff; font-weight: bold"];

export const log = (...args: any[]) => console.log(...PREFIX, ...args);

export const warn = (...args: any[]) => console.warn(...PREFIX, ...args);

export const error = (...args: any[]) => console.error(...PREFIX, ...args);
