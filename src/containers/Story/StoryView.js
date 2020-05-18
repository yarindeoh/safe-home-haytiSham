import React from 'react';
import { withRoute } from 'services/routing/routerHOC';

export const StoryView = withRoute((props) => {
    return (
        <div>
            <h1>Hello From Story!</h1>
            <button onClick={() => props.history.push('/')}>Click</button>
        </div>
    );
});
