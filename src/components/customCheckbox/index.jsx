import Label from "../label";
import "./index.scss";

const CustomCheckbox = ({ children }) => (
    <>
        <Label label="Culturas plantadas:" />
        <ul className="customCheckbox">
            {children}           
        </ul>
    </>
)

export default CustomCheckbox