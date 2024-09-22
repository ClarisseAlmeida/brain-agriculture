import { NavLink } from "react-router-dom";
import "./index.scss";
import Button from "../button";

const Header = () => (
  <div className="header">
    <div className="header-container">
      <h1>Brain Agriculture</h1>
      <div className="header-wrapper">
        <NavLink to="/">
          <Button text="Dashboard" />
        </NavLink>
        <NavLink to="/cadastrar/">
          <Button text="Novo produtor" />
        </NavLink>
      </div>
    </div>
  </div>
)

export default Header
