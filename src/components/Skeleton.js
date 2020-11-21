import React from 'react';
import { Header } from './Header';
import { FooterWrapper } from '../containers/Story/components/FooterWrapper';
import WideHeader from './WideHeader';
import WideFooter from './WideFooter';

export function Skeleton(props) {
    const { children, isMainHeader, id } = props;
    return (
        <React.Fragment>
            <Header isMainHeader={isMainHeader} />
            <WideHeader />
            <div id={id} className="Content">
                {children}
            </div>
            <FooterWrapper />
            <WideFooter />
        </React.Fragment>
    );
}

export default Skeleton;
