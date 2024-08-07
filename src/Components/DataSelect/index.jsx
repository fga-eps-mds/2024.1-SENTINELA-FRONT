import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

export default function DataSelect({ label, value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format="DD/MM/YYYY" // Define o formato desejado
        slots={{
          textField: (params) => <TextField {...params} variant="filled" />,
        }}
        sx={{
          backgroundColor: "#EAE3D7",
          margin: ".7rem",
          "& .MuiPickersCalendarHeader-root": {
            backgroundColor: "#ffffff",
          },
          "& .MuiPickersCalendarHeader-label": {
            color: "#3f51b5",
          },
        }}
      />
    </LocalizationProvider>
  );
}

DataSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
};
