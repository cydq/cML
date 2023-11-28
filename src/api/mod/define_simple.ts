import { define } from "./define";
import { Mod } from "./mod";

export const defineSimple = (
  name: string,
  condition: string,
  handler: (mod: Mod) => void,
) => define(name, (m) => m.on(condition, (mod) => handler(mod)));
