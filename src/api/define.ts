import { registry, LocalStore, Store } from ".";

export interface Mod {
  name: string;

  opt: ModOptions;

  options: Store;
  data: Store;

  enable(): void;
  disable(): void;
}

export interface ModOptions {
  name: string;
  autoRegister?: boolean;

  options?: {
    [key: string]: {
      type: "check" | "input";
      default?: any;
      name?: string;
      description?: string;
    };
  };

  entry?: {
    enable?: (mod: Mod) => void;
    disable?: (mod: Mod) => void;
  };
}

export function define(init: ModOptions | (() => ModOptions)): Mod {
  const opt = typeof init === "function" ? init() : init;

  if (!opt.name) throw new Error("[cML#define] Mod name is required");

  const mod: Mod = {
    name: opt.name,

    opt,

    options: LocalStore.create(`cml.${opt.name}.options`),
    data: LocalStore.create(`cml.${opt.name}.data`),

    enable: () => opt.entry?.enable?.(mod),
    disable: () => opt.entry?.disable?.(mod),
  };

  if (opt.options) {
    for (const key of Object.keys(opt.options)) {
      const option = opt.options[key];
      if (!mod.options.has(key)) mod.options.set(key, option.default);
    }
  }

  if (opt.autoRegister !== false) registry.register(mod);

  return mod;
}
