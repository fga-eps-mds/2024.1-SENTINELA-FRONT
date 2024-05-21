import "./index.css";
import PropTypes from "prop-types";
import { SideButtonGroup } from "../../styles/global";

export default function SideBar({ buttons }) {

  return (
    <div className="side-bar">
      <img
        className="logo"
        src="src/assets/sindpol-logo.png"
        alt="Sindpol Logo"
      />
      <img
        className="sentinela"
        src="src/assets/sentinela-logo.png"
        alt="Sentinela Logo"
      />
      <div className="menu-lateral">
        <SideButtonGroup buttons={buttons}></SideButtonGroup>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  buttons: PropTypes.array.isRequired,
};
