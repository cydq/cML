import "./Octahedron.css";

export function Octahedron(props: { clicks: number; onClick?: () => void }) {
  return (
    <div className="octahedron" onClick={props.onClick}>
      <div className="solid3">
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
      </div>

      <div className="solid2">
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
      </div>

      <div className={"solid" + (props.clicks >= 10 ? " devmode" : "")}>
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
        <div className="side" />
      </div>
    </div>
  );
}
