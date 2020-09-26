import React from 'react';

export const Loader = ({ data, children: componentToDisplay = null }) => {
    const isAllDataArrived =
        data instanceof Array
            ? data.reduce(
                  (accumelator, current) => accumelator && current != undefined,
                  true
              )
            : data != undefined;
    return isAllDataArrived ? componentToDisplay : <h4>Loading...</h4>;
};
