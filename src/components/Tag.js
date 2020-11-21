import React from 'react';

export const Tag = ({ text, onClick, displayAsUnPublish }) => {
    const handleOnClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <span
            className={`tag ${displayAsUnPublish ? 'unPublish-tags' : ''}`}
            onClick={handleOnClick}
        >
            {text}
        </span>
    );
};

export default Tag;
