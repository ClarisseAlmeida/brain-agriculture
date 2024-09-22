import Label from "../label";
import "./index.scss";

const CustomInput = ({ ...props }) => (
    <>
        <Label label={props.label} />
        <input
            className={`customInput ${props.error ? "customInput--error" : ""}`}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            onBlur={props.onBlur}
            disabled={props.disabled}
        />
        {props.error && <span className="customInput-errorMessage">{props.error}</span>}
    </>
)


export default CustomInput;