import React from 'react';

export const TextArea = ({ placeholder, label, sublabel }) => {
    return (
        <div>
            <div>
                {label}
            </div>
            <div>
                {sublabel}
            </div>
            <div>
                <textarea name={name} placeholder={placeholder} />
            </div>
        </div>
    )
}