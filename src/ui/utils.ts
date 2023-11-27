interface SysboxOptions {
  title: string;
  description?: string;
  buttons?: { title: string; action: () => void }[][];
  intermediate?: any[];
}

export function createSysbox(opts: SysboxOptions) {
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

export function createMenu(opts: MenuOptions) {
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

export function createInput(opts: InputOptions) {
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
