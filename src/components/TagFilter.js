import React from 'react';

export const TagFilter = ({ value, onClick, selected, customClass, tag }) => {
    const tagClass = selected ? 'tag-filter selected ' : 'tag-filter';
    return (
        <span className={`${tagClass}`} onClick={onClick} data-id={value}>
            {tag}
        </span>
    );
};

export default TagFilter;
