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
  const change: any;
  const env: { loading: boolean };
  let oldPage: any;
  let page: any;

  function addResources(files: string[]): void;
}
