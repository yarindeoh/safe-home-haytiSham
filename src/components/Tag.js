import React from 'react';

export const Tag = ({ text, onClick }) => {
    const handleOnClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <span className="tag" onClick={handleOnClick}>
            {text}
        </span>
    );
};

export default Tag;
