import "./index.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import theme from "../../Styles/global";

export default function ListComponent({ label, onClick }) {
  return (
    <Box sx={{ width: "100%", bgcolor: theme.palette.custom.content }}>
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton onClick={onClick}>
          <ListItemText primary={label} />
        </ListItemButton>
      </List>
    </Box>
  );
}

ListComponent.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
