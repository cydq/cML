/// <reference path="./global.d.ts" />

import "./init/api.js";

import { initModIndex } from "./init/mod_index.js";
import { initMods } from "./init/mods.js";
import { injectMenu } from "./ui/ui.js";
import { initStore } from "./init/stores.js";

(async function init() {
  if (cML.__meta__.loaded) {
    return console.log("[cML] Already loaded.. Skipping initialization");
  }

  // Initialize storage
  initStore();

  // Initialize mod index
  await initModIndex();

  // Initialize mods
  await initMods();

  // Inject settings menu
  injectMenu();

  // Enable mods
  await cML.registry.emit("enable");

  // Overwrite swup
  overwriteSwup();

  // Save load flag
  cML.__meta__.loaded = true;

  // Load mods
  await cML.registry.emit("load");
})();

function overwriteSwup() {
  swup._handlers.contentReplaced = [
    async () => {
      oldPage = page;

      await cML.registry.emit("unload");

      await cML.delay(100);

      eval(document.querySelector("#PageData")?.innerHTML ?? "void 0");
      page.onLoaded();

      await cML.waitForLoad();
      change("lastload", Date.now());

      await cML.registry.emit("load");
    },
  ];
}
