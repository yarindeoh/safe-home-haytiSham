import React from 'react';

export const Radio = ({ label, notes, options, checked, onClick, name }) => {
    return (
        <div className={'question'}>
            <label>{label}</label>
            <p>{notes}</p>
            <div>
                {options &&
                    options.map((option, index) => (
                        <label key={index}>
                            <input
                                name={name}
                                className={'radio'}
                                type="radio"
                                value={option.value}
                                checked={index === checked}
                                key={index}
                                onClick={onClick}
                                onChange={() => {}}
                            />
                            {option.label}
                        </label>
                    ))}
            </div>
        </div>
    );
};
