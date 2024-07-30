import PropTypes from "prop-types";
import { Button } from "@mui/material";

const rgbaValue01 = `rgba(174, 136, 60, 0.1);`;

export default function SideButton({ itemKey, text, onClick }) {
  return (
    <Button
      onClick={onClick}
      key={itemKey}
      sx={{
        "&amp;:hover": {
          backgroundColor: rgbaValue01,
        },
      }}
    >
      {text}
    </Button>
  );
}

SideButton.propTypes = {
  itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
