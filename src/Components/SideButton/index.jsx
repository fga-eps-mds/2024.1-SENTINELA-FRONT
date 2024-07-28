import { Button } from "@mui/material";
import PropTypes from "prop-types";

const rgbaValue01 = `rgba(174, 136, 60, 0.1);`;

export default function SideButton({ itemKey, text }) {
  return (
    <Button
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
  itemKey: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
