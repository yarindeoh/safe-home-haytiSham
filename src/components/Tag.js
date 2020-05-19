import React from 'react';

export const Tag = ({ value, onClick, selected, customClass }) => {
    return (
        <span className={customClass + selected ? 'tag selected ' : 'tag'} onClick={onClick}>
            {value}
        </span>
    );
};
