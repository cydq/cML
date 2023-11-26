import { registry, LocalStore, Store } from ".";

export interface Mod {
  name: string;
  version: string;
  description?: string;
  author?: string;

  options: Store;
  data: Store;

  enable(): void;
  disable(): void;
}

export interface ModOptions {
  autoRegister?: boolean;

  package: {
    name: string;
    version: string;

    description?: string;
    author?: string;
  };

  options?: {
    [key: string]: {
      type: "check" | "input" | "number" | "select";
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

  if (!opt.package.name) throw new Error("[cML#define] Mod name is required");

  if (!opt.package.version)
    throw new Error("[cML#define] Mod version is required");

  const mod: Mod = {
    ...opt.package,

    options: LocalStore.create(`cml.${opt.package.name}.options`),
    data: LocalStore.create(`cml.${opt.package.name}.options`),

    enable: () => opt.entry?.enable?.(mod),
    disable: () => opt.entry?.disable?.(mod),
  };

  if (opt.autoRegister !== false) registry.register(mod);

  return mod;
}
