
import PropTypes from "prop-types";
import FieldText from "../FieldText";
import { PatternFormat } from 'react-number-format';

export default function FieldNumber({ label, value, onChange, format}) {
    return (
        <PatternFormat
            format={format}
            mask='_'
            allowEmptyFormatting
            patternChar='#'
            
            type='tel'

            customInput={FieldText}

            id="filled-basic"
            label={label}
            value={value}
            variant="filled"
            onChange={onChange}

        />
    );
}

FieldText.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
