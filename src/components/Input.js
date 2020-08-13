import React from 'react';

export const Input = ({ name, placeholder, label, subLabel, value, required, onChange }) => {
    return (
        <div className={'question'}>
            <label>
                {label}
                <div>
                    <input type="text" name={name} placeholder={placeholder} value={value} required={required} onChange={onChange}></input>
                </div>
            </label>
        </div>
    )
}