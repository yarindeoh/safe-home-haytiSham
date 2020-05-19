import React from 'react';

export const Input = ({ name, placeholder, label, subLabel }) => {
    return (
        <div className={'question'}>
            <label>
                {label}
                <div>
                    <input type="text" name={name} placeholder={placeholder}></input>
                </div>
            </label>
        </div>
    )
}