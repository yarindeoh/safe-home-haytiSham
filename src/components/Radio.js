import React from 'react';

export const Radio = ({ label, options, checked }) => {
    return (
        <div>
            <label>{label}</label>
            <div>
                {options &&
                    options.map((option, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                value={option.value}
                                checked={index === checked}
                                key={index}
                            />
                            {option.label}
                        </label>
                    ))}
            </div>
        </div>
    );
};
