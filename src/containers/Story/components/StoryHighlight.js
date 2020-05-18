import React from 'react';

export const StoryHighlight = (props) => {
    return (
        <div style={{ border: '1px solid black' }}>
            {props.story.howDidYouManged}
        </div>
    );
};
