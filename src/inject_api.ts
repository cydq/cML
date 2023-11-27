import * as api from "./api";

if (!(globalThis as any).cML) {
  (globalThis as any).cML = api;
}
