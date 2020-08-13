import React from 'react';

export const TextArea = ({ placeholder, label, sublabel, name }) => {
    return (
        <div className={'multiply-answer-area'}>
            <div className={'question'}>{label}</div>
            <div>{sublabel}</div>
            <div>
                <textarea name={name} placeholder={placeholder} />
            </div>
        </div>
    );
};
