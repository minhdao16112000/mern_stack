import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

DatePickerField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
};

export default function DatePickerField(props) {
    const { field, form, label } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    const handleCkeditorState = (value) => {
        const changeEvent = {
            target: {
                name: name,
                value: value,
            },
        };
        field.onChange(changeEvent);
    };
    return (
        <div className="input-style-1">
            <label>{label}</label>
            <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={(field.value && new Date(field.value)) || null}
                onChange={(date) => handleCkeditorState(date)}
                minDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                invalid={showError}
            />
            <ErrorMessage name={name}>
                {(msg) => <p className="input-message">{msg}</p>}
            </ErrorMessage>
        </div>
    );
}
