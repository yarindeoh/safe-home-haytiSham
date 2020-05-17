import React from 'react';

import Loader from 'components/Loader';
import { useData } from 'containers/container1/container1Hooks';

const Container1View = () => {
    const { data } = useData();
    console.log(data);
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

export default Container1View;
