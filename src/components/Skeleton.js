import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import WideHeader from './WideHeader';
import { isBreakpoint1 } from "src/services/general/breakpoints";

export function Skeleton(props) {
    const { children, isMainHeader } = props;
    return (
        <React.Fragment>
            {isBreakpoint1() ? (
                <Header isMainHeader={isMainHeader} />
            ) : (
                <WideHeader />
            )}
            <div className="Content">{children}</div>
            <Footer />
        </React.Fragment>
    );
}

export default Skeleton;
