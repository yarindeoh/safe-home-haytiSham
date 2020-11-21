import * as React from 'react';
import { RouterContext } from 'services/routing/routerContext';

export function withRoute(Component) {
    return function RouteComponent(props) {
        return (
            <RouterContext.Consumer>
                {contexts => <Component {...props} {...contexts} />}
            </RouterContext.Consumer>
        );
    };
}
