import { CSSProperties } from "react";

export function Button(props: {
  name: string;
  action: () => void;
  style?: CSSProperties;
}) {
  return (
    <span className="button" onClick={props.action} style={props.style}>
      {props.name}
    </span>
  );
}
