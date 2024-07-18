import PropTypes from "prop-types";
import { theme } from "../../Styles/global";
import { Button } from "@mui/material";

const rgbaValue01 = `rgba(174, 136, 60, 0.1);`;

export default function UnderlinedTextButton({ text, onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="text"
      sx={{
        textTransform: "none",
        textDecoration: "underline",

        color: theme.palette.custom.main, // Cor do texto do botão
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

UnderlinedTextButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
