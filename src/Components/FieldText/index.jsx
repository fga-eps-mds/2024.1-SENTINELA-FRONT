
import PropTypes from "prop-types";
import  theme  from "../../Styles/global";
import TextField from "@mui/material/TextField";

export default function FieldText({ label, value, onChange }) {
    return (
        <TextField
            id="filled-basic"
            label={label}
            value={value}
            variant="filled"
            onChange={onChange}
            sx={{
                margin: '.7rem',
                backgroundColor: '#EAE3D7',
                borderRadius: '5px',
                "& .MuiInput-underline:before": {
                    borderBottomColor: theme.palette.custom.main, // Cor da borda inferior antes do foco
                    },
                    "& .MuiInput-underline:hover:before": {
                    borderBottomColor: theme.palette.custom.main, // Cor da borda inferior ao passar o mouse
                    },
                    "& .MuiInput-underline:after": {
                    borderBottomColor: theme.palette.custom.main, // Cor da borda inferior após o foco
                    },
                    "& .MuiInputBase-input": {
                    color: theme.palette.custom.contrastText, // Cor do texto
                    },
                    "& .MuiInputLabel-root": {
                    color: theme.palette.custom.main,
                    fontFamily: '"Noto Sans", sans-serif',
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.custom.main, // Cor do rótulo quando focado
                    },
                    "& .MuiInputBase-input::placeholder": {
                    fontFamily: '"Overpass", sans-serif', // Fonte do placeholder
                    }
            }}
        />
    );
}

FieldText.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};