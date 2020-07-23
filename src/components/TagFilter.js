import React from 'react';

export const TagFilter = ({ value, onClick, selected, customClass }) => {
    const tagClass = selected ? 'tag-filter selected ' : 'tag-filter';
    return (
        <span className={`${tagClass}`} onClick={onClick}>
            {value}
        </span>
    );
};

export default TagFilter;
