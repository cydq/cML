import { checkIndex } from "../util/mod_index";

export async function initModIndex() {
  console.log("[cML] Initializing mod index...");

  await checkIndex();

  console.log("[cML] Index is up to date!");
}
