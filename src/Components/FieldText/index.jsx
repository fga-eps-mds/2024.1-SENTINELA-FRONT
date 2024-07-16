import PropTypes from "prop-types";
import { theme } from "../../Styles/global";
import TextField from "@mui/material/TextField";

export default function FieldText({label, value, onChange}) {
    return(
        <TextField
            id="filled-basic" 
            label={label}
            value={value}
            variant="filled"
            onChange={onChange}
            />
    )
}