import { Mod } from ".";

export interface Registry {
  register(mod: Mod): void;
  getMod(name: string): Mod | undefined;
  getMods(): Mod[];

  emit(event: "load" | "unload" | "enable" | "disable"): Promise<number>;
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

    async emit(event) {
      let loaded = 0;

      for (const mod of mods.values()) {
        try {
          await mod.emit(event);
          loaded++;
        } catch (e: unknown) {
          console.error(`[cML] Failed to load ${mod.name}:`, e);
        }
      }

      return loaded;
    },
  };
}
export const registry = createRegistry();
