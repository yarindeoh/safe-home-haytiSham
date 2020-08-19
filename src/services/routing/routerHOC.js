import * as React from 'react';
import { Context } from 'services/routing/context';

export function withRoute(Component) {
    return function RouteComponent(props) {
        return (
            <Context.Consumer>
                {contexts => <Component {...props} {...contexts} />}
            </Context.Consumer>
        );
    };
}
