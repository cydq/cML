import { registry } from "../../api";
import { __hash__, __version__, data, index } from "..";

interface SysboxOptions {
  title: string;
  description?: string;
  buttons?: { title: string; action: () => void }[][];
  intermediate?: any[];
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

  if (opts.intermediate) {
    opts.intermediate.forEach((e) => box.appendChild(e));
  }

  if (opts.buttons && opts.buttons.length > 0) {
    for (const row of opts.buttons) {
      const buttonsElement = document.createElement("div");
      buttonsElement.className = "buttons";

      for (const button of row) {
        const buttonElement = document.createElement("span");
        buttonElement.className = "button";
        buttonElement.innerText = button.title;
        buttonElement.onclick = button.action;
        buttonsElement.appendChild(buttonElement);
      }

      box.appendChild(buttonsElement);
    }
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

interface InputOptions {
  id: string;
  data?: string;
  placeholder: string;
}

function createInput(opts: InputOptions) {
  const input = document.createElement("input");
  input.type = "textarea";
  input.id = opts.id;
  input.placeholder = opts.placeholder;

  if (opts.data) {
    input.value = opts.data;
  }

  input.style.textAlign = "center";
  input.style.border = "1px solid var(--neutral-color)";
  input.style.background = "var(--bright-color)";
  input.style.padding = "0.5em";
  input.style.marginTop = "0.5em";
  input.style.fontFamily = "barcodetext, sans-serif";
  input.style.lineHeight = "1em";
  input.style.fontSize = "2em";
  input.style.display = "block";
  input.style.width = "100%";

  return input;
}

export function injectMenu() {
  const menu = createMenu({ title: "cModLoader", id: "cml" });

  menu.appendChild(
    createSysbox({
      title: "Info",
      description:
        `cModLoader ${__VERSION__} by cydq\n\n` + `swup by ripplesplash`,
    }),
  );

  menu.appendChild(
    createSysbox({
      title: "Mod Index",
      description:
        `There are ${[...index.keys()].length - 2} mod(s) in the index.\n` +
        `The index was last updated on ${new Date(index.get(__hash__) ?? 0)
          .toISOString()
          .slice(0, 10)}`,
      buttons: [
        [
          {
            title: "Refresh Index",
            action: () => {
              index.clear();
              location.reload();
            },
          },
        ],
      ],
    }),
  );

  menu.appendChild(
    createSysbox({
      title: "Reset",
      description: `Reset all cModLoder data and refresh the page. Optionally, reset mod data as well.`,
      buttons: [
        [
          {
            title: "Reset CML Data",
            action: () => {
              index.clear();
              data.clear();
              location.reload();
            },
          },
          {
            title: "Reset All Data",
            action: () => {
              for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                if (key?.startsWith("cml")) {
                  localStorage.removeItem(key);
                }
              }

              location.reload();
            },
          },
        ],
      ],
    }),
  );

  menu.appendChild(
    createSysbox({
      title: "Mod Index URL",
      description: "Only change this if you know what you're doing!",
      intermediate: [
        createInput({
          id: "index-url",
          placeholder: "https://cml.snowy.cafe/index.json",
          data: data.get("indexUrl"),
        }),
        createInput({
          id: "index-data",
          placeholder: "{ ... json ... }",
        }),
      ],
      buttons: [
        [
          {
            title: "Reset Default",
            action: () => {
              data.remove("indexUrl");
              index.clear();
              location.reload();
            },
          },
          {
            title: "Save Data",
            action: () => {
              const json = JSON.parse(
                (document.querySelector("#index-data") as HTMLInputElement)
                  .value,
              );

              index.transaction((s) => {
                s.clear();

                s.set(__version__, json["version"]);
                s.set(__hash__, json["hash"]);

                for (const name of Object.keys(json["mods"])) {
                  s.set(name, json["mods"][name]);
                }
              });

              location.reload();
            },
          },
          {
            title: "Save URL",
            action: () => {
              data.set(
                "indexUrl",
                (document.querySelector("#index-url") as HTMLInputElement)
                  .value,
              );

              index.clear();
              location.reload();
            },
          },
        ],
      ],
    }),
  );

  const mods = createMenu({ title: "cML Enabled Mods", id: "cml-mods" });

  for (const mod of registry.getMods()) {
    const info = index.get(mod.name);

    if (!info) {
      console.warn(
        `[cML] Failed to find info for mod ${mod.name}. Is the index up to date?`,
      );
      continue;
    }

    mods.appendChild(
      createSysbox({
        title: `${mod.name} ${info.version} - ${info.author}`,
        description: info.description,
        buttons: [
          [
            {
              title: "Disable",
              action: () => {
                const rest =
                  data.get("enabled")?.filter((s) => s !== mod.name) ?? [];

                data.set("enabled", rest);
                location.reload();
              },
            },
            {
              title: "Revert",
              action: () => {
                for (const key of Object.keys(mod.opt.options as {})) {
                  const option = mod.opt.options?.[key];
                  if (!option) continue;
                  mod.options.set(key, option.default);
                }
              },
            },
            {
              title: "Reset Data",
              action: () => {
                mod.data.clear();
              },
            },
          ],
        ],
      }),
    );
  }

  const available = createMenu({ title: "cML Mod Index", id: "cml-mods" });

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
          [
            {
              title: "Add",
              action: () => {
                data.set("enabled", [...data.get("enabled", []), name]);
                location.reload();
              },
            },
          ],
        ],
      }),
    );
  }

  document.querySelector("#system-menu")?.appendChild(menu);
  document.querySelector("#system-menu")?.appendChild(mods);
  document.querySelector("#system-menu")?.appendChild(available);
}
