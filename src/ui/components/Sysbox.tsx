import type { ReactNode } from "react";
import { Syscription } from "./Syscription";

export function Sysbox(props: {
  title: string;
  description?: string;
  children?: ReactNode;
  warning?: boolean;
}) {
  return (
    <div className={"sysbox" + (props.warning ? " warning" : "")}>
      <h3>{props.title}</h3>

      {props.description && <Syscription>{props.description}</Syscription>}

      {props.children}
    </div>
  );
}
