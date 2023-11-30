import "./Octahedron.css";

export function Octahedron(props: { onClick?: () => void }) {
  return (
    <div className="octahedron" style={{}} onClick={props.onClick}>
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

      <div className="solid">
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
