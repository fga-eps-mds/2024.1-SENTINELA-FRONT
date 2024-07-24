import PropTypes from "prop-types";
import theme from "../../Styles/global";
import { Button } from "@mui/material";

export default function PrimaryButton ({ text, onClick }) {
  const rgbaValue09 = `rgba(174, 136, 60, 0.9);`;

  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        fontFamily: "Noto Sans, sans-serif", // Definindo a fonte para Noto Sans Display Medium
        color: theme.palette.custom.content, // Cor do texto do botão
        backgroundColor: theme.palette.custom.button, // Fundo transparente
        width: "400px", // Largura do botão
        marginTop: "15px",
        "&amp;:hover": {
          transform: "scale(1.03)",
          backgroundColor: rgbaValue09,
        },
      }}
    >
      {text}
    </Button>
  );
}

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
