import React from 'react';
import { Header } from './Header';
import Footer from './Footer';

export function Skeleton(props) {
    const { children, isMainHeader } = props;
    return (
        <React.Fragment>
            <Header isMainHeader={isMainHeader} />
            <div className="Content">{children}</div>
            <Footer />
        </React.Fragment>
    );
}

export default Skeleton;
