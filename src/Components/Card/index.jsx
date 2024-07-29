import PropTypes from "prop-types";
import "./index.css";

export default function Card({ children, className }) {
  return (
    <div className="area-card">
      <div className={`card ${className}`}>
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
        {children}
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
