import React from 'react';

export const Tag = ({ value, onClick, selected }) => {
    return (
        <span className={selected ? 'tag selected' : 'tag'} onClick={onClick}>
            {value}
        </span>
    );
};
