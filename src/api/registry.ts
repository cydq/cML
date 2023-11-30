import { proxyMap } from "valtio/utils";
import { Mod } from "./index.js";

export interface Registry {
  readonly mods: Map<string, Mod>;
  readonly size: number;

  register(mod: Mod): void;
  getMod(name: string): Mod | undefined;
  getMods(): Mod[];

  emit(event: "load" | "unload" | "enable" | "disable"): Promise<number>;
}

function createRegistry(): Registry {
  const mods = proxyMap<string, Mod>();

  return {
    mods,

    register(mod: Mod) {
      mods.set(mod.name, mod);
    },

    getMod(name: string) {
      return mods.get(name);
    },

    getMods() {
      return [...mods.values()];
    },

    get size() {
      return mods.size;
    },

    async emit(event) {
      let loaded = 0;

      const allMods = [...mods.values()].sort(
        (a, b) =>
          b.data.get("load-priority", 0) - a.data.get("load-priority", 0),
      );

      for (const mod of allMods) {
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
