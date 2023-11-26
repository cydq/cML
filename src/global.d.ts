import * as api from "./api";

declare global {
  /**
   * cModLoader API
   */
  const cML: typeof api;

  const swup: any;
  const change: any;
  const env: { loading: boolean };
  let oldPage: any;
  let page: any;

  function addResources(files: string[]): void;
}
