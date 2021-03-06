import React from 'react';

export const TextArea = ({
    placeholder,
    label,
    sublabel,
    name,
    value,
    defaultValue,
    required,
    maxLength,
    onChange,
    disabled,
    formId,
    containerClass,
    labelClass,
    textWrapperClass,
    textClass,
    icon
}) => {
    return (
        <div
            className={`multiply-answer-area ${
                disabled ? 'disabled-area' : ''
            } ${containerClass}`}
        >
            <div className="icon-and-label-container">
                {icon && <div className="icon">{icon}</div>}
                <label
                    className={`question ${labelClass} ${
                        disabled ? 'disabled-label' : ''
                    }`}
                >
                    {label}
                </label>
            </div>
            {sublabel && <div>{sublabel}</div>}
            <div
                className={`textarea-wrapper ${textWrapperClass} ${
                    disabled ? 'disabled-text-area' : ''
                }`}
                required={required}
            >
                <textarea
                    className={`${textClass} ${
                        disabled ? 'disabled-text-area' : ''
                    }`}
                    form={formId}
                    disabled={disabled}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    required={required}
                    onChange={onChange}
                    maxLength={maxLength}
                />
            </div>
        </div>
    );
};
