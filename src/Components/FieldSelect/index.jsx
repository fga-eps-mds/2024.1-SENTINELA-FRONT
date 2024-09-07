import theme from "../../Styles/global";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "dayjs/locale/pt-br"; // Importa a localização desejada para o dayjs
import PropTypes from "prop-types";

function FieldSelect({
  label,
  value,
  onChange,
  options,
  onBlur,
  erro,
  width,
  name,
  disable,
}) {
  return (
    <FormControl
      variant="filled"
      sx={{
        margin: ".7rem",
        borderRadius: "5px",
        width: width ? "inherit" : width,
      }}
    >
      <InputLabel id={`label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`label-${label}`}
        id={`select-${label}`}
        value={value}
        onChange={onChange}
        label={label}
        onBlur={onBlur}
        name={name}
        disabled={disable}
        error={erro}
        sx={{
          backgroundColor: "#EAE3D7",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.main,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.main,
          },
          "& .MuiOutlinedInput-input": {
            backgroundColor: "#f5f5f5", //fundo
            color: theme.palette.main,
          },
          "& .MuiSelect-selectMenu": {
            backgroundColor: "#fff",
            border: "1px solid #ced4da",
          },
          "& .MuiMenuItem-root": {
            backgroundColor: "#f5f5f5",
            color: "#3f51b5",
          },
          "& .MuiMenuItem-root:hover": {
            backgroundColor: "#e0e0e0",
          },
          fontFamily: theme.typography.fontFamily,
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{ padding: "10px", backgroundColor: "#e0e0e0" }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

FieldSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onBlur: PropTypes.func, // Added prop type for onBlur
  erro: PropTypes.bool, // Added prop type for erro
  width: PropTypes.any,
  name: PropTypes.any,
  disable: PropTypes.any,
};

export default FieldSelect;
