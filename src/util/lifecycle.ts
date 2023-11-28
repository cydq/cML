import { data } from "../store/data";
import { index } from "../store/mod_index";
import { Mod, registry } from "../api";

export async function installMod(name: string) {
  const info = index.get(name);
  if (!info) return;

  await cML.addResources([info.entry]);

  const mod = registry.getMod(name);
  if (!mod) return;

  mod.emit("install");

  data.set("enabled", [...data.get("enabled", []), name]);
}

export function uninstallMod(mod: Mod) {
  mod.emit("unload");
  mod.emit("disable");
  mod.emit("uninstall");

  data.set(
    "enabled",
    data.get("enabled", []).filter((s) => s !== mod.name),
  );
}
