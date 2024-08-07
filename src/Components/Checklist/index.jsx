import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React from "react";
import PropTypes from "prop-types";

export default function CheckList({ items, value, onChange }) {
  const handleToggle = (e) => () => {
    const currentIndex = value.indexOf(e);
    const newChecked = [...value];

    if (currentIndex === -1) {
      newChecked.push(e);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    onChange(newChecked);
  };
  return (
    <List>
      {items.map((item, index) => (
        <React.Fragment key={item}>
          <ListItem onClick={handleToggle(item)}>
            <Checkbox
              edge="start"
              checked={value.indexOf(item) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={item} />
          </ListItem>
          {index !== items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}

CheckList.propTypes = {
  items: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
};
