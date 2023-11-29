import { useSnapshot } from "valtio";
import { InfoBlock } from "./InfoBlock";
import { IndexBlock } from "./IndexBlock";
import { ModBlock } from "./ModBlock";
import { data } from "../../store/data";
import { registry } from "../../api";

export function Menu() {
  return (
    <>
      <InfoBlock />
      <ModsContainer />
      <IndexBlock />
    </>
  );
}

function ModsContainer() {
  const dat = useSnapshot(data());

  return dat.enabled
    .map(registry.getMod)
    .map((mod) => (mod ? <ModBlock mod={mod} /> : null));
}
