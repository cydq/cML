import { define } from "./define.js";
import { Mod } from "./mod.js";

export const defineSimple = (
  name: string,
  condition: string,
  handler: (mod: Mod) => void,
) => define(name, (m) => m.on(condition, (mod) => handler(mod)));
