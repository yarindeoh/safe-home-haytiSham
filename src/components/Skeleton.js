import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import Footer from './Footer';
import WideHeader from './WideHeader';
import {
    getBreakpoint,
    BREAKPOINT_MAP
} from 'src/services/general/breakpoints';

export function Skeleton(props) {
    const { children, isMainHeader } = props;
    const [breakpoint, setBreakpoint] = useState(getBreakpoint());

    useEffect(() => {
        function handleResize() {
            setBreakpoint(getBreakpoint());
        }

        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <React.Fragment>
            {breakpoint === BREAKPOINT_MAP.BREAKPOINT_1 ? (
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
