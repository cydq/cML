import { ReactNode } from "react";

export function Syscription(props: { children?: ReactNode }) {
  return <span className="syscription">{props.children}</span>;
}
