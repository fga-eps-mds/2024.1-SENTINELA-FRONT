import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

// Estilize o container para simular o TextField com comportamento de highlight
const CustomContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between", // Alinha o label à esquerda e a checkbox à direita
  padding: "0 .7rem", // Ajuste de padding para alinhar com os outros campos
  backgroundColor: "#EAE3D7",
  borderRadius: "4px", // Cantos arredondados
  borderBottom: `1px solid ${theme.palette.main}`, // Borda semelhante ao TextField
  margin: ".7rem", // Mantém o espaçamento similar ao TextField
  fontFamily: '"Noto Sans", sans-serif',
  fontSize: "1rem", // Ajuste do tamanho da fonte para combinar com o TextField
  color: theme.palette.text.primary,
  transition: "border-color 0.3s, background-color 0.3s", // Transição suave para o highlight e clique
  cursor: "pointer", // Mostra que o container é clicável
  "&:hover": {
    borderColor: theme.palette.primary.main, // Cor da borda ao passar o mouse
  },
  "&.Mui-focused": {
    borderColor: theme.palette.primary.main, // Cor da borda ao focar
  },
  "&:active": {
    backgroundColor: "#d4c7b4", // Animação ao clique, muda a cor do fundo
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

const CheckField = ({ label, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

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
      <CustomCheckbox checked={isChecked} onChange={handleClick} />
    </CustomContainer>
  );
};

CheckField.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckField;
