import { __hash__, __version__, data, index, injectMenu } from "./internal";

async function inject() {
  const registry = cML.registry;

  const enabled = data.get("enabled", []);

  console.log(`[cML] Loading ${enabled.length} mods: ${enabled.join(", ")}`);

  const enabledMods = enabled
    .map((name) => [name, index.get(name)] as const)
    .filter(([name, mod]) => {
      if (!mod)
        console.warn(`[cML] Failed to enable ${name}: Mod not found in index`);
      return !!mod;
    });

  await cML.addResources(enabledMods.map(([, mod]) => mod!.entry));

  let loaded = 0;

  for (const name of enabled) {
    const mod = registry.getMod(name);

    if (!mod) {
      console.warn(`[cML] Failed to enable ${name}: Mod not found in registry`);
      continue;
    }

    mod.enable();
    loaded++;
  }

  console.log(`[cML] Loaded ${loaded} mods!`);

  const files = data.get("files", []);

  console.log(`[cML] Injecting ${files} files...`);

  await cML.addResources(files);

  console.log("[cML] Injected!");
}

async function fetchIndex() {
  console.log("[cML] Fetching mod index...");

  const indexLocation =
    data.get("indexUrl") ?? "https://cml.snowy.cafe/index.json";

  const res = await fetch(indexLocation);
  if (!res.ok) throw new Error("Failed to fetch index");

  const json = await res.json();

  index.transaction((s) => {
    s.clear();

    s.set(__version__, json["version"]);
    s.set(__hash__, json["hash"]);

    for (const name of Object.keys(json["mods"])) {
      s.set(name, json["mods"][name]);
    }
  });

  console.log("[cML] Fetched mod index!");
}

export async function init() {
  const VERSION = 1;

  if (index.get(__version__) !== VERSION) {
    console.log("[cML] Index is outdated!");

    await fetchIndex();

    if (index.get(__version__) !== VERSION) {
      throw new Error(
        `Updated index is still outdated! Expected ${VERSION}, got ${index.get(
          __version__,
        )}... Is cML outdated?`,
      );
    }
  }

  await inject();

  injectMenu();
}
