import React from 'react';

export const Input = ({ name, placeholder, label, subLabel, value, required, onChange, disabled }) => {
    return (
        <div className={`question ${disabled ? "disabled-area": ""}`}>
            <label>
                {label}
                <div>
                    <input 
                        disabled={disabled} 
                        type="text" 
                        name={name} 
                        placeholder={placeholder} 
                        value={value} 
                        required={required} 
                        onChange={onChange}>
                    </input>
                </div>
            </label>
        </div>
    )
}