import React from 'react';

export const StoryHighlight = ({ story, changeLocationByPath }) => {
    return (
        <li className={'story'}
            // style={{ border: '1px solid black' }}
            onClick={() => changeLocationByPath(story.id, story)}
        >
            {story.howDidYouManged}
        </li>
    );
};
