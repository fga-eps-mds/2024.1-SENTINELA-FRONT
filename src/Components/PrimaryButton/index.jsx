import PropTypes from "prop-types";
import theme from '../../Styles/global';
import { Button } from "@mui/material";

export default function PrimaryButton({ text, onClick, maxWidth }) {

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
        marginTop: "15px",
        "&amp;:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      {text}
    </Button>
  );
}

PrimaryButton.propTypes = {
  maxWidth: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
