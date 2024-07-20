import PropTypes from "prop-types";
import FieldText from "../FieldText";
import { PatternFormat } from 'react-number-format';


export default function FieldNumber({ label, value, onChange, disabled, format }) {
    return (
        <PatternFormat
            format={format}
            mask='_'
            allowEmptyFormatting
            patternChar='#'
            type='tel'
            customInput={FieldText}
            label={label}
            value={value}
            onChange={onChange}
            disabled={disabled}
            variant="filled"
            id="filled-basic"
        />
    );
}
FieldNumber.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    format: PropTypes.string.isRequired,
};
