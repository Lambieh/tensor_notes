import "./Button.css";

export default function Button(props) {
  return (
    <button
      onClick={() => props.onFunction()}
      className={"general_button_styles " + props.className}
    >
      {props.name}
    </button>
  );
}
