import { registry } from "../../api";
import { data, index } from "..";

interface SysboxOptions {
  title: string;
  description?: string;
  buttons?: { title: string; action: () => void }[];
}

function createSysbox(opts: SysboxOptions) {
  const box = document.createElement("div");
  box.className = "sysbox";

  const titleElement = document.createElement("h3");
  titleElement.innerText = opts.title;
  box.appendChild(titleElement);

  if (opts.description) {
    const descriptionElement = document.createElement("span");
    descriptionElement.className = "syscription";
    descriptionElement.innerText = opts.description;
    box.appendChild(descriptionElement);
  }

  if (opts.buttons && opts.buttons.length > 0) {
    const buttonsElement = document.createElement("div");
    buttonsElement.className = "buttons";

    for (const button of opts.buttons) {
      const buttonElement = document.createElement("span");
      buttonElement.className = "button";
      buttonElement.innerText = button.title;
      buttonElement.onclick = button.action;
      buttonsElement.appendChild(buttonElement);
    }

    box.appendChild(buttonsElement);
  }

  return box;
}

interface MenuOptions {
  title: string;
  id: string;
}

function createMenu(opts: MenuOptions) {
  const menu = document.createElement("details");
  menu.id = opts.id + "-select";
  menu.className = "sysblock center";

  menu.setAttribute("menu", opts.id);

  const summary = document.createElement("summary");
  summary.innerText = opts.title;
  menu.appendChild(summary);

  return menu;
}

export function injectMenu() {
  const menu = createMenu({ title: "cML", id: "cml" });

  menu.appendChild(
    createSysbox({
      title: "cML",
      description:
        "Hello! This is the cML menu. If you see this, cML is working correctly (hopefully).",
    }),
  );

  menu.appendChild(
    createSysbox({
      title: "Mod Index",
      buttons: [
        {
          title: "Refresh Index",
          action: () => {
            index.clear();
            location.reload();
          },
        },
      ],
    }),
  );

  const mods = createMenu({ title: "cML ENABLED MODS", id: "cml-mods" });

  for (const mod of registry.getMods()) {
    mods.appendChild(
      createSysbox({
        title: `${mod.name} ${mod.version} - ${mod.author}`,
        description: mod.description,
        buttons: [
          {
            title: "Disable",
            action: () => {
              const rest =
                data.get("enabled")?.filter((s) => s !== mod.name) ?? [];
              data.set("enabled", rest);
              location.reload();
            },
          },
        ],
      }),
    );
  }

  const available = createMenu({ title: "cML MOD INDEX", id: "cml-mods" });

  for (const name of index.keys()) {
    if (typeof name !== "string") continue;
    if (data.get("enabled")?.includes(name as string)) continue;

    const mod = index.get(name);
    if (!mod) continue;

    available.appendChild(
      createSysbox({
        title: `${name} ${mod.version} - ${mod.author}`,
        description: mod.description,
        buttons: [
          {
            title: "Add",
            action: () => {
              data.set("enabled", [...data.get("enabled", []), name]);
              location.reload();
            },
          },
        ],
      }),
    );
  }

  document.querySelector("#system-menu")?.appendChild(menu);
  document.querySelector("#system-menu")?.appendChild(mods);
  document.querySelector("#system-menu")?.appendChild(available);
}
