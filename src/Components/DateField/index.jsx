import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

export default function BasicDateField(label, value) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        label={label}
        value={dayjs(value)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
