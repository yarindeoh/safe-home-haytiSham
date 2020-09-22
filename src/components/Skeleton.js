import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import WideHeader from './WideHeader';
import WideFooter from './WideFooter';
import { BREAKPOINT_MAP } from 'src/services/general/breakpoints';
import { useResize } from 'src/services/general/generalHooks';

export function Skeleton(props) {
    const { children, isMainHeader, id } = props;
    const breakpoint = useResize();

    let header = <Header isMainHeader={isMainHeader} />;
    let footer = <Footer />;
    if (breakpoint === BREAKPOINT_MAP.BREAKPOINT_2) {
        header = <WideHeader />;
        footer = <WideFooter />;
    }

    return (
        <React.Fragment>
            {header}
            <div id={id} className="Content">
                {children}
            </div>
            {footer}
        </React.Fragment>
    );
}

export default Skeleton;
