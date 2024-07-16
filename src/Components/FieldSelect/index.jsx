import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import 'dayjs/locale/pt-br'; // Importa a localização desejada para o dayjs


function FieldSelect({ label, value, onChange, options }) {
  return (
    <FormControl fullWidth>
      <InputLabel id={`label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`label-${label}`}
        id={`select-${label}`}
        value={value}
        onChange={onChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FieldSelect;
