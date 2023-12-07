export async function addResources(
  locations: string[],
  timeout = 50,
): Promise<void> {
  globalThis.addResources(locations);
  return waitForLoad(timeout);
}

export const waitForLoad = async (timeout = 50): Promise<void> =>
  new Promise((resolve) => {
    const load = (): unknown =>
      env.loading ? setTimeout(load, timeout) : resolve();
    setTimeout(load, timeout * 4);
  });

export const delay = async (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const getPage = () => document.body.getAttribute("page");
