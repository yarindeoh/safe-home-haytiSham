import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import WideHeader from './WideHeader';
import { BREAKPOINT_MAP } from 'src/services/general/breakpoints';
import { useResize } from 'src/services/general/generalHooks';

export function Skeleton(props) {
    const { children, isMainHeader, id } = props;
    const breakpoint = useResize();

    return (
        <React.Fragment>
            {breakpoint === BREAKPOINT_MAP.BREAKPOINT_1 ? (
                <Header isMainHeader={isMainHeader} />
            ) : (
                <WideHeader />
            )}
            <div id={id} className="Content">
                {children}
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Skeleton;
