import { data } from "../store/data";
import { index } from "../store/mod_index";
import { registry } from "../api";

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
