import { render } from "preact";
import { Menu } from "./menus/Menu.js";

export function injectMenu() {
  const root = document.createElement("div");
  root.id = "cml-sysmenu-root";

  const container = document.querySelector("#system-menu");
  if (!container) throw new Error("[cML] Failed to find system menu container");

  container.insertBefore(
    root,
    container.children.item(container.children.length - 1),
  );

  render(Menu(), root);
}
