import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DataSelect({ label, value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format="DD/MM/YYYY" // Define o formato desejado
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            sx={{
              margin: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              '& .MuiInputBase-root': {
                color: '#000',
              },
              '& .MuiFormLabel-root': {
                color: '#000',
              },
              '& .MuiFilledInput-underline:before': {
                borderBottomColor: '#000',
              },
              '& .MuiFilledInput-underline:hover:before': {
                borderBottomColor: '#3f51b5',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottomColor: '#3f51b5',
              }
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}