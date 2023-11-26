/// <reference path="./global.d.ts" />

import "./inject_api";

import { init } from "./main";

const MYSELF = "h";

// https://file.garden/Y5_jdq2IF2n_McHn/corru%20modding/swupMod.js
export function overwriteSwup() {
  swup._handlers.contentReplaced = [
    async () => {
      oldPage = page;

      await cML.delay(100);

      eval(document.querySelector("#PageData")?.innerHTML ?? "void 0");
      page.onLoaded();

      await cML.waitForLoad();
      change("lastload", Date.now());

      await cML.addResources([MYSELF]);

      // overwriteSwup()
      // await init()
    },
  ];
}

cML.waitForLoad().then(() => {
  // overwriteSwup()
  init();
});
