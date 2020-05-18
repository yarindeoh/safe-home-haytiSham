import React from 'react';

export const StoryHighlight = ({ story, changeStoryLocation }) => {
    return (
        <div
            style={{ border: '1px solid black' }}
            onClick={() => changeStoryLocation(story.id, story)}
        >
            {story.howDidYouManged}
        </div>
    );
};
