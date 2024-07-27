import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function DataSelect({ label, value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format="DD/MM/YYYY" // Define o formato desejado
        renderInput={(params) => <TextField {...params} variant="filled" />}
        sx={{
          margin: ".7rem",
        }}
      />
    </LocalizationProvider>
  );
}

DataSelect.propTypes = {
  label: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
};
