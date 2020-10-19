import React from 'react';

export const TextArea = ({
    placeholder,
    label,
    sublabel,
    name,
    value,
    required,
    onChange,
    disabled
}) => {
    return (
        <div
            className={`multiply-answer-area ${
                disabled ? 'disabled-area' : ''
            }`}
        >
            <label className={'question'}>{label}</label>
            {sublabel && <div>{sublabel}</div>}
            <div className='textarea-wrapper' required={required}>
                <textarea
                    disabled={disabled}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    required={required}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};
