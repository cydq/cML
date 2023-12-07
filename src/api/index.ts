import { proxy } from "valtio";

export * from "./mod/define.js";
export * from "./mod/mod.js";
export * from "./logger.js";
export * from "./registry.js";
export * from "./store.js";
export * from "./util.js";

export const __meta__ = {
  version: VERSION,
  loaded: false,
  store: proxy({ data: {} as any }),
};
