import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

DatePickerField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    className: PropTypes.string,
};

export default function DatePickerField(props) {
    const { field, form, type, className, label } = props;
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
        <div className={className}>
            {label && (
                <label>
                    {label}
                    <span>*</span>
                </label>
            )}
            <input
                className={showError ? 'input-error' : ''}
                onChange={(date) => handleCkeditorState(date)}
                type={type}
                id={name}
                {...field}
                invalid={showError}
            />
            {showError ? <i className="fas fa-exclamation-circle"></i> : null}
            <ErrorMessage name={name}>
                {(msg) => <p className="input-message">{msg}</p>}
            </ErrorMessage>
        </div>
    );
}
