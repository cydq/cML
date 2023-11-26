import { Mod } from ".";

export interface Registry {
  register(mod: Mod): void;
  getMod(name: string): Mod | undefined;
  getMods(): Mod[];
}

function createRegistry(): Registry {
  const mods = new Map<string, Mod>();

  return {
    register(mod: Mod) {
      mods.set(mod.name, mod);
    },

    getMod(name: string) {
      return mods.get(name);
    },

    getMods() {
      return [...mods.values()];
    },
  };
}
export const registry = createRegistry();
