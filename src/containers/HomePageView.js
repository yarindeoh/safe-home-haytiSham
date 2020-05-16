import React from 'react';

import Loader from 'components/Loader';

const HomePageView = props => {
    return (
        <div className="app">
            <div className="title">It Could Have Been Me</div>
            <div className="section">
                <Loader />
            </div>
            <p>@ powered by yarindeoh</p>
        </div>
    );
};

export default HomePageView;
