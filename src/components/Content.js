import React from 'react';

export function Content(props) {
    const { className, children, alignRight, fullWidth } = props;
    let wrapperClassName = 'content-wrapper';
    if (className) {
        wrapperClassName += ` ${className}`;
    }
    if (alignRight) {
        wrapperClassName += ' align-right';
    }
    if (fullWidth) {
        wrapperClassName += ' full-width';
    }

    return <div className={wrapperClassName}>{children}</div>;
}

export default Content;
