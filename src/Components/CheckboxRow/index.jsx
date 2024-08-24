import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";

const CheckboxRow = ({ label, state, setState }) => (
  <div className="row">
    <label>{label}</label>
    {state.map((checked, index) => (
      <Checkbox
        key={index}
        checked={checked}
        onChange={() =>
          setState((prev) => prev.map((v, i) => (i === index ? !v : v)))
        }
      />
    ))}
  </div>
);

// Definindo as prop-types para o componente CheckboxRow
CheckboxRow.propTypes = {
  label: PropTypes.string.isRequired,
  state: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setState: PropTypes.func.isRequired,
};

export default CheckboxRow;
