export async function addResources(
  locations: string[],
  timeout = 50,
): Promise<void> {
  globalThis.addResources(locations);
  return waitForLoad(timeout);
}

export async function waitForLoad(timeout = 50): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(function load() {
      if (env.loading) return setTimeout(load, timeout);

      resolve();
    }, timeout * 4);
  });
}

export async function delay(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function getPage() {
  return document.body.getAttribute("page");
}
