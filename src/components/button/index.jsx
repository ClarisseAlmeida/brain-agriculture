import "./index.scss";

const Button = ({...props}) => (
    <button className={`button ${props.ghost  ? "button--ghost" : ""}`} onClick={props.onClick}>
        {props.text}
    </button>
)

export default Button