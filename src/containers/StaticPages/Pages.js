import React from 'react';
import { Route } from 'react-router-dom';
import WarningSigns from 'containers/StaticPages/WarningSigns';
import About from 'containers/StaticPages/About';

export const Pages = () => {
    return (
        <React.Fragment>
            <Route path="/pages/warning-signs" component={WarningSigns} />
            <Route path="/pages/about" component={About} />
        </React.Fragment>
    );
};

export default Pages;
