import React from 'react'
import PropTypes from 'prop-types'

TextareaField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

TextareaField.defaultProps = {
    label: '',
    placeholder: '',
    className: '',
    disabled: false,
};

export default function TextareaField(props) {
    const { field, placeholder, disabled, className, label } = props;
    const { name } = field;
    return (
        <div className={className}>
            {label && <label>{label}<span>*</span></label>}
            <textarea
                name={name}
                rows='6'
                placeholder={placeholder}
                disabled={disabled}
                {...field}
            />
        </div>
    )
}
