import React from 'react';

import Loader from 'components/Loader';
import { useData } from 'containers/Stories/storiesHooks';

export const StoriesView = () => {
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