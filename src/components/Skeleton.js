import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import Footer from './Footer';
import WideHeader from './WideHeader';
import { isBreakpoint1 } from 'src/services/general/breakpoints';

export function Skeleton(props) {
    const { children, isMainHeader } = props;
    const [narrowHeader, setNarrowHeader] = useState(isBreakpoint1());

    useEffect(() => {
        function handleResize() {
            setNarrowHeader(isBreakpoint1());
        }

        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <React.Fragment>
            {narrowHeader ? (
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
