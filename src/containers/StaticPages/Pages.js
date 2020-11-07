import React from 'react';
import { Route } from 'react-router-dom';
import WarningSigns from 'containers/StaticPages/WarningSigns';
import About from 'containers/StaticPages/About';
import TermsOfService from 'containers/StaticPages/TermsOfService';

export const Pages = () => {
    return (
        <React.Fragment>
            <Route path="/pages/warning-signs" component={WarningSigns} />
            <Route path="/pages/about" component={About} />
            <Route path="/pages/terms-of-service" component={TermsOfService} />
        </React.Fragment>
    );
};

export default Pages;
