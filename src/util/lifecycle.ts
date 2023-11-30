import { data } from "../store/data.js";
import { index } from "../store/mod_index.js";
import { Mod, registry } from "../api/index.js";

export async function installMod(name: string) {
  const info = index.mods[name];
  if (!info) return;

  await cML.addResources([info.entry]);

  const mod = registry.getMod(name);
  if (!mod) return;

  mod.emit("install");

  data().enabled = [...(data().enabled || []), name];
}

export function uninstallMod(mod: Mod) {
  mod.emit("unload");
  mod.emit("disable");
  mod.emit("uninstall");

  data().enabled = data().enabled.filter((s) => s !== mod.name);
}
