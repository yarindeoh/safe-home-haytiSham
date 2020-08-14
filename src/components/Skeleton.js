import React from 'react';
import { Header } from './Header';
import { withRouter } from 'react-router';
import AccessibilityIcon from 'src/media/icons/accessibility.svg';

export function Skeleton(props) {
    const { children, history, isMainHeader } = props;
    return (<React.Fragment>
        <Header history={history} isMainHeader={isMainHeader}/>
        <AccessibilityIcon className="AccessibilityButton" />
        <div className="Content">
            {children}
        </div>
    </React.Fragment>);
}

export default withRouter(Skeleton);
