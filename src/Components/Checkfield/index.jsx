import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

// Estilize o container para simular o TextField com comportamento de highlight
const CustomContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 .7rem",
  backgroundColor: "#EAE3D7",
  borderRadius: "4px",
  borderBottom: `1px solid ${theme?.palette?.main || "#ccc"}`, // Fallback
  margin: ".7rem",
  fontFamily: '"Noto Sans", sans-serif',
  fontSize: "1rem",
  color: theme?.palette?.text?.primary || "#000", // Fallback
  transition: "border-color 0.3s, background-color 0.3s",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme?.palette?.primary?.main || "#000", // Fallback
  },
  "&.Mui-focused": {
    borderColor: theme?.palette?.primary?.main || "#000", // Fallback
  },
  "&:active": {
    backgroundColor: "#d4c7b4",
  },
}));

// Estilize o checkbox
const CustomCheckbox = styled(Checkbox)(() => ({
  padding: 0,
  color: "#b48852",
  "&.Mui-checked": {
    color: "#b48852",
  },
}));

const CheckField = ({ label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (typeof onChange === "function") {
      onChange(newChecked);
    }
  };

  return (
    <CustomContainer
      className={isChecked ? "Mui-focused" : ""}
      onClick={handleClick}
    >
      <span>{label}</span>
      <CustomCheckbox checked={isChecked} />
    </CustomContainer>
  );
};

CheckField.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckField;
