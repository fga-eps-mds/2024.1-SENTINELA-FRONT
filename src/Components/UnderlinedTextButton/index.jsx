import PropTypes from "prop-types";
import theme from '../../Styles/global';
import { Button } from "@mui/material";


export default function UnderlinedTextButton({ text, onClick }) {

  
  return (
    <Button
      onClick={onClick}
      variant="text"
      sx={{
        textTransform: "none",
        textDecoration: "underline",

        color: theme.palette.main, // Cor do texto do botão
        "&amp;:hover": {
          transform: "scale(1.03)",
          backgroundColor: theme.palette.contrastText,
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
