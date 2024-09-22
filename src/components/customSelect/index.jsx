import Label from "../label";
import "./index.scss";

const CustomSelect = ({ children, ...props }) => (
    <>
        <Label label={props.label} />
        <select 
            name={props.name} 
            value={props.value} 
            onChange={props.onChange} 
            className={`customSelect ${props.error ? "customSelect--error" : ""}`} 
            disabled={props.disabled}
        >
            <option>{props.placeholder}</option>
            {children}
        </select>
        {props.error && <span className="customSelect-errorMessage">{props.error}</span>}
    </>
)

export default CustomSelect;