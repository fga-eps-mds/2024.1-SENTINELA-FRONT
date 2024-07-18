import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DataSelect({label, value, onChange}) {
  return(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={value}
            onChange={onChange}
            format="DD/MM/YYYY" // Define o formato desejado
            renderInput={(params) => <TextField {...params} variant="filled" />}
            sx={{
              margin: '.7rem',
            }}
          />
        </LocalizationProvider>
  )
}