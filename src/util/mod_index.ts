import { data } from "../store/data";
import { __hash__, __version__, index } from "../store/mod_index";

export async function checkIndex() {
  if (index.get(__version__) === INDEX_VERSION) return;

  console.log("[cML] Index is outdated!");

  await fetchIndex();

  const newVersion = index.get(__version__);
  if (newVersion === INDEX_VERSION) return;

  throw new Error(
    `Updated index is still outdated! Expected ${INDEX_VERSION}, got ${newVersion}... Is cML outdated?`,
  );
}

export async function fetchIndex() {
  const indexLocation = data.get("indexUrl") ?? INDEX_URL;

  const res = await fetch(indexLocation);
  if (!res.ok) throw new Error("[cML] Failed to fetch index");

  writeIndex(await res.json());
}

export function writeIndex(json: any) {
  index.transaction((s) => {
    s.clear();

    s.set(__version__, json["version"]);
    s.set(__hash__, json["hash"]);

    for (const name of Object.keys(json["mods"])) {
      s.set(name, json["mods"][name]);
    }
  });
}
