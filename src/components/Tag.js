import React from 'react';

export const Tag = ({ value, onClick, selected }) => {
    return (
        <span
            className={selected ? 'selected': 'tag'}
            // style={{ border: '1px solid black', margin: '2px' }}
            onClick={onClick}
        >
            {value}
        </span>
    );
};
