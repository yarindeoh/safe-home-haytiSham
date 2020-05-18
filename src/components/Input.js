import React from 'react';

export const Input = ({ name, placeholder, label, subLabel }) => {
    return (
        <div>
            <label>
                {label}
                <div>
                    <input type="text" name={name} placeholder={placeholder}></input>
                </div>
            </label>
        </div>
    )
}