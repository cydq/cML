import { checkIndex } from "../util/mod_index.js";

export async function initModIndex() {
  await checkIndex();

  cML.log("Mod index is up to date!");
}
