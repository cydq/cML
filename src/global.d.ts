import * as api from "./api";

declare global {
  // Mod API
  const cML: typeof api;

  // Build Constants
  const __VERSION__: string;

  // Corru stuff
  const swup: any;
  const change: any;
  const env: { loading: boolean };
  let oldPage: any;
  let page: any;

  function addResources(files: string[]): void;
}
