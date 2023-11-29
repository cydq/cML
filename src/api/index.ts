import { proxy } from "valtio";

export * from "./mod/define";
export * from "./mod/mod";
export * from "./registry";
export * from "./store";
export * from "./util";

export const __meta__ = {
  version: VERSION,
  loaded: false,
  store: proxy({ data: {} as any }),
};
