/// <reference path="./global.d.ts" />

import "./inject_api";

import { init } from "./main";

// https://file.garden/Y5_jdq2IF2n_McHn/corru%20modding/swupMod.js
function overwriteSwup() {
  swup._handlers.contentReplaced = [
    async () => {
      oldPage = page;

      await cML.delay(100);

      eval(document.querySelector("#PageData")?.innerHTML ?? "void 0");
      page.onLoaded();

      await cML.waitForLoad();
      change("lastload", Date.now());

      await cML.addResources(["https://cml.snowy.cafe/cModLoader.js"]);
    },
  ];
}

cML.waitForLoad().then(overwriteSwup).then(init);
