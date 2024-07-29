import PropTypes from "prop-types";
import theme from "../../Styles/global";
import { Button } from "@mui/material";

export default function SideButton({ itemKey, text, onClick }) {
  return (
    <Button
      onClick={onClick}
      key={itemKey}
      sx={{
        "&amp;:hover": {
          backgroundColor: theme.palette.content,
        },
      }}
    >
      {text}
    </Button>
  );
}

SideButton.propTypes = {
  itemKey: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
