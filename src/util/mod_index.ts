import { data } from "../store/data";
import { index } from "../store/mod_index";

export async function checkIndex() {
  if (index.version === INDEX_VERSION) return;

  console.log("[cML] Index is outdated!");

  await fetchIndex();

  const newVersion = index.version;
  if (newVersion === INDEX_VERSION) return;

  throw new Error(
    `Updated index is still outdated! Expected ${INDEX_VERSION}, got ${newVersion}... Is cML outdated?`,
  );
}

export async function fetchIndex() {
  const indexLocation = data().indexUrl ?? INDEX_URL;

  const res = await fetch(indexLocation);
  if (!res.ok) throw new Error("[cML] Failed to fetch index");

  writeIndex(await res.json());
}

export function writeIndex(json: any) {
  index.version = json["version"];
  index.hash = json["hash"];
  index.mods = json["mods"];
}
