import React from 'react';

export const StoryHighlight = ({ story, changeLocationByPath }) => {
    return (
        <div
            style={{ border: '1px solid black' }}
            onClick={() => changeLocationByPath(story.id, story)}
        >
            {story.howDidYouManged}
        </div>
    );
};
