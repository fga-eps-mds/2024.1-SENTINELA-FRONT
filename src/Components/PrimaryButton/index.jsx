import PropTypes from "prop-types";
import theme from "../../Styles/global";
import { Button } from "@mui/material";

export default function PrimaryButton({ text, onClick, maxWidth, marginTop }) {
  const rgbaValue09 = `rgba(174, 136, 60, 0.9);`;

  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        fontFamily: theme.typography.fontFamilyPrimary, // Definindo a fonte para Noto Sans Display Medium
        color: theme.palette.content, // Cor do texto do botão
        backgroundColor: theme.palette.button, // Fundo transparente
        maxWidth: { maxWidth }, // Largura do botão
        width: "90%",
        marginTop: { marginTop },
        "&amp;:hover": {
          backgroundColor: rgbaValue09,
          transform: "scale(1.03)",
        },
      }}
    >
      {text}
    </Button>
  );
}

PrimaryButton.propTypes = {
  maxWidth: PropTypes.string,
  marginTop: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
