import React from 'react';
import '../scss/componentsStyle/Loader.scss';

export const Loader = ({ data, children: componentToDisplay = null }) => {
    const isAllDataArrived =
        data instanceof Array
            ? data.length > 0
                ? data.reduce(
                      (accumelator, current) =>
                          accumelator && current != undefined,
                      true
                  )
                : false
            : data != undefined;

    // If the component we want to display does not wait for more data to arrive
    if (isAllDataArrived) return componentToDisplay;
    //If we are waiting for asynchronous data to arrive, in the meantime we will present the loader component
    else {
        return (
            <div className="loader-container">
                <div className="spinner-box">
                    <div className="circle-border">
                        <div className="circle-core" />
                    </div>
                </div>
            </div>
        );
    }
};
