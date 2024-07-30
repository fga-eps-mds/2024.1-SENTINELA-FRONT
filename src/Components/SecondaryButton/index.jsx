import PropTypes from "prop-types";
import theme from "../../Styles/global";
import { Button } from "@mui/material";

export default function SecondaryButton({ text, onClick, maxWidth }) {
  const rgbaValue01 = `rgba(174, 136, 60, 0.1);`;
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        fontFamily: "Noto Sans, sans-serif", // Definindo a fonte para Noto Sans Display Medium
        color: theme.palette.button, // Cor do texto do botão
        backgroundColor: "transparent", // Fundo transparente
        border: `2px solid ${theme.palette.button}`, // Cor do stroke em torno do botão
        maxWidth: { maxWidth }, // Largura do botão
        width: "90%",
        marginTop: "50px",
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
  maxWidth: PropTypes.string,
  onClick: PropTypes.func,
};
