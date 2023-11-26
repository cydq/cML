// ==UserScript==
// @name        cModLoader
// @namespace   corru.observer
// @match       *://*.corru.observer/*
// @grant       unsafeWindow
// @version     0.1.1
// @author      cydq
// @run-at      document-idle
// @description Loads the latest version of cModLoader
// ==/UserScript==

const script = document.createElement('script')
script.src = "https://cml.snowy.cafe/cModLoader.js"
unsafeWindow.content.appendChild(script)
