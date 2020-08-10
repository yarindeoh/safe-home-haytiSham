import React from 'react';

export const Radio = ({ label, notes, options, checked }) => {
    return (
        <div className={'question'}>
            <label>{label}</label>
            <p>{notes}</p>
            <div>
                {options &&
                    options.map((option, index) => (
                        <label key={index}>
                            <input
                                className={'radio'}
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
