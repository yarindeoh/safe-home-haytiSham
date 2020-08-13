import React from 'react';

export const TextArea = ({ placeholder, label, sublabel, name, value, required, onChange }) => {
    return (
        <div className={'multiply-answer-area'}>
            <div className={'question'}>{label}</div>
            <div>{sublabel}</div>
            <div required={required}>
                <textarea name={name} placeholder={placeholder} value={value} required={required} onChange={onChange}/>
            </div>
        </div>
    );
};
