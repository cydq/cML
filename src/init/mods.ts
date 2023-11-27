import { data } from "../store/data";
import { index } from "../store/mod_index";

export async function initMods(): Promise<void> {
  const enabled = data.get("enabled", []);

  // Load resources
  await cML.addResources(
    enabled
      .map((name) => {
        const mod = index.get(name);

        if (!mod)
          console.warn(
            `[cML#inject] Failed to enable ${name}: Mod not found in index`,
          );

        return mod?.entry;
      })
      .filter((mod) => !!mod) as string[],
  );
}
