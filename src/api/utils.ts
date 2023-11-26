export async function addResources(
  locations: string[],
  timeout = 100,
): Promise<void> {
  globalThis.addResources(locations);
  return waitForLoad(timeout);
}

export async function waitForLoad(timeout = 100): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(function load() {
      if (env.loading) return setTimeout(load, timeout);

      resolve();
    }, timeout);
  });
}

export async function delay(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
