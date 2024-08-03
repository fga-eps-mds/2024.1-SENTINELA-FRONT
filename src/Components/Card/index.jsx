import PropTypes from "prop-types";
import "./index.css";
import sindpolLogo from "../../assets/sindpol-logo.png";
import sentinelaLogo from "../../assets/sentinela-logo.png";

export default function Card({ children, className }) {
  return (
    <div className="area-card">
      <div className={`card ${className}`}>
        <img className="logo" src={sindpolLogo} alt="Sindpol Logo" />
        <img className="sentinela" src={sentinelaLogo} alt="Sentinela Logo" />
        {children}
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
