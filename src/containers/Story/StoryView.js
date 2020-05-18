import React from 'react';
import { Context } from 'src/context';

export const StoryView = (props) => {
    console.log(props);
    return (
        <Context.Consumer>
            {() => (
                <div>
                    <h1>Hello!</h1>
                    <button onClick={() => props.history.push('/')}>
                        Click
                    </button>
                </div>
            )}
        </Context.Consumer>
    );
};
