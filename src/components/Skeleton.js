import React from 'react';
import { Header } from './Header';
import { FooterWrapper } from '../containers/Story/components/FooterWrapper';

export function Skeleton(props) {
    const { children, isMainHeader } = props;
    return (
        <React.Fragment>
            <Header isMainHeader={isMainHeader} />
            <div className="Content">{children}</div>
            <FooterWrapper />
        </React.Fragment>
    );
}

export default Skeleton;
