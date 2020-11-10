import React from 'react';

export const Input = ({
    name,
    placeholder,
    maxLength,
    label,
    subLabel,
    value,
    required,
    onChange,
    disabled
}) => {
    return (
        <div className={`question ${disabled ? 'disabled-area' : ''}`}>
            <label>
                {label}
                <div>
                    <input
                        maxLength={maxLength}
                        disabled={disabled}
                        type="text"
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        required={required}
                        onChange={onChange}
                    ></input>
                </div>
            </label>
        </div>
    );
};
