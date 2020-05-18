import React from 'react';

export const Radio = ({ label, options, checked }) => {
    return (
        <div>
            <label>
                {label}
            </label>
            <div>
                {options.map((option, index) => (
                    <label>
                        <input type="radio" value={option.value} checked={index === checked} key={index} />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    )
}