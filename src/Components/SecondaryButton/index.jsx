import PropTypes from "prop-types";
import { theme } from "../../Styles/global";
import { Button } from "@mui/material";


const rgbaValue01 = `rgba(174, 136, 60, 0.1);`;

export default function SecondaryButton ({ text }) {
  return (
    <Button
      variant="contained"
      sx={{
        fontFamily: "Noto Sans, sans-serif", // Definindo a fonte para Noto Sans Display Medium
        color: theme.palette.custom.button, // Cor do texto do botão
        backgroundColor: "transparent", // Fundo transparente
        border: `2px solid ${theme.palette.custom.button}`, // Cor do stroke em torno do botão
        width: "400px", // Largura do botão
        marginTop: "inherit",
        "&amp;:hover": {
          transform: "scale(1.03)",
          backgroundColor: rgbaValue01,
        },
      }}
    >
      {text}
    </Button>
  );
}

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
};
