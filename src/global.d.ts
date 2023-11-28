import * as api from "./api";

// Declare global cML
declare global {
  const cML: typeof api;
}

// Build Constants
declare global {
  const VERSION: string;
  const INDEX_VERSION: number;
  const INDEX_URL: string;
}

// corru.observer globals
declare global {
  const swup: any;
  const env: { loading: boolean };
  const flags: any;
  let oldPage: any;
  let page: any;

  function addResources(files: string[]): void;
  function change(key: string, value: any): void;
  function check(key: string, value?: any): any | false;
}
