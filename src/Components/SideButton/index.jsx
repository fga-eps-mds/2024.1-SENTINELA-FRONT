import { Button } from "@mui/material";
import PropTypes from "prop-types";

const rgbaValue01 = `rgba(174, 136, 60, 0.1);`;

export default function SideButton({ itemKey, text, onClick }) {
  return (
    <Button
      key={itemKey}
      onClick={onClick}
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
