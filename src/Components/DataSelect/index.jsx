import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import dayjs from "dayjs";

export default function DataSelect({
  label,
  value,
  onChange,
  onBlur,
  erro,
  name,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name={name}
        label={label}
        value={dayjs(value)}
        onChange={onChange}
        format="DD/MM/YYYY"
        onBlur={onBlur}
        error={erro}
        renderInput={{
          textField: (params) => <TextField {...params} variant="filled" />,
        }}
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: "#EAE3D7",
            margin: ".7rem",
          },
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
  onBlur: PropTypes.func, // Added prop type for onBlur
  erro: PropTypes.bool, // Added prop type for erro
  name: PropTypes.any,
};
