import React from 'react';
import { Header } from './Header';
import AccessibilityIcon from 'src/media/icons/accessibility.svg';

export function Skeleton(props) {
    const { children, isMainHeader } = props;
    return (
        <React.Fragment>
            <Header isMainHeader={isMainHeader} />
            <AccessibilityIcon className="AccessibilityButton" />
            <div className="Content">{children}</div>
        </React.Fragment>
    );
}

export default Skeleton;
