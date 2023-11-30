import { data } from "../store/data.js";
import { index } from "../store/mod_index.js";
import { registry } from "../api/index.js";

export async function initMods(): Promise<void> {
  const enabled = data().enabled || [];

  // Load resources
  await cML.addResources(
    enabled
      .map((name: any) => {
        const mod = index.mods[name];

        if (!mod)
          console.warn(
            `[cML] Failed to enable ${name}: Mod not found in index`,
          );

        return mod?.entry;
      })
      .filter((mod: any) => !!mod) as string[],
  );

  window.onbeforeunload = () => {
    registry.emit("unload");
    registry.emit("disable");
  };
}
