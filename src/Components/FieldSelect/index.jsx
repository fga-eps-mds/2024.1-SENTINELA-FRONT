import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import 'dayjs/locale/pt-br'; // Importa a localização desejada para o dayjs


function FieldSelect({ label, value, onChange, options }) {
  return (
    <FormControl fullWidth sx={{ margin: '1rem', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
      <InputLabel id={`label-${label}`} sx={{ color: '#000' }}>{label}</InputLabel>
      <Select
        labelId={`label-${label}`}
        id={`select-${label}`}
        value={value}
        onChange={onChange}
        label={label}
        sx={{
          '& .MuiSelect-select': {

          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3f51b5',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3f51b5',
          }
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} sx={{ padding: '10px', backgroundColor: '#e0e0e0' }}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FieldSelect;
